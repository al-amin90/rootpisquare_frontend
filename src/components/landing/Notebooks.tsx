"use client";

import { TNote } from "@/src/types";
import { useGetDynamicQuery } from "@/src/redux/features/dynamic/dynamicApi";
import { useEffect } from "react";

interface NotebookItem {
  image: string;
  name: string;
  driveLink: string;
  ariaLabel: string;
}

const NotebookItem = ({ notebook }: { notebook: NotebookItem }) => {
  const handleClick = () => {
    // Open the Google Drive link in a new tab
    if (notebook.driveLink) {
      window.open(notebook.driveLink, "_blank");
    } else {
      const toast = document.getElementById("toast");
      if (toast) {
        toast.textContent = `${notebook.name} notes coming soon!`;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="notebook-item text-center py-6 px-3.5 bg-gradient-to-b from-[#0F170F] to-[#131A13] rounded-lg border-2 border-[#1F3521] transition-all duration-300 hover:border-[#228B22] hover:scale-105 hover:shadow-lg focus:border-[#228B22] focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 cursor-pointer active:scale-95"
      role="button"
      tabIndex={0}
      aria-label={notebook.ariaLabel}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    >
      {/* Notebook Image/Icon */}
      {notebook.image ? (
        <img
          src={notebook.image}
          alt={notebook.name}
          className="notebook-icon w-16 h-16 mx-auto mb-2.5 object-cover rounded-lg"
        />
      ) : (
        <div className="notebook-icon text-5xl mb-2.5 leading-none">📚</div>
      )}

      {/* Notebook Name */}
      <div className="notebook-name font-semibold text-[#E8F5E8] text-base">
        {notebook.name}
      </div>
    </div>
  );
};

export default function Notebooks() {
  // Fetch notes from API
  const { data: noteData, isLoading } = useGetDynamicQuery({
    url: "/note",
  });

  // Group notes by subject/category
  const notebooks: NotebookItem[] = noteData?.data
    ? noteData.data.map((note: TNote) => ({
        image: note.image,
        name: note.name,
        driveLink: note.driveLink,
        ariaLabel: `${note.name} notes - Click to open`,
      }))
    : [];

  // If no notes from API, show default empty state
  const displayNotebooks = notebooks.length > 0 ? notebooks : [];

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
  }, [displayNotebooks]);

  return (
    <section
      id="notebooks"
      className="py-14 bg-[#0A0F0A]"
      aria-labelledby="notebooks-title"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header text-center max-w-2xl mx-auto mb-10 px-4 animate-on-scroll fade-up">
          <span className="section-badge inline-block px-3.5 py-1.5 bg-[#131A13] text-[#3DAA3D] rounded-md text-xs font-semibold mb-3.5 border border-[#1F551F]">
            Study Materials
          </span>
          <h2
            id="notebooks-title"
            className="section-title text-4xl md:text-5xl font-extrabold mb-3.5 text-[#E8F5E8]"
          >
            Note Books - {displayNotebooks.length} Subjects
          </h2>
          <p className="section-description text-base md:text-xl text-[#A8C5A8]">
            Comprehensive handwritten notes and theory materials for all
            subjects.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="notebook-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="bg-[#0F170F] rounded-lg p-6 border border-[#1F3521] animate-pulse"
              >
                <div className="w-16 h-16 bg-[#1F3521] rounded-lg mx-auto mb-2"></div>
                <div className="h-4 w-20 bg-[#1F3521] rounded mx-auto"></div>
              </div>
            ))}
          </div>
        )}

        {/* Notebooks Grid */}
        {!isLoading && displayNotebooks.length > 0 && (
          <div className="notebook-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {displayNotebooks.map((notebook, index) => (
              <div
                key={notebook.name}
                className="animate-on-scroll scale"
                style={{
                  animation: `scaleIn 0.6s ease ${index * 0.05}s both`,
                }}
              >
                <NotebookItem notebook={notebook} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && displayNotebooks.length === 0 && (
          <div className="text-center py-12 bg-[#0F170F] rounded-xl border border-[#1F3521]">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-[#E8F5E8] mb-2">
              No Notes Available
            </h3>
            <p className="text-[#A8C5A8]">
              Check back soon for study materials!
            </p>
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

        .animate-on-scroll.scale {
          transform: scale(0.95);
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translate(0) scale(1);
        }
      `}</style>
    </section>
  );
}
