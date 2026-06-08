/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetDynamicQuery } from "@/src/redux/features/dynamic/dynamicApi";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { data: statsData, isLoading } = useGetDynamicQuery({
    url: "/auth/stats",
  });

  const [stats, setStats] = useState([
    { label: "Classes", value: "0", icon: "🎓", key: "totalClasses" },
    { label: "Subjects", value: "0", icon: "📚", key: "totalSubjects" },
    { label: "Playlists", value: "0", icon: "🎬", key: "totalPlaylists" },
    { label: "Videos", value: "0", icon: "▶", key: "totalVideos" },
    { label: "Batches", value: "0", icon: "👥", key: "totalBatches" },
    { label: "Notes", value: "0", icon: "📝", key: "totalNotes" },
  ]);

  useEffect(() => {
    if (statsData?.data?.overview) {
      const overview = statsData.data.overview;
      setStats([
        {
          label: "Classes",
          value: overview.totalClasses || "0",
          icon: "🎓",
          key: "totalClasses",
        },
        {
          label: "Subjects",
          value: overview.totalSubjects || "0",
          icon: "📚",
          key: "totalSubjects",
        },
        {
          label: "Playlists",
          value: overview.totalPlaylists || "0",
          icon: "🎬",
          key: "totalPlaylists",
        },
        {
          label: "Videos",
          value: overview.totalVideos || "0",
          icon: "▶",
          key: "totalVideos",
        },
        {
          label: "Batches",
          value: overview.totalBatches || "0",
          icon: "👥",
          key: "totalBatches",
        },
        {
          label: "Notes",
          value: overview.totalNotes || "0",
          icon: "📝",
          key: "totalNotes",
        },
      ]);
    }
  }, [statsData, setStats]);

  const quickActions = [
    {
      href: "/dashboard/classes",
      label: "+ Add Class",
      icon: "🎓",
      color: "bg-blue-500",
    },
    {
      href: "/dashboard/subjects",
      label: "+ Add Subject",
      icon: "📚",
      color: "bg-green-500",
    },
    {
      href: "/dashboard/playlists",
      label: "+ Create Playlist",
      icon: "🎬",
      color: "bg-purple-500",
    },
    {
      href: "/dashboard/videos",
      label: "+ Post Video",
      icon: "▶",
      color: "bg-red-500",
    },
    {
      href: "/dashboard/batches",
      label: "+ Create Batch",
      icon: "👥",
      color: "bg-yellow-500",
    },
    {
      href: "/dashboard/notes",
      label: "+ Add Note",
      icon: "📝",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="p-6 bg-[#0A0F0A] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-[#E8F5E8] mb-1">
            Dashboard Overview
          </h1>
          <p className="text-[#A8C5A8] text-sm">
            Manage your educational content
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-gradient-to-br from-[#0F170F] to-[#131A13] border border-[#1F3521] rounded-xl p-4 hover:border-[#228B22] hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              {isLoading ? (
                <div className="h-8 w-16 bg-[#1F3521] rounded animate-pulse mb-1"></div>
              ) : (
                <div className="text-2xl font-extrabold text-[#228B22] mb-1">
                  {s.value}
                </div>
              )}
              <div className="text-[#A8C5A8] text-sm font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats Row */}
        {statsData?.data?.overview && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-4">
              <div className="text-[#A8C5A8] text-sm mb-1">
                Total Playlist Subjects
              </div>
              <div className="text-2xl font-bold text-[#3DAA3D]">
                {statsData.data.overview.totalPlaylistSubjects || 0}
              </div>
            </div>
            <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-4">
              <div className="text-[#A8C5A8] text-sm mb-1">
                Total Available Slots
              </div>
              <div className="text-2xl font-bold text-[#3DAA3D]">
                {statsData.data.overview.totalSlots || 0}
              </div>
            </div>
            <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-4">
              <div className="text-[#A8C5A8] text-sm mb-1">
                Average Discount
              </div>
              <div className="text-2xl font-bold text-[#3DAA3D]">
                {statsData.data.overview.averageDiscount || 0}%
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {statsData?.data?.recent && (
          <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6 mb-8">
            <h2 className="font-bold text-[#E8F5E8] mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {/* Recent Videos */}
              {statsData.data.recent.videos?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-[#3DAA3D] text-sm font-semibold mb-2">
                    📹 Latest Videos
                  </h3>
                  {statsData.data.recent.videos
                    .slice(0, 3)
                    .map((video: any) => (
                      <div
                        key={video._id}
                        className="flex items-center justify-between p-3 bg-[#131A13] rounded-lg mb-2"
                      >
                        <div>
                          <p className="text-[#E8F5E8] text-sm font-medium">
                            {video.name}
                          </p>
                          <p className="text-[#A8C5A8] text-xs">
                            {video.className?.name} • {video.subjectName?.name}
                          </p>
                        </div>
                        <span className="text-xs text-red-400">Video</span>
                      </div>
                    ))}
                </div>
              )}

              {/* Recent Batches */}
              {statsData.data.recent.batches?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-[#3DAA3D] text-sm font-semibold mb-2">
                    👥 Latest Batches
                  </h3>
                  {statsData.data.recent.batches
                    .slice(0, 3)
                    .map((batch: any) => (
                      <div
                        key={batch._id}
                        className="flex items-center justify-between p-3 bg-[#131A13] rounded-lg mb-2"
                      >
                        <div>
                          <p className="text-[#E8F5E8] text-sm font-medium">
                            {batch.title}
                          </p>
                          <p className="text-[#A8C5A8] text-xs">
                            {batch.className?.name}
                          </p>
                        </div>
                        <span className="text-xs text-yellow-400">Batch</span>
                      </div>
                    ))}
                </div>
              )}

              {/* Recent Notes */}
              {statsData.data.recent.notes?.length > 0 && (
                <div>
                  <h3 className="text-[#3DAA3D] text-sm font-semibold mb-2">
                    📝 Latest Notes
                  </h3>
                  {statsData.data.recent.notes.slice(0, 3).map((note: any) => (
                    <div
                      key={note._id}
                      className="flex items-center justify-between p-3 bg-[#131A13] rounded-lg mb-2"
                    >
                      <div>
                        <p className="text-[#E8F5E8] text-sm font-medium">
                          {note.name}
                        </p>
                      </div>
                      <span className="text-xs text-indigo-400">Note</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
          <h2 className="font-bold text-[#E8F5E8] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`${action.color} bg-opacity-20 hover:bg-opacity-30 border border-${action.color.split("-")[1]}-500/30 rounded-lg p-3 text-center transition-all hover:scale-105`}
              >
                <div className="text-2xl mb-1">{action.icon}</div>
                <div className="text-[#E8F5E8] text-xs font-medium">
                  {action.label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#0F170F] border border-[#1F3521] rounded-xl p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#228B22] mx-auto"></div>
              <p className="text-[#A8C5A8] mt-4">Loading dashboard data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
