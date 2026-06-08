"use client";

import { useEffect, useRef, useState } from "react";
import { useGetDynamicQuery } from "@/src/redux/features/dynamic/dynamicApi";

interface StatItem {
  target: number;
  label: string;
  key: string;
}

const StatCounter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.5 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / 100);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div className="stat-item bg-gradient-to-br from-[#0F170F] to-[#131A13] rounded-lg p-6 border border-[#1F3521] transition-all duration-300 hover:-translate-y-2 hover:border-[#228B22] hover:shadow-xl hover:shadow-[#228B22]/10">
      <span
        ref={counterRef}
        className="stat-number block text-5xl font-extrabold bg-gradient-to-r from-[#3DAA3D] to-[#228B22] bg-clip-text text-transparent mb-2"
      >
        {count}
        <span className="text-2xl">+</span>
      </span>
      <span className="stat-label block text-base text-[#A8C5A8] font-semibold">
        {label}
      </span>
    </div>
  );
};

export default function Stats() {
  const { data: statsData, isLoading } = useGetDynamicQuery({
    url: "/auth/stats",
  });

  const [stats, setStats] = useState<StatItem[]>([
    { target: 0, label: "Students Enrolled", key: "students" },
    { target: 0, label: "Years Experience", key: "experience" },
    { target: 0, label: "Free Resources", key: "resources" },
    { target: 0, label: "Active Batches", key: "batches" },
  ]);

  // Calculate years of experience from platform creation date
  const calculateYearsExperience = () => {
    const platformStartDate = new Date("2020-01-01"); // Change this to your actual start date
    const currentDate = new Date();
    const years = currentDate.getFullYear() - platformStartDate.getFullYear();
    const monthDiff = currentDate.getMonth() - platformStartDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < platformStartDate.getDate())
    ) {
      return years - 1;
    }
    return years;
  };

  useEffect(() => {
    if (statsData?.data?.overview) {
      const overview = statsData.data.overview;

      // Calculate total students (sum of all batch slots)
      const totalStudents = overview.totalSlots || 0;

      // Calculate years of experience dynamically
      const yearsExperience = calculateYearsExperience();

      // Count free resources (playlist subjects + notes)
      const freeResources =
        (overview.totalPlaylistSubjects || 0) + (overview.totalNotes || 0);

      // Active batches (all batches are considered active for now)
      const activeBatches = overview.totalBatches || 0;

      setStats([
        { target: totalStudents, label: "Students Enrolled", key: "students" },
        {
          target: yearsExperience,
          label: "Years Experience",
          key: "experience",
        },
        { target: freeResources, label: "Free Resources", key: "resources" },
        { target: activeBatches, label: "Active Batches", key: "batches" },
      ]);
    }
  }, [statsData]);

  return (
    <section
      className="stats-section py-20 bg-gradient-to-b from-[#051005] to-[#0A0F0A] border-t border-b border-[#1F3521]"
      aria-labelledby="stats-title"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            id="stats-title"
            className="text-3xl md:text-4xl font-bold text-[#E8F5E8] mb-4"
          >
            Our Achievements
          </h2>
          <p className="text-[#A8C5A8] text-lg max-w-2xl mx-auto">
            Empowering students with quality education since 2020
          </p>
        </div>

        {/* Stats Grid */}
        {isLoading ? (
          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#0F170F] rounded-lg p-6 border border-[#1F3521] animate-pulse"
              >
                <div className="h-12 w-24 bg-[#1F3521] rounded mb-2"></div>
                <div className="h-4 w-32 bg-[#1F3521] rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-on-scroll fade-up"
                style={{
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
                }}
              >
                <StatCounter target={stat.target} label={stat.label} />
              </div>
            ))}
          </div>
        )}

        {/* Additional Stats Row */}
        {!isLoading && statsData?.data?.overview && (
          <>
            <div className="mt-12 pt-8 border-t border-[#1F3521]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-[#0F170F]/50 rounded-lg p-4">
                  <div className="text-[#3DAA3D] text-3xl font-bold">
                    {statsData.data.overview.totalClasses}
                  </div>
                  <div className="text-[#A8C5A8] text-sm mt-1">
                    Classes Available
                  </div>
                </div>
                <div className="bg-[#0F170F]/50 rounded-lg p-4">
                  <div className="text-[#3DAA3D] text-3xl font-bold">
                    {statsData.data.overview.totalSubjects}
                  </div>
                  <div className="text-[#A8C5A8] text-sm mt-1">
                    Subjects Covered
                  </div>
                </div>
                <div className="bg-[#0F170F]/50 rounded-lg p-4">
                  <div className="text-[#3DAA3D] text-3xl font-bold">
                    {statsData.data.overview.totalVideos}
                  </div>
                  <div className="text-[#A8C5A8] text-sm mt-1">
                    Video Lessons
                  </div>
                </div>
                <div className="bg-[#0F170F]/50 rounded-lg p-4">
                  <div className="text-[#3DAA3D] text-3xl font-bold">
                    {statsData.data.overview.totalPlaylists}
                  </div>
                  <div className="text-[#A8C5A8] text-sm mt-1">
                    Learning Playlists
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#228B22]/10 rounded-full border border-[#228B22]/30">
                <span className="text-[#3DAA3D] text-sm font-semibold">
                  ⭐ Trusted by {statsData.data.overview.totalSlots || 0}+
                  students
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.fade-up {
          transform: translateY(30px);
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translate(0) scale(1);
        }
      `}</style>
    </section>
  );
}
