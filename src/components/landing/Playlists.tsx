"use client";

import { useEffect } from "react";

interface PlaylistCard {
  icon: string;
  title: string;
  description: string;
  ariaLabel: string;
}

interface SubjectSection {
  icon: string;
  title: string;
  gridType: "grid-6" | "grid-4";
  cards: PlaylistCard[];
}

const PlaylistCard = ({ card }: { card: PlaylistCard }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = `Loading ${card.title} playlist...`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
    }
  };

  return (
    <article className="card bg-[#0F170F] rounded-xl p-5 border border-[#1F3521] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-[#228B22] hover:bg-[#131A13] focus-within:outline focus-within:outline-2 focus-within:[outline-color:#228B22] focus-within:outline-offset-2 flex flex-col relative">
      {/* Card Icon */}
      <div
        className="card-icon w-11 h-11 rounded-lg bg-gradient-to-br from-[#228B22] to-[#2D8F2D] flex items-center justify-center text-lg font-bold text-white mb-3.5 flex-shrink-0"
        aria-hidden="true"
      >
        {card.icon}
      </div>

      {/* Card Title */}
      <h4 className="card-title text-base font-bold mb-2 text-[#E8F5E8] leading-snug">
        {card.title}
      </h4>

      {/* Card Description */}
      <p className="card-description text-[#A8C5A8] mb-3.5 text-xs flex-grow">
        {card.description}
      </p>

      {/* Play Button */}
      <button
        onClick={handleClick}
        className="playlist-btn mt-auto px-3.5 py-2.5 bg-[#131A13] text-[#E8F5E8] border border-[#1F551F] rounded-lg text-xs font-semibold transition-all duration-300 hover:bg-[#228B22] hover:text-white hover:border-[#228B22] hover:-translate-y-0.5 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 cursor-pointer inline-flex items-center justify-center gap-1.5"
        aria-label={card.ariaLabel}
      >
        ▶ Start Now
      </button>
    </article>
  );
};

