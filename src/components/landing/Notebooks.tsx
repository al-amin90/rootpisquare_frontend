"use client";

import { useEffect } from "react";

interface NotebookItem {
  icon: string;
  name: string;
  ariaLabel: string;
}

const NotebookItem = ({ notebook }: { notebook: NotebookItem }) => {
  const handleClick = () => {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = `${notebook.name} notes coming soon!`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
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
      {/* Notebook Icon */}
      <div className="notebook-icon text-5xl mb-2.5 leading-none">
        {notebook.icon}
      </div>

      {/* Notebook Name */}
      <div className="notebook-name font-semibold text-[#E8F5E8] text-base">
        {notebook.name}
      </div>
    </div>
  );
};

export default function Notebooks() {
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
  }, []);

  const notebooks: NotebookItem[] = [
    { icon: "📐", name: "Math", ariaLabel: "Math notes" },
    { icon: "🔬", name: "Science", ariaLabel: "Science notes" },
    { icon: "⚛️", name: "Physics", ariaLabel: "Physics notes" },
    { icon: "🧪", name: "Chemistry", ariaLabel: "Chemistry notes" },
    { icon: "📚", name: "English", ariaLabel: "English notes" },
    { icon: "🧬", name: "Biology", ariaLabel: "Biology notes" },
    { icon: "💻", name: "ICT", ariaLabel: "ICT notes" },
  ];

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
            Note Books - 7 Subjects
          </h2>
          <p className="section-description text-base md:text-xl text-[#A8C5A8]">
            Comprehensive handwritten notes and theory materials for all
            subjects.
          </p>
        </div>

        {/* Notebooks Grid */}
        <div className="notebook-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {notebooks.map((notebook, index) => (
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
