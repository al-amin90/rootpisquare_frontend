"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="hero py-16 md:py-12 bg-gradient-to-b from-[#051005] to-[#0A0F0A] relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background floating element */}
      <div className="absolute top-[-50%] right-[-20%] w-96 h-96 bg-gradient-radial from-[#1F551F] to-transparent opacity-40 rounded-full animate-float blur-3xl"></div>

      <div className="w-full max-w-6xl mx-auto px-4">
        <div
          className="hero-content relative text-center max-w-3xl mx-auto"
          ref={heroContentRef}
        >
          {/* Badge */}
          <span className="hero-badge inline-block px-4 py-2 bg-[#131A13] text-[#3DAA3D] rounded-full text-sm font-semibold mb-6 border border-[#1F551F] animate-on-scroll fade-down">
            শিক্ষা হোক সবার জন্য
          </span>

          {/* Main Heading */}
          <h1
            id="hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-[#3DAA3D] to-[#228B22] bg-clip-text text-transparent animate-on-scroll fade-up"
          >
            Learn Any Subject
          </h1>

          {/* Description */}
          <p className="text-base md:text-xl text-[#A8C5A8] mb-8 px-4 md:px-0 animate-on-scroll fade-up">
            Unlock your potential with Root Pi Square. Master Math, Science,
            Physics, Chemistry and more through structured courses, free
            playlists, and comprehensive note books.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex gap-3.5 justify-center flex-wrap md:flex-nowrap animate-on-scroll fade-up">
            {/* Primary Button */}
            <a
              href="#courses"
              className="btn btn-primary px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border-none text-sm md:text-base whitespace-nowrap relative overflow-hidden bg-gradient-to-br from-[#228B22] to-[#2D8F2D] text-white shadow-lg hover:shadow-2xl hover:-translate-y-0.5 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 group"
              aria-label="Start learning with our courses"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"></span>
              Start Learning
              <span aria-hidden="true" className="text-lg">
                →
              </span>
            </a>

            {/* Secondary Button */}
            <a
              href="https://wa.me/8801758055533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border-2 border-[#1F551F] text-sm md:text-base whitespace-nowrap relative overflow-hidden bg-[#131A13] text-[#E8F5E8] hover:border-[#228B22] hover:text-[#3DAA3D] hover:bg-[#0F170F] hover:-translate-y-0.5 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 group"
              aria-label="Chat with us on WhatsApp"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"></span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, 20px);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-on-scroll {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.fade-up {
          transform: translateY(30px);
        }

        .animate-on-scroll.fade-down {
          transform: translateY(-20px);
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translate(0) scale(1);
        }
      `}</style>
    </section>
  );
}
