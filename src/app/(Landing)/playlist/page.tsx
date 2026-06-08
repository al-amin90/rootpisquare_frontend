"use client";

import { useState, useEffect } from "react";
import { useGetDynamicQuery } from "@/src/redux/features/dynamic/dynamicApi";
import { TVideo } from "@/src/types";
import { useSearchParams, useRouter } from "next/navigation";

interface VideoItem {
  _id: string;
  name: string;
  youtubeURL: string;
  subjectName: {
    _id: string;
    name: string;
  };
  className: {
    _id: string;
    name: string;
  };
}

export default function PlaylistPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch all videos
  const { data: videoData, isLoading: videosLoading } = useGetDynamicQuery({
    url: "/video",
  });

  // Fetch classes for filter
  const { data: classData } = useGetDynamicQuery({
    url: "/class",
  });

  useEffect(() => {
    if (videoData?.data) {
      setVideos(videoData.data);

      // Get query parameters
      const classParam = searchParams.get("class");
      const subjectParam = searchParams.get("subject");

      // Set selected class from URL if valid
      if (classParam && classParam !== "undefined" && classParam !== "null") {
        const classExists = videoData.data.some(
          (video: VideoItem) => video.className._id === classParam,
        );
        if (classExists) {
          setSelectedClass(classParam);
        }
      }

      // Set selected subject from URL if valid
      if (
        subjectParam &&
        subjectParam !== "undefined" &&
        subjectParam !== "null"
      ) {
        const subjectExists = videoData.data.some(
          (video: VideoItem) => video.subjectName?._id === subjectParam,
        );
        if (subjectExists) {
          setSelectedSubject(subjectParam);
        }
      }
    }
  }, [videoData, searchParams]);

  // Filter videos when selection changes
  useEffect(() => {
    let filtered = [...videos];

    if (selectedClass) {
      filtered = filtered.filter(
        (video) => video.className._id === selectedClass,
      );
    }

    if (selectedSubject) {
      filtered = filtered.filter(
        (video) => video.subjectName?._id === selectedSubject,
      );
    }

    setFilteredVideos(filtered);

    // Select first video from filtered results if available
    if (filtered.length > 0) {
      setSelectedVideo(filtered[0]);
    } else {
      setSelectedVideo(null);
    }
    setIsPlaying(false);

    // Update URL with current filters
    const params = new URLSearchParams();
    if (selectedClass) params.set("class", selectedClass);
    if (selectedSubject) params.set("subject", selectedSubject);

    const newUrl = params.toString()
      ? `/playlist?${params.toString()}`
      : "/playlist";
    router.replace(newUrl, { scroll: false });
  }, [selectedClass, selectedSubject, videos, router]);

  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&showinfo=0`;
  };

  const getThumbnailUrl = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  const handleClassChange = (classId: string) => {
    setSelectedClass(classId);
    setSelectedSubject("");
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  const clearFilters = () => {
    setSelectedClass("");
    setSelectedSubject("");
  };

  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    // Scroll to player on mobile
    if (window.innerWidth < 768) {
      document
        .getElementById("video-player")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get unique classes from videos
  const availableClasses = [
    ...new Map(
      videos.map((video) => [video.className._id, video.className]),
    ).values(),
  ];

  // Get unique subjects from videos (filtered by selected class)
  const availableSubjects = selectedClass
    ? [
        ...new Map(
          videos
            .filter((v) => v.className._id === selectedClass)
            .map((video) => [video.subjectName?._id, video.subjectName]),
        ).values(),
      ]
    : [
        ...new Map(
          videos.map((video) => [video.subjectName?._id, video.subjectName]),
        ).values(),
      ];

  // Get current class and subject names for display
  const currentClassName = selectedClass
    ? availableClasses.find((c) => c._id === selectedClass)?.name
    : "";
  const currentSubjectName = selectedSubject
    ? availableSubjects.find((s) => s._id === selectedSubject)?.name
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F0A] to-[#051005]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#3DAA3D] to-[#228B22] bg-clip-text text-transparent mb-4">
            Video Library
          </h1>
          <p className="text-[#A8C5A8] text-lg max-w-2xl mx-auto">
            Watch educational videos directly on our platform
          </p>

          {/* Active Filters Display */}
          {(selectedClass || selectedSubject) && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {selectedClass && currentClassName && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#228B22]/20 text-[#3DAA3D] rounded-full text-sm">
                  <span>🎓</span>
                  {currentClassName}
                  <button
                    onClick={() => setSelectedClass("")}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSubject && currentSubjectName && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#228B22]/20 text-[#3DAA3D] rounded-full text-sm">
                  <span>📚</span>
                  {currentSubjectName}
                  <button
                    onClick={() => setSelectedSubject("")}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {(selectedClass || selectedSubject) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 text-[#A8C5A8] text-sm hover:text-[#3DAA3D] transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>

        {/* Main Content - Video Player & Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <div
              id="video-player"
              className="bg-[#0F170F] rounded-xl border border-[#1F3521] overflow-hidden sticky top-4"
            >
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                {selectedVideo ? (
                  <iframe
                    key={selectedVideo._id}
                    src={getEmbedUrl(selectedVideo.youtubeURL)}
                    title={selectedVideo.name}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-[#131A13]">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎬</div>
                      <p className="text-[#A8C5A8]">
                        Select a video to start watching
                      </p>
                      {filteredVideos.length === 0 && !videosLoading && (
                        <button
                          onClick={clearFilters}
                          className="mt-4 px-4 py-2 bg-[#228B22] text-white rounded-lg text-sm hover:bg-[#2E8B57] transition-colors"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              {selectedVideo && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#E8F5E8] mb-3">
                    {selectedVideo.name}
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#228B22]/20 text-[#3DAA3D] rounded-lg text-sm font-semibold">
                      <span>🎓</span>
                      {selectedVideo.className.name}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#228B22]/20 text-[#3DAA3D] rounded-lg text-sm font-semibold">
                      <span>📚</span>
                      {selectedVideo.subjectName?.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Filters & Playlist Sidebar */}
          <div className="lg:col-span-1">
            {/* Filters */}
            <div className="bg-[#0F170F] rounded-xl border border-[#1F3521] p-5 mb-6">
              <h3 className="text-[#E8F5E8] font-bold mb-4 flex items-center gap-2">
                <span>🔍</span>
                Filter Videos
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#A8C5A8] text-sm mb-2">
                    Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg focus:border-[#228B22] focus:outline-none transition-all cursor-pointer text-sm"
                  >
                    <option value="">All Classes</option>
                    {availableClasses.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div>
                  <label className="block text-[#A8C5A8] text-sm mb-2">
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#131A13] border border-[#1F3521] text-[#E8F5E8] rounded-lg focus:border-[#228B22] focus:outline-none transition-all cursor-pointer text-sm"
                    disabled={availableSubjects.length === 0}
                  >
                    <option value="">All Subjects</option>
                    {availableSubjects.map((sub) => (
                      <option key={sub?._id} value={sub?._id}>
                        {sub?.name}
                      </option>
                    ))}
                  </select>
                </div> */}

                {(selectedClass || selectedSubject) && (
                  <button
                    onClick={clearFilters}
                    className="w-full mt-2 px-3 py-2 bg-[#131A13] border border-[#1F3521] text-[#A8C5A8] rounded-lg text-sm hover:border-[#228B22] hover:text-[#3DAA3D] transition-all"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Playlist */}
            <div className="bg-[#0F170F] rounded-xl border border-[#1F3521] overflow-hidden">
              <div className="p-5 border-b border-[#1F3521]">
                <h3 className="text-[#E8F5E8] font-bold flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span>📋</span>
                    Playlist
                  </span>
                  <span className="text-xs text-[#A8C5A8]">
                    {filteredVideos.length} videos
                  </span>
                </h3>
              </div>

              <div className="max-h-[500px] overflow-y-auto">
                {videosLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse flex gap-3">
                        <div className="w-24 h-16 bg-[#1F3521] rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-[#1F3521] rounded mb-2"></div>
                          <div className="h-3 bg-[#1F3521] rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredVideos.length > 0 ? (
                  <div className="divide-y divide-[#1F3521]">
                    {filteredVideos.map((video) => (
                      <button
                        key={video._id}
                        onClick={() => handleVideoSelect(video)}
                        className={`w-full p-4 flex gap-3 hover:bg-[#131A13] transition-all text-left group ${
                          selectedVideo?._id === video._id
                            ? "bg-[#131A13] border-l-4 border-l-[#228B22]"
                            : ""
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={getThumbnailUrl(video.youtubeURL)}
                            alt={video.name}
                            className="w-24 h-16 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs">▶ Watch</span>
                          </div>
                          {selectedVideo?._id === video._id && (
                            <div className="absolute inset-0 border-2 border-[#228B22] rounded-lg"></div>
                          )}
                        </div>

                        {/* Video Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#E8F5E8] text-sm mb-1 line-clamp-2 group-hover:text-[#3DAA3D] transition-colors">
                            {video.name}
                          </h4>
                          <p className="text-[#A8C5A8] text-xs">
                            {video.className.name} • {video.subjectName?.name}
                          </p>
                        </div>

                        {/* Playing Indicator */}
                        {selectedVideo?._id === video._id && (
                          <div className="flex-shrink-0">
                            <span className="w-2 h-2 bg-[#3DAA3D] rounded-full animate-pulse"></span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3">🎬</div>
                    <p className="text-[#A8C5A8] text-sm">No videos found</p>
                    <button
                      onClick={clearFilters}
                      className="mt-3 text-[#3DAA3D] text-sm hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {!videosLoading && videos.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0F170F] rounded-lg p-4 text-center border border-[#1F3521]">
              <div className="text-2xl mb-1">📹</div>
              <div className="text-[#3DAA3D] font-bold text-xl">
                {filteredVideos.length}
              </div>
              <div className="text-[#A8C5A8] text-sm">Showing Videos</div>
            </div>
            <div className="bg-[#0F170F] rounded-lg p-4 text-center border border-[#1F3521]">
              <div className="text-2xl mb-1">🎓</div>
              <div className="text-[#3DAA3D] font-bold text-xl">
                {availableClasses.length}
              </div>
              <div className="text-[#A8C5A8] text-sm">Classes</div>
            </div>
            <div className="bg-[#0F170F] rounded-lg p-4 text-center border border-[#1F3521]">
              <div className="text-2xl mb-1">📚</div>
              <div className="text-[#3DAA3D] font-bold text-xl">
                {availableSubjects.length}
              </div>
              <div className="text-[#A8C5A8] text-sm">Subjects</div>
            </div>
            <div className="bg-[#0F170F] rounded-lg p-4 text-center border border-[#1F3521]">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-[#3DAA3D] font-bold text-xl">Free</div>
              <div className="text-[#A8C5A8] text-sm">Access</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
