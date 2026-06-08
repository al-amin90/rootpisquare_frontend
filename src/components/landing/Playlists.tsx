/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useGetDynamicQuery } from "@/src/redux/features/dynamic/dynamicApi";
import Link from "next/link";
import toast from "react-hot-toast";

interface PlaylistCard {
  _id: string;
  subjectName: {
    _id: string;
    name: string;
  };
  image: string;
  description: string;
  icon?: string;
}

interface SubjectSection {
  icon: string;
  title: string;
  className: string;
  classId: string;
  subjects: PlaylistCard[];
}

const PlaylistCard = ({
  card,
  className,
  classId,
}: {
  card: PlaylistCard;
  className: string;
  classId: string;
}) => {
  return (
    <article className="card bg-gradient-to-br from-[#0F170F] to-[#131A13] rounded-xl p-5 border border-[#1F3521] transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#228B22]/20 hover:border-[#228B22] focus-within:outline focus-within:outline-2 focus-within:[outline-color:#228B22] focus-within:outline-offset-2 flex flex-col relative group overflow-hidden">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#228B22]/0 via-[#228B22]/5 to-[#228B22]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Corner Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#228B22]/20 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#3DAA3D]/20 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Image or Icon */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        {card.image ? (
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={card.image}
              alt={card.subjectName.name}
              className="w-full h-32 object-cover rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0A] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50">
              <div className="w-12 h-12 rounded-full bg-[#228B22] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <span className="text-white text-xl">▶</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-icon w-full h-32 rounded-lg bg-gradient-to-br from-[#228B22] to-[#2D8F2D] flex items-center justify-center text-4xl font-bold text-white mb-0 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            {card.icon || "📚"}
          </div>
        )}
      </div>

      {/* Card Title */}
      <h4 className="card-title text-lg font-bold mb-2 text-[#E8F5E8] leading-snug line-clamp-1 transition-all duration-300 group-hover:text-[#3DAA3D]">
        {card.subjectName.name}
      </h4>

      {/* Class Badge */}
      <div className="mb-3">
        <span className="inline-block px-2 py-1 bg-[#228B22]/20 text-[#3DAA3D] rounded text-xs font-medium transition-all duration-300 group-hover:bg-[#228B22] group-hover:text-white">
          {className}
        </span>
      </div>

      {/* Card Description */}
      <p className="card-description text-[#A8C5A8] mb-4 text-sm flex-grow line-clamp-2 transition-all duration-300 group-hover:text-[#C8E6C9]">
        {card.description ||
          `Complete ${card.subjectName.name} curriculum for ${className}`}
      </p>

      {/* Play Button with Enhanced Hover */}
      <Link
        href={"/playlist"}
        className="playlist-btn mt-auto px-4 py-2.5 bg-[#131A13] text-[#E8F5E8] border border-[#1F551F] rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-[#228B22] hover:text-white hover:border-[#228B22] hover:-translate-y-0.5 hover:shadow-lg focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 cursor-pointer inline-flex items-center justify-center gap-2 group/btn relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600"></span>
        <span className="transition-transform duration-300 group-hover/btn:scale-110">
          ▶
        </span>
        <span>Start Learning</span>
      </Link>
    </article>
  );
};