export default function Playlists() {
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

  const subjects: SubjectSection[] = [
    {
      icon: "📐",
      title: "Mathematics (Class 5-10)",
      gridType: "grid-6",
      cards: [
        {
          icon: "5",
          title: "Class 5 Math",
          description: "Basic arithmetic, geometry basics, fractions",
          ariaLabel: "Start Class 5 Math video playlist",
        },
        {
          icon: "6",
          title: "Class 6 Math",
          description: "Integers, decimals, data handling",
          ariaLabel: "Start Class 6 Math video playlist",
        },
        {
          icon: "7",
          title: "Class 7 Math",
          description: "Algebra basics, ratios, exponents",
          ariaLabel: "Start Class 7 Math video playlist",
        },
        {
          icon: "8",
          title: "Class 8 Math",
          description: "Linear equations, geometry, mensuration",
          ariaLabel: "Start Class 8 Math video playlist",
        },
        {
          icon: "9",
          title: "Class 9 Math",
          description: "Algebra, geometry, trigonometry",
          ariaLabel: "Start Class 9 Math video playlist",
        },
        {
          icon: "10",
          title: "Class 10 Math",
          description: "SSC prep, advanced algebra & geometry",
          ariaLabel: "Start Class 10 Math video playlist",
        },
      ],
    },
    {
      icon: "🔬",
      title: "Science (Class 5-10)",
      gridType: "grid-6",
      cards: [
        {
          icon: "5",
          title: "Class 5 Science",
          description: "Living world, environment, basic physics",
          ariaLabel: "Start Class 5 Science video playlist",
        },
        {
          icon: "6",
          title: "Class 6 Science",
          description: "Food, materials, living organisms",
          ariaLabel: "Start Class 6 Science video playlist",
        },
        {
          icon: "7",
          title: "Class 7 Science",
          description: "Heat, acids bases, weather & climate",
          ariaLabel: "Start Class 7 Science video playlist",
        },
        {
          icon: "8",
          title: "Class 8 Science",
          description: "Force, friction, sound, cell structure",
          ariaLabel: "Start Class 8 Science video playlist",
        },
        {
          icon: "9",
          title: "Class 9 Science",
          description: "Matter, motion, atoms, life processes",
          ariaLabel: "Start Class 9 Science video playlist",
        },
        {
          icon: "10",
          title: "Class 10 Science",
          description: "Chemical reactions, heredity, electricity",
          ariaLabel: "Start Class 10 Science video playlist",
        },
      ],
    },
    {
      icon: "📊",
      title: "Higher Math (Class 9-12)",
      gridType: "grid-4",
      cards: [
        {
          icon: "9",
          title: "Class 9 H. Math",
          description: "Sets, functions, trigonometry basics",
          ariaLabel: "Start Class 9 Higher Math video playlist",
        },
        {
          icon: "10",
          title: "Class 10 H. Math",
          description: "Coordinate geometry, statistics",
          ariaLabel: "Start Class 10 Higher Math video playlist",
        },
        {
          icon: "11",
          title: "HSC 1st Year",
          description: "Matrices, determinants, calculus",
          ariaLabel: "Start HSC 1st Year Higher Math video playlist",
        },
        {
          icon: "12",
          title: "HSC 2nd Year",
          description: "Integration, vectors, probability",
          ariaLabel: "Start HSC 2nd Year Higher Math video playlist",
        },
      ],
    },
    {
      icon: "⚛️",
      title: "Physics (Class 9-12)",
      gridType: "grid-4",
      cards: [
        {
          icon: "9",
          title: "Class 9 Physics",
          description: "Mechanics, heat, light, sound",
          ariaLabel: "Start Class 9 Physics video playlist",
        },
        {
          icon: "10",
          title: "Class 10 Physics",
          description: "Electricity, magnetism, modern physics",
          ariaLabel: "Start Class 10 Physics video playlist",
        },
        {
          icon: "11",
          title: "HSC 1st Year",
          description: "Vector, dynamics, work & energy",
          ariaLabel: "Start HSC 1st Year Physics video playlist",
        },
        {
          icon: "12",
          title: "HSC 2nd Year",
          description: "Thermodynamics, modern physics",
          ariaLabel: "Start HSC 2nd Year Physics video playlist",
        },
      ],
    },
    {
      icon: "🧪",
      title: "Chemistry (Class 9-12)",
      gridType: "grid-4",
      cards: [
        {
          icon: "9",
          title: "Class 9 Chemistry",
          description: "Atomic structure, periodic table",
          ariaLabel: "Start Class 9 Chemistry video playlist",
        },
        {
          icon: "10",
          title: "Class 10 Chemistry",
          description: "Organic, inorganic, physical chemistry",
          ariaLabel: "Start Class 10 Chemistry video playlist",
        },
        {
          icon: "11",
          title: "HSC 1st Year",
          description: "Chemical bonding, stoichiometry",
          ariaLabel: "Start HSC 1st Year Chemistry video playlist",
        },
        {
          icon: "12",
          title: "HSC 2nd Year",
          description: "Organic chemistry, electrochemistry",
          ariaLabel: "Start HSC 2nd Year Chemistry video playlist",
        },
      ],
    },
    {
      icon: "🧬",
      title: "Biology (Class 9-12)",
      gridType: "grid-4",
      cards: [
        {
          icon: "9",
          title: "Class 9 Biology",
          description: "Cell biology, diversity, tissues",
          ariaLabel: "Start Class 9 Biology video playlist",
        },
        {
          icon: "10",
          title: "Class 10 Biology",
          description: "Life processes, control, heredity",
          ariaLabel: "Start Class 10 Biology video playlist",
        },
        {
          icon: "11",
          title: "HSC 1st Year",
          description: "Cell division, genetics, plant physiology",
          ariaLabel: "Start HSC 1st Year Biology video playlist",
        },
        {
          icon: "12",
          title: "HSC 2nd Year",
          description: "Human physiology, biotechnology",
          ariaLabel: "Start HSC 2nd Year Biology video playlist",
        },
      ],
    },
    {
      icon: "📚",
      title: "English (Class 5-12)",
      gridType: "grid-4",
      cards: [
        {
          icon: "5",
          title: "Class 5 English",
          description: "Grammar basics, reading, writing skills",
          ariaLabel: "Start Class 5 English video playlist",
        },
        {
          icon: "6",
          title: "Class 6 English",
          description: "Vocabulary, comprehension, sentence structure",
          ariaLabel: "Start Class 6 English video playlist",
        },
        {
          icon: "7",
          title: "Class 7 English",
          description: "Advanced grammar, composition, literature",
          ariaLabel: "Start Class 7 English video playlist",
        },
        {
          icon: "8",
          title: "Class 8 English",
          description: "Essay writing, communication skills",
          ariaLabel: "Start Class 8 English video playlist",
        },
        {
          icon: "9",
          title: "Class 9 English",
          description: "Literature, unseen passage, board prep",
          ariaLabel: "Start Class 9 English video playlist",
        },
        {
          icon: "10",
          title: "Class 10 English",
          description: "SSC literature, grammar, writing practice",
          ariaLabel: "Start Class 10 English video playlist",
        },
        {
          icon: "11",
          title: "HSC 1st Year",
          description: "HSC literature, advanced writing, academic skills",
          ariaLabel: "Start HSC 1st Year English video playlist",
        },
        {
          icon: "12",
          title: "HSC 2nd Year",
          description: "Board preparation, critical analysis, essays",
          ariaLabel: "Start HSC 2nd Year English video playlist",
        },
      ],
    },
    {
      icon: "💻",
      title: "ICT (Class 11-12)",
      gridType: "grid-4",
      cards: [
        {
          icon: "11",
          title: "HSC 1st Year ICT",
          description: "C Programming, algorithms, HTML",
          ariaLabel: "Start HSC 1st Year ICT video playlist",
        },
        {
          icon: "12",
          title: "HSC 2nd Year ICT",
          description: "Database, networking, web design",
          ariaLabel: "Start HSC 2nd Year ICT video playlist",
        },
      ],
    },
  ];

  return (
    <section
      id="playlists"
      className="py-14 bg-[#0A0F0A]"
      aria-labelledby="playlists-title"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header text-center max-w-2xl mx-auto mb-10 px-4 animate-on-scroll fade-up">
          <span className="section-badge inline-block px-3.5 py-1.5 bg-[#131A13] text-[#3DAA3D] rounded-md text-xs font-semibold mb-3.5 border border-[#1F551F]">
            Free Resources
          </span>
          <h2
            id="playlists-title"
            className="section-title text-4xl md:text-5xl font-extrabold mb-3.5 text-[#E8F5E8]"
          >
            Subject Playlists by Class
          </h2>
          <p className="section-description text-base md:text-xl text-[#A8C5A8]">
            Access curated video playlists for all major subjects from Class 5
            to Class 12. Learn at your own pace, anytime.
          </p>
        </div>

        {/* Subject Sections */}
        {subjects.map((subject, subjectIndex) => (
          <div key={subject.title}>
            {/* Subject Title */}
            <h3 className="subject-title text-2xl md:text-3xl font-bold text-[#E8F5E8] mt-10 mb-5 pb-3 border-b-2 border-[#1F551F] flex items-center gap-2.5 animate-on-scroll fade-left">
              <span aria-hidden="true" className="text-2xl">
                {subject.icon}
              </span>
              {subject.title}
            </h3>

            {/* Grid of Cards */}
            <div
              className={`grid gap-4 ${
                subject.gridType === "grid-6"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {subject.cards.map((card, cardIndex) => (
                <div
                  key={`${subject.title}-${card.title}`}
                  className="animate-on-scroll scale"
                  style={{
                    animation: `scaleIn 0.6s ease ${cardIndex * 0.05}s both`,
                  }}
                >
                  <PlaylistCard card={card} />
                </div>
              ))}
            </div>
          </div>
        ))}
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
      `}</style>
    </section>
  );
}
