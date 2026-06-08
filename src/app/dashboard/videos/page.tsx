"use client";

import {
  useDeleteDynamicMutation,
  useGetDynamicQuery,
  usePatchDynamicMutation,
  usePostDynamicMutation,
} from "@/src/redux/features/dynamic/dynamicApi";
import { TClass, TVideo } from "@/src/types";
import { showApiError } from "@/src/utils/showApiError";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

type TPlaylistSubject = {
  _id: string;
  subjectName: {
    _id: string;
    name: string;
  };
  image: string;
  description: string;
};

type TPlaylist = {
  _id: string;
  className: {
    _id: string;
    name: string;
  };
  subjects: TPlaylistSubject[];
};

export default function VideosPage() {
  const emptyForm = {
    className: "",
    playlistSubjectId: "",
    embedCode: "",
    name: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<TVideo | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);

  // Fetch videos
  const {
    data: videoData,
    isLoading,
    refetch: refetchVideos,
  } = useGetDynamicQuery({
    url: "/video",
  });

  // Fetch classes
  const { data: classData } = useGetDynamicQuery({
    url: "/class",
  });

  // Fetch playlist for selected class in create form
  const { data: playlistData } = useGetDynamicQuery(
    {
      url: form.className ? `/playlist/classID/${form.className}` : "",
    },
    { skip: !form.className },
  );

  // Fetch playlist for edit form
  const { data: editPlaylistData, refetch: refetchEditPlaylist } =
    useGetDynamicQuery(
      {
        url: editForm.className
          ? `/playlist/classID/${editForm.className}`
          : "",
      },
      { skip: !editForm.className },
    );

  const [createVideo, { isLoading: creating }] = usePostDynamicMutation();
  const [updateVideo, { isLoading: updating }] = usePatchDynamicMutation();
  const [deleteVideo] = useDeleteDynamicMutation();

  const videos: TVideo[] = videoData?.data || [];
  const classes: TClass[] = classData?.data || [];
  const playlists: TPlaylist[] = playlistData?.data || [];
  const editPlaylists: TPlaylist[] = editPlaylistData?.data || [];

  // Extract subjects from playlist when class is selected (create form)
  // Add these after your data fetching
  const playlistSubjects =
    form.className && playlists.length > 0 ? playlists[0]?.subjects || [] : [];

  const editPlaylistSubjects =
    editForm.className && editPlaylists.length > 0
      ? editPlaylists[0]?.subjects || []
      : [];

  const updateForm = useCallback((key: keyof typeof form, value: string) => {
    setForm((prev) => {
      if (key === "className") {
        return { ...prev, [key]: value, playlistSubjectId: "" };
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const updateEditForm = useCallback(
    (key: keyof typeof editForm, value: string) => {
      setEditForm((prev) => {
        if (key === "className") {
          return { ...prev, [key]: value, playlistSubjectId: "" };
        }
        return { ...prev, [key]: value };
      });
    },
    [],
  );

  const extractVideoId = useCallback((input: string) => {
    let match = input.match(
      /src="https:\/\/www\.youtube\.com\/embed\/([^"?]+)/,
    );
    if (match) return match[1];

    match = input.match(/(?:v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
    if (match) return match[1];

    if (input.length === 11) return input;

    return null;
  }, []);

  const getThumbFromEmbed = useCallback(
    (embedCode: string) => {
      const videoId = extractVideoId(embedCode);
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        : null;
    },
    [extractVideoId],
  );

  const handleCreate = useCallback(async () => {
    if (
      !form.className ||
      !form.playlistSubjectId ||
      !form.embedCode ||
      !form.name
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const videoId = extractVideoId(form.embedCode);
    if (!videoId) {
      toast.error("Invalid YouTube embed code");
      return;
    }

    try {
      await createVideo({
        url: "/video",
        data: {
          className: form.className,
          subjectName: form.playlistSubjectId,
          youtubeURL: videoId,
          name: form.name,
        },
        invalidatesTags: ["video"],
      }).unwrap();

      toast.success("Video created successfully");
      setForm(emptyForm);
      refetchVideos();
    } catch (error) {
      showApiError(error);
    }
  }, [form, createVideo, extractVideoId, refetchVideos]);

  const openEdit = useCallback(async (video: TVideo) => {
    setEditing(video);

    setEditForm({
      className: video.className._id,
      playlistSubjectId: "",
      embedCode: `https://www.youtube.com/embed/${video.youtubeURL}`,
      name: video.name,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/playlist/classID/${video.className._id}`,
      );
      const result = await response.json();
      const playlist = result.data?.[0];

      if (playlist && playlist.subjects) {
        const matchedSubject = playlist.subjects.find(
          (subject: TPlaylistSubject) =>
            subject.subjectName._id === video.subjectName._id,
        );

        if (matchedSubject) {
          setEditForm((prev) => ({
            ...prev,
            playlistSubjectId: matchedSubject._id,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  }, []);

  const handleUpdate = useCallback(async () => {
    if (!editing) return;

    if (
      !editForm.className ||
      !editForm.playlistSubjectId ||
      !editForm.embedCode ||
      !editForm.name
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const videoId = extractVideoId(editForm.embedCode);
    if (!videoId) {
      toast.error("Invalid YouTube embed code");
      return;
    }

    try {
      await updateVideo({
        url: `/video/${editing._id}`,
        data: {
          className: editForm.className,
          subjectName: editForm.playlistSubjectId,
          youtubeURL: videoId,
          name: editForm.name,
        },
        invalidatesTags: ["video"],
      }).unwrap();

      toast.success("Video updated successfully");
      setEditing(null);
      refetchVideos();
    } catch (error) {
      showApiError(error);
    }
  }, [editing, editForm, updateVideo, extractVideoId, refetchVideos]);

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = confirm("Are you sure you want to delete this video?");
      if (!confirmed) return;

      try {
        await deleteVideo({
          url: `/video/${id}`,
          invalidatesTags: ["video"],
        }).unwrap();
        toast.success("Video deleted successfully");
        refetchVideos();
      } catch (error) {
        showApiError(error);
      }
    },
    [deleteVideo, refetchVideos],
  );

  const getEmbedUrl = useCallback((videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  }, []);

  return (
    <div className="p-6 bg-[#0A0F0A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">
          Post Video
        </h1>
        <p className="text-[#A8C5A8] text-sm mb-8">
          Add YouTube videos to your classes
        </p>

        {/* Create Form */}
        <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6 max-w-2xl">
          <h2 className="font-bold text-[#E8F5E8] mb-5">Add New Video</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8C5A8] text-sm mb-1.5">
                  Class
                </label>
                <select
                  value={form.className}
                  onChange={(e) => updateForm("className", e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#A8C5A8] text-sm mb-1.5">
                  Subject from Playlist
                </label>
                <select
                  value={form.playlistSubjectId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      playlistSubjectId: e.target.value,
                    }))
                  }
                  disabled={!form.className || playlistSubjects.length === 0}
                  className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Subject</option>
                  {playlistSubjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.subjectName.name}
                    </option>
                  ))}
                </select>
                {form.className && playlistSubjects.length === 0 && (
                  <p className="text-yellow-500 text-xs mt-1">
                    No playlist found for this class. Please create a playlist
                    first.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                Video Name
              </label>
              <input
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="e.g. Chapter 1 - Introduction"
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#A8C5A8] text-sm mb-1.5">
                YouTube Embed Code
              </label>
              <textarea
                value={form.embedCode}
                onChange={(e) => updateForm("embedCode", e.target.value)}
                placeholder='<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" ...></iframe>'
                rows={4}
                className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none font-mono text-xs"
              />
              <p className="text-[#7A9A7A] text-xs mt-1">
                Paste the full YouTube embed iframe code
              </p>
            </div>

            {form.embedCode && getThumbFromEmbed(form.embedCode) && (
              <div className="rounded-lg overflow-hidden bg-[#131A13] p-2">
                <img
                  src={getThumbFromEmbed(form.embedCode)!}
                  alt="Preview"
                  className="w-full max-h-48 object-cover rounded"
                />
              </div>
            )}

            <button
              onClick={handleCreate}
              disabled={creating}
              className="w-full py-2.5 bg-[#228B22] text-white font-semibold rounded-lg hover:bg-[#3DAA3D] transition-colors disabled:opacity-50"
            >
              {creating ? "Posting..." : "Post Video"}
            </button>
          </div>
        </div>

        {/* Videos Grid */}
        {videos.length > 0 && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
            <h2 className="font-bold text-[#E8F5E8] mb-4">
              Videos ({videos.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-[#131A13] border border-[#1F3521] rounded-xl overflow-hidden hover:border-[#2E8B57] transition-all group"
                >
                  <div className="relative aspect-video">
                    <iframe
                      src={getEmbedUrl(video.youtubeURL)}
                      title={video.name}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-[#E8F5E8] text-base mb-2 line-clamp-2">
                      {video.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 text-xs text-[#7A9A7A] mb-3">
                      <span className="px-2 py-1 bg-[#0A0F0A] rounded">
                        🎓 {video.className?.name}
                      </span>
                      <span className="px-2 py-1 bg-[#0A0F0A] rounded">
                        📚 {video.subjectName?.name}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-[#1F3521]">
                      <button
                        onClick={() => openEdit(video)}
                        className="flex-1 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="flex-1 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {videos.length === 0 && !isLoading && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-12 text-center">
            <p className="text-[#A8C5A8]">
              No videos found. Add your first video!
            </p>
          </div>
        )}

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-[#0F170F] to-[#0A0F0A] border border-[#1F3521] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#0F170F]/95 backdrop-blur-sm border-b border-[#1F3521] px-6 py-4 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-[#E8F5E8]">
                      Edit Video
                    </h2>
                    <p className="text-sm text-[#A8C5A8] mt-1">
                      Update video information
                    </p>
                  </div>
                  <button
                    onClick={() => setEditing(null)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#A8C5A8] text-sm mb-1.5">
                        Class
                      </label>
                      <select
                        value={editForm.className}
                        onChange={(e) =>
                          updateEditForm("className", e.target.value)
                        }
                        className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
                      >
                        <option value="">Select Class</option>
                        {classes.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#A8C5A8] text-sm mb-1.5">
                        Subject from Playlist
                      </label>
                      <select
                        value={editForm.playlistSubjectId}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            playlistSubjectId: e.target.value,
                          }))
                        }
                        disabled={
                          !editForm.className ||
                          editPlaylistSubjects.length === 0
                        }
                        className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none disabled:opacity-50"
                      >
                        <option value="">Select Subject</option>
                        {editPlaylistSubjects.map((subject) => (
                          <option key={subject._id} value={subject._id}>
                            {subject.subjectName.name}
                          </option>
                        ))}
                      </select>
                      {editForm.className &&
                        editPlaylistSubjects.length === 0 && (
                          <p className="text-yellow-500 text-xs mt-1">
                            No playlist found for this class
                          </p>
                        )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#A8C5A8] text-sm mb-1.5">
                      Video Name
                    </label>
                    <input
                      value={editForm.name}
                      onChange={(e) => updateEditForm("name", e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A8C5A8] text-sm mb-1.5">
                      YouTube Embed Code
                    </label>
                    <textarea
                      value={editForm.embedCode}
                      onChange={(e) =>
                        updateEditForm("embedCode", e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none font-mono text-xs"
                    />
                  </div>

                  {editForm.embedCode &&
                    getThumbFromEmbed(editForm.embedCode) && (
                      <div className="rounded-lg overflow-hidden bg-[#131A13] p-2">
                        <img
                          src={getThumbFromEmbed(editForm.embedCode)!}
                          alt="Preview"
                          className="w-full max-h-48 object-cover rounded"
                        />
                      </div>
                    )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleUpdate}
                      disabled={updating}
                      className="flex-1 py-2.5 bg-gradient-to-r from-[#228B22] to-[#2E8B57] text-white rounded-lg font-semibold hover:from-[#2E8B57] hover:to-[#3DAA3D] transition-all disabled:opacity-50"
                    >
                      {updating ? "Updating..." : "Update Video"}
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="px-6 py-2.5 bg-[#1A1A1A] text-[#A8C5A8] rounded-lg font-semibold hover:bg-[#252525] hover:text-[#E8F5E8] transition-all border border-[#1F3521]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