export default function Playlists() {
  const [groupedPlaylists, setGroupedPlaylists] = useState<SubjectSection[]>(
    [],
  );

  // Fetch all playlists
  const { data: playlistData, isLoading } = useGetDynamicQuery({
    url: "/playlist",
  });

  // Fetch classes for mapping
  const { data: classData } = useGetDynamicQuery({
    url: "/class",
  });

  useEffect(() => {
    if (playlistData?.data && classData?.data) {
      const playlists = playlistData.data;
      const classes = classData.data;

      // Group playlists by class
      const grouped = classes
        .map((cls: any) => {
          // Find playlist for this class
          const classPlaylist = playlists.find(
            (playlist: any) => playlist.className?._id === cls._id,
          );

          // Get subjects from the playlist
          const subjects = classPlaylist?.subjects || [];

          // Assign icon based on subject type
          const subjectsWithIcons = subjects.map((subject: any) => ({
            ...subject,
            icon: getSubjectIcon(subject.subjectName?.name || ""),
          }));

          return {
            icon: getClassIcon(cls.name),
            title: `${cls.name} Subjects`,
            className: cls.name,
            classId: cls._id,
            subjects: subjectsWithIcons,
          };
        })
        .filter((section: SubjectSection) => section.subjects.length > 0);

      setGroupedPlaylists(grouped);
    }
  }, [playlistData, classData]);

  // Helper function to get icon based on subject name
  const getSubjectIcon = (subjectName: string) => {
    const icons: { [key: string]: string } = {
      Math: "📐",
      Mathematics: "📐",
      Science: "🔬",
      Physics: "⚛️",
      Chemistry: "🧪",
      Biology: "🧬",
      English: "📚",
      Bangla: "📖",
      ICT: "💻",
      "Higher Math": "📊",
      Religion: "🕌",
      "Social Science": "🌍",
    };
    return icons[subjectName] || "📘";
  };

  // Helper function to get icon based on class name
  const getClassIcon = (className: string) => {
    if (
      className.includes("5") ||
      className.includes("6") ||
      className.includes("7") ||
      className.includes("8")
    ) {
      return "🎒";
    }
    if (className.includes("9") || className.includes("10")) {
      return "📖";
    }
    if (
      className.includes("11") ||
      className.includes("12") ||
      className.includes("HSC")
    ) {
      return "🎓";
    }
    return "📚";
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groupedPlaylists]);

  if (isLoading) {
    return (
      <section className="py-20 bg-[#0A0F0A]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-32 bg-[#1F3521] rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 w-96 bg-[#1F3521] rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-64 bg-[#1F3521] rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-[#0F170F] rounded-xl p-5 border border-[#1F3521] animate-pulse"
              >
                <div className="h-32 bg-[#1F3521] rounded-lg mb-4"></div>
                <div className="h-6 bg-[#1F3521] rounded mb-2"></div>
                <div className="h-4 bg-[#1F3521] rounded mb-4"></div>
                <div className="h-10 bg-[#1F3521] rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="playlists"
      className="py-20 bg-gradient-to-b from-[#0A0F0A] to-[#051005]"
      aria-labelledby="playlists-title"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header text-center max-w-3xl mx-auto mb-16 animate-on-scroll fade-up">
          <span className="section-badge inline-block px-3.5 py-1.5 bg-[#131A13] text-[#3DAA3D] rounded-md text-xs font-semibold mb-3.5 border border-[#1F551F]">
            🎓 Free Learning Resources
          </span>
          <h2
            id="playlists-title"
            className="section-title text-4xl  md:text-[2.5rem] my-2  font-bold mb-4 text-[#E8F5E8]"
          >
            Subject Playlists by Class
          </h2>
          <p className="section-description text-base md:text-lg text-[#A8C5A8] max-w-2xl mx-auto">
            Access curated video playlists for all major subjects from Class 5
            to Class 12. Learn at your own pace, anytime, anywhere.
          </p>
        </div>

        {/* Subject Sections */}
        {groupedPlaylists.length > 0 ? (
          groupedPlaylists.map((section, sectionIndex) => (
            <div key={section.classId} className="mb-16">
              {/* Subject Title */}
              <div className="animate-on-scroll fade-left">
                <h3 className="subject-title text-2xl md:text-3xl font-bold text-[#E8F5E8] mb-6 pb-3 border-b-2 border-[#1F551F] flex items-center gap-3">
                  <span aria-hidden="true" className="text-3xl">
                    {section.icon}
                  </span>
                  {section.title}
                  <span className="text-sm font-normal text-[#A8C5A8] ml-auto">
                    {section.subjects.length} subjects
                  </span>
                </h3>
              </div>

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {section.subjects.map((subject, cardIndex) => (
                  <div
                    key={subject._id}
                    className="animate-on-scroll scale"
                    style={{
                      animation: `scaleIn 0.6s ease ${cardIndex * 0.05}s both`,
                    }}
                  >
                    <PlaylistCard
                      card={subject}
                      className={section.className}
                      classId={section.classId}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-[#E8F5E8] mb-2">
              No Playlists Available
            </h3>
            <p className="text-[#A8C5A8]">Check back soon for new content!</p>
          </div>
        )}

        {/* CTA Section */}
        {groupedPlaylists.length > 0 && (
          <div className="mt-16 text-center animate-on-scroll fade-up">
            <div className="bg-gradient-to-r from-[#228B22]/10 to-[#2E8B57]/10 rounded-2xl p-8 border border-[#1F3521]">
              <h3 className="text-2xl font-bold text-[#E8F5E8] mb-3">
                Ready to Start Your Learning Journey?
              </h3>
              <p className="text-[#A8C5A8] mb-6">
                Join thousands of students who are already learning with us
              </p>
              <Link
                href="/dashboard/videos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#228B22] text-white rounded-lg font-semibold hover:bg-[#2E8B57] transition-all hover:scale-105"
              >
                <span>🎯</span>
                <span>Browse All Videos</span>
              </Link>
            </div>
          </div>
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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.fade-up {
          transform: translateY(30px);
        }

        .animate-on-scroll.fade-left {
          transform: translateX(-30px);
        }

        .animate-on-scroll.scale {
          transform: scale(0.95);
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translate(0) scale(1);
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
