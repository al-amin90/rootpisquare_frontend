"use client";
import {
  useDeleteDynamicMutation,
  useGetDynamicQuery,
  usePatchDynamicMutation,
  usePostDynamicMutation,
} from "@/src/redux/features/dynamic/dynamicApi";
import {
  TClass,
  TSubject,
  TPlaylistForm,
  TSubjectEntryForm,
} from "@/src/types";
import { showApiError } from "@/src/utils/showApiError";
import { useState } from "react";
import toast from "react-hot-toast";

type Playlist = {
  _id: string;
  className: {
    _id: string;
    name: string;
  };
  subjects: Array<{
    _id: string;
    subjectName: {
      _id: string;
      name: string;
    };
    description: string;
    image: string;
  }>;
};

export default function PlaylistsPage() {
  const [editing, setEditing] = useState<Playlist | null>(null);

  const [form, setForm] = useState<TPlaylistForm>({
    className: "",
    subjects: [{ subjectName: "", image: null, description: "" }],
  });

  const [editForm, setEditForm] = useState<TPlaylistForm>({
    className: "",
    subjects: [{ subjectName: "", image: null, description: "" }],
  });

  const { data: playlistData, isLoading } = useGetDynamicQuery({
    url: "/playlist",
  });

  const { data: classData } = useGetDynamicQuery({
    url: "/class",
  });

  const { data: subjectData } = useGetDynamicQuery({
    url: "/subject",
  });

  const [createPlaylist, { isLoading: creating }] = usePostDynamicMutation();
  const [updatePlaylist, { isLoading: updating }] = usePatchDynamicMutation();
  const [deletePlaylist] = useDeleteDynamicMutation();
  const [deletedImages, setDeletedImages] = useState<number[]>([]);

  const playlists: Playlist[] = playlistData?.data || [];
  const classes: TClass[] = classData?.data || [];
  const subjects: TSubject[] = subjectData?.data || [];

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      formData.append("className", form.className);

      formData.append(
        "subjects",
        JSON.stringify(
          form.subjects.map((item) => ({
            subjectName: item.subjectName,
            description: item.description,
          })),
        ),
      );

      form.subjects.forEach((item) => {
        if (item.image) {
          formData.append("subjectImages", item.image);
        }
      });

      await createPlaylist({
        url: "/playlist",
        data: formData,
        invalidatesTags: ["playlist"],
      }).unwrap();

      toast.success("Playlist created successfully");

      setForm({
        className: "",
        subjects: [{ subjectName: "", image: null, description: "" }],
      });
    } catch (error) {
      showApiError(error);
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;

    try {
      const formData = new FormData();

      formData.append("className", editForm.className);

      // Prepare subjects data
      const subjectsData = editForm.subjects.map((item, index) => ({
        subjectName: item.subjectName,
        description: item.description,
        hasNewImage: !!item.image,
      }));

      formData.append("subjects", JSON.stringify(subjectsData));

      // Add deleted images indices
      if (deletedImages.length > 0) {
        formData.append("deletedImages", JSON.stringify(deletedImages));
      }

      // Add new images (only those that have been changed)
      const newImages: File[] = [];
      editForm.subjects.forEach((item, index) => {
        if (item.image instanceof File) {
          newImages.push(item.image);
        }
      });

      // Append each new image
      newImages.forEach((image, idx) => {
        formData.append(`subjectImages`, image);
      });

      await updatePlaylist({
        url: `/playlist/${editing._id}`,
        data: formData,
        invalidatesTags: ["playlist"],
      }).unwrap();

      toast.success("Playlist updated successfully");
      setEditing(null);
      setDeletedImages([]);
    } catch (error) {
      showApiError(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this playlist?");
    if (!confirmed) return;

    try {
      await deletePlaylist({
        url: `/playlist/${id}`,
        invalidatesTags: ["playlist"],
      }).unwrap();
      toast.success("Playlist deleted successfully");
    } catch (error) {
      showApiError(error);
    }
  };

  const addSubjectRow = () => {
    setForm((f) => ({
      ...f,
      subjects: [
        ...f.subjects,
        { subjectName: "", image: null, description: "" },
      ],
    }));
  };

  const addEditSubjectRow = () => {
    setEditForm((f) => ({
      ...f,
      subjects: [
        ...f.subjects,
        { subjectName: "", image: null, description: "" },
      ],
    }));
  };

  const removeSubjectRow = (index: number) => {
    setForm((f) => ({
      ...f,
      subjects: f.subjects.filter((_, i) => i !== index),
    }));
  };

  const removeEditSubjectRow = (index: number) => {
    setEditForm((f) => ({
      ...f,
      subjects: f.subjects.filter((_, i) => i !== index),
    }));
  };

  const updateSubject = (
    i: number,
    key: keyof TSubjectEntryForm,
    value: string | File | null,
  ) => {
    setForm((f) => {
      const subjects = [...f.subjects];
      subjects[i] = { ...subjects[i], [key]: value };
      return { ...f, subjects };
    });
  };

  const updateEditSubject = (
    i: number,
    key: keyof TSubjectEntryForm | "hasNewImage",
    value: string | File | null | boolean,
  ) => {
    setEditForm((f) => {
      const subjects = [...f.subjects];
      subjects[i] = { ...subjects[i], [key]: value };
      if (key === "image" && value instanceof File) {
        subjects[i].hasNewImage = true;
      }
      return { ...f, subjects };
    });
  };

  const openEdit = (playlist: Playlist) => {
    setEditing(playlist);
    setDeletedImages([]); // Reset deleted images
    setEditForm({
      className: playlist.className._id,
      subjects: playlist.subjects.map((subject) => ({
        subjectName: subject.subjectName._id,
        description: subject.description,
        image: null,
        hasNewImage: false, // Track if this subject has a new image
      })),
    });
  };

  const markImageForDeletion = (index: number) => {
    setDeletedImages((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });

    // Also mark in form that image will be deleted
    setEditForm((f) => {
      const subjects = [...f.subjects];
      subjects[index] = {
        ...subjects[index],
        image: null,
        imageDeleted: true,
      };
      return { ...f, subjects };
    });
  };

  return (
    <div className="p-6 bg-[#0A0F0A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">
          Make Playlist
        </h1>
        <p className="text-[#A8C5A8] text-sm mb-8">
          Create playlists by class & subject
        </p>
        {/* Create Form */}
        <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-6">
          <h2 className="font-bold text-[#E8F5E8] mb-5">New Playlist</h2>

          <div className="mb-4">
            <label className="block text-[#A8C5A8] text-sm mb-1.5">Class</label>
            <select
              value={form.className}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  className: e.target.value,
                }))
              }
              className="w-full max-w-xs px-4 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
            >
              <option value="">Select Class</option>
              {classes.map((cls: TClass) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4 mb-5">
            {form.subjects.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-[#131A13] rounded-lg border border-[#1F3521]"
              >
                <select
                  value={s.subjectName}
                  onChange={(e) =>
                    updateSubject(i, "subjectName", e.target.value)
                  }
                  className="px-3 py-2 bg-[#051005] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject: TSubject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    updateSubject(i, "image", e.target.files?.[0] || null)
                  }
                  className="px-3 py-2 bg-[#051005] border border-[#1F3521] text-[#A8C5A8] rounded-lg text-xs focus:border-[#228B22] focus:outline-none file:mr-2 file:bg-[#228B22] file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:text-xs"
                />

                <input
                  value={s.description}
                  onChange={(e) =>
                    updateSubject(i, "description", e.target.value)
                  }
                  placeholder="Description"
                  className="px-3 py-2 bg-[#051005] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none md:col-span-1"
                />

                <button
                  onClick={() => removeSubjectRow(i)}
                  className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={addSubjectRow}
              className="px-4 py-2 border border-[#1F551F] text-[#A8C5A8] rounded-lg text-sm hover:border-[#228B22] hover:text-[#E8F5E8] transition-all"
            >
              + Add Subject Row
            </button>
            <button
              onClick={handleCreate}
              disabled={creating || !form.className}
              className="px-6 py-2 bg-[#228B22] text-white rounded-lg font-semibold text-sm hover:bg-[#3DAA3D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? "Creating..." : "Create Playlist"}
            </button>
          </div>
        </div>
        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-[#0F170F] to-[#0A0F0A] border border-[#1F3521] rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-[#0F170F]/95 backdrop-blur-sm border-b border-[#1F3521] px-6 py-4 rounded-t-2xl z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-[#E8F5E8]">
                      Edit Playlist
                    </h2>
                    <p className="text-sm text-[#A8C5A8] mt-1">
                      Update class and subject information
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditing(null);
                      setDeletedImages([]);
                    }}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Class Selection Card */}
                <div className="bg-[#131A13] rounded-xl border border-[#1F3521] p-5 mb-6">
                  <label className="block text-[#E8F5E8] font-medium text-sm mb-2">
                    Select Class
                  </label>
                  <select
                    value={editForm.className}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        className: e.target.value,
                      }))
                    }
                    className="w-full max-w-md px-4 py-2.5 bg-[#0A0F0A] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none focus:ring-1 focus:ring-[#228B22] transition-all"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subjects Grid */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#E8F5E8] font-semibold">Subjects</h3>
                    <button
                      onClick={addEditSubjectRow}
                      className="px-3 py-1.5 bg-[#228B22]/20 text-[#3DAA3D] rounded-lg text-sm hover:bg-[#228B22]/30 transition-all flex items-center gap-1"
                    >
                      <span>+</span> Add Subject
                    </button>
                  </div>

                  {editForm.subjects.map((s, i) => (
                    <div
                      key={i}
                      className="bg-[#131A13] rounded-xl border border-[#1F3521] overflow-hidden hover:border-[#2E8B57] transition-all"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-xs text-[#7A9A7A] bg-[#0A0F0A] px-2 py-1 rounded">
                            Subject {i + 1}
                          </span>
                          <button
                            onClick={() => removeEditSubjectRow(i)}
                            className="text-red-400 hover:text-red-300 text-sm transition-colors"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Subject Selection */}
                          <div>
                            <label className="block text-[#A8C5A8] text-xs mb-1.5">
                              SUBJECT NAME
                            </label>
                            <select
                              value={s.subjectName}
                              onChange={(e) =>
                                updateEditSubject(
                                  i,
                                  "subjectName",
                                  e.target.value,
                                )
                              }
                              className="w-full px-3 py-2 bg-[#0A0F0A] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
                            >
                              <option value="">Select Subject</option>
                              {subjects.map((subject) => (
                                <option key={subject._id} value={subject._id}>
                                  {subject.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Description */}
                          <div>
                            <label className="block text-[#A8C5A8] text-xs mb-1.5">
                              DESCRIPTION
                            </label>
                            <input
                              value={s.description}
                              onChange={(e) =>
                                updateEditSubject(
                                  i,
                                  "description",
                                  e.target.value,
                                )
                              }
                              placeholder="Brief description"
                              className="w-full px-3 py-2 bg-[#0A0F0A] border border-[#1F3521] text-[#E8F5E8] rounded-lg text-sm focus:border-[#228B22] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Image Section */}
                        <div className="mt-4">
                          <label className="block text-[#A8C5A8] text-xs mb-1.5">
                            SUBJECT IMAGE
                          </label>

                          {/* Image Preview Area */}
                          <div className="mt-2">
                            {s.image instanceof File ? (
                              // New image preview
                              <div className="relative inline-block">
                                <img
                                  src={URL.createObjectURL(s.image)}
                                  alt="Preview"
                                  className="w-32 h-32 object-cover rounded-lg border-2 border-[#228B22]"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateEditSubject(i, "image", null)
                                  }
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                                >
                                  ×
                                </button>
                              </div>
                            ) : editing.subjects[i]?.image &&
                              !s.imageDeleted ? (
                              // Existing image
                              <div>
                                <div className="relative inline-block">
                                  <img
                                    src={editing.subjects[i].image}
                                    alt="Current"
                                    className="w-32 h-32 object-cover rounded-lg border border-[#1F3521]"
                                  />
                                  <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                      type="button"
                                      onClick={() => markImageForDeletion(i)}
                                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                                <p className="text-xs text-green-500 mt-2">
                                  ✓ Current image
                                </p>
                              </div>
                            ) : s.imageDeleted ? (
                              // Marked for deletion
                              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                                <p className="text-xs text-red-400">
                                  ⚠️ Image marked for deletion
                                </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeletedImages((prev) =>
                                      prev.filter((idx) => idx !== i),
                                    );
                                    setEditForm((f) => {
                                      const subjects = [...f.subjects];
                                      subjects[i] = {
                                        ...subjects[i],
                                        imageDeleted: false,
                                      };
                                      return { ...f, subjects };
                                    });
                                  }}
                                  className="text-xs text-green-500 hover:text-green-400 mt-1"
                                >
                                  Cancel removal
                                </button>
                              </div>
                            ) : null}

                            {/* Upload Button */}
                            <div className="mt-3">
                              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-[#0A0F0A] border border-[#1F3521] rounded-lg text-sm text-[#A8C5A8] hover:border-[#228B22] hover:text-[#E8F5E8] transition-all">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                                {s.image instanceof File
                                  ? "Change Image"
                                  : "Upload Image"}
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    updateEditSubject(
                                      i,
                                      "image",
                                      e.target.files?.[0] || null,
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {editForm.subjects.length === 0 && (
                    <div className="text-center py-8 bg-[#131A13] rounded-xl border border-[#1F3521] border-dashed">
                      <p className="text-[#A8C5A8] text-sm">
                        No subjects added
                      </p>
                      <button
                        onClick={addEditSubjectRow}
                        className="mt-2 text-[#3DAA3D] text-sm hover:text-[#228B22]"
                      >
                        + Add your first subject
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-[#1F3521]">
                  <button
                    onClick={handleUpdate}
                    disabled={updating || !editForm.className}
                    className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#228B22] to-[#2E8B57] text-white rounded-lg font-semibold text-sm hover:from-[#2E8B57] hover:to-[#3DAA3D] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {updating ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Update Playlist"
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setEditing(null);
                      setDeletedImages([]);
                    }}
                    className="px-6 py-2.5 bg-[#1A1A1A] text-[#A8C5A8] rounded-lg font-semibold text-sm hover:bg-[#252525] hover:text-[#E8F5E8] transition-all border border-[#1F3521]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Playlists Grid */}
        {playlists.length > 0 && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
            <h2 className="font-bold text-[#E8F5E8] mb-4">
              Playlists ({playlists.length})
            </h2>
            <div className="space-y-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  className="p-5 bg-[#131A13] rounded-xl border border-[#1F3521] hover:border-[#2E8B57] transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[#3DAA3D] font-bold text-lg">
                      🎬 {playlist.className?.name}
                    </h3>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(playlist)}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(playlist._id)}
                        className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlist.subjects?.map((subject) => (
                      <div
                        key={subject._id}
                        className="bg-[#0F170F] border border-[#1F3521] rounded-lg overflow-hidden hover:border-[#2E8B57] transition-all"
                      >
                        {subject.image && (
                          <img
                            src={subject.image}
                            alt={subject.subjectName?.name}
                            className="w-full h-48 object-cover"
                          />
                        )}

                        <div className="p-4">
                          <h4 className="text-white font-semibold text-lg mb-2">
                            {subject.subjectName?.name}
                          </h4>

                          <p className="text-[#A8C5A8] text-sm">
                            {subject.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {playlists.length === 0 && !isLoading && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-12 text-center">
            <p className="text-[#A8C5A8]">
              No playlists found. Create your first playlist!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
