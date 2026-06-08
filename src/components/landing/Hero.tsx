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
      className="hero py-20 md:py-28 lg:py-32 bg-gradient-to-br from-[#051005] via-[#0A0F0A] to-[#051005] relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#228B22]/10 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3DAA3D]/10 rounded-full filter blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#228B22]/5 rounded-full filter blur-3xl animate-pulse-glow"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#228B22] to-transparent animate-scan"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DAA3D] to-transparent animate-scan-reverse"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#3DAA3D]/60 rounded-full animate-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        <div className="hero-content relative text-center max-w-4xl mx-auto">
          {/* Animated Badge */}
          <div className="animate-on-scroll fade-down">
            <span className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#131A13] to-[#0F170F] text-[#3DAA3D] rounded-full text-sm font-semibold mb-6 border border-[#1F551F] shadow-lg hover:shadow-[0_0_20px_rgba(34,139,34,0.2)] transition-all duration-300 group">
              <span className="w-2 h-2 bg-[#3DAA3D] rounded-full animate-pulse-bright"></span>
              শিক্ষা হোক সবার জন্য
              <span className="w-2 h-2 bg-[#3DAA3D] rounded-full animate-pulse-bright"></span>
            </span>
          </div>

          {/* Main Heading with Typewriter Effect */}
          <div className="animate-on-scroll fade-up">
            <h1
              id="hero-title"
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-[#3DAA3D] via-[#228B22] to-[#3DAA3D] bg-clip-text text-transparent bg-300% animate-gradient">
                Learn Any Subject
              </span>
              <br />
              <span className="text-[#E8F5E8] relative inline-block">
                Anytime, Anywhere
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="4"
                  viewBox="0 0 200 4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 2 L200 2"
                    stroke="#228B22"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-dash"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="200"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </span>
            </h1>
          </div>

          {/* Description with Slide Animation */}
          <p className="text-base md:text-xl text-[#A8C5A8] mb-10 px-4 md:px-0 leading-relaxed animate-on-scroll fade-up max-w-2xl mx-auto">
            Unlock your potential with Root Pi Square. Master Math, Science,
            Physics, Chemistry and more through structured courses, free
            playlists, and comprehensive note books.
          </p>

          {/* CTA Buttons with Enhanced Effects */}
          <div className="hero-cta flex gap-4 justify-center flex-wrap md:flex-nowrap animate-on-scroll fade-up">
            {/* Primary Button with Glow Effect */}
            <a
              href="#courses"
              className="btn btn-primary px-8 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center gap-2 cursor-pointer text-sm md:text-base bg-gradient-to-r from-[#228B22] to-[#2D8F2D] text-white shadow-lg hover:shadow-2xl hover:shadow-[#228B22]/50 hover:-translate-y-1 hover:scale-105 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 group relative overflow-hidden"
              aria-label="Start learning with our courses"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"></span>
              <span className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="text-xl group-hover:animate-bounce-light">
                📚
              </span>
              <span>Start Learning</span>
              <span
                aria-hidden="true"
                className="text-xl transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            {/* Secondary Button with Neon Effect */}
            <a
              href="https://wa.me/8801758055533"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary px-8 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border-2 border-[#1F551F] text-sm md:text-base bg-[#131A13] text-[#E8F5E8] hover:border-[#228B22] hover:text-[#3DAA3D] hover:bg-[#0F170F] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,139,34,0.3)] focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 group relative overflow-hidden"
              aria-label="Chat with us on WhatsApp"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"></span>
              <span className="text-xl">💬</span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#228B22] to-[#2D8F2D] border-2 border-[#0A0F0A] flex items-center justify-center text-xs font-bold text-white"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-[#A8C5A8]">5000+ Happy Students</span>
            </div>
            <div className="w-1 h-1 bg-[#1F3521] rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#3DAA3D] text-lg">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-[#A8C5A8]">4.9 Rating</span>
            </div>
            <div className="w-1 h-1 bg-[#1F3521] rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <span className="text-[#A8C5A8]">100% Satisfaction</span>
            </div>
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
        transform: translate(-30px, 30px);
      }
    }

    @keyframes floatSlow {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      50% {
        transform: translate(20px, -20px) scale(1.1);
      }
    }

    @keyframes floatDelayed {
      0%, 100% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(30px, -30px);
      }
    }

    @keyframes pulseGlow {
      0%, 100% {
        opacity: 0.3;
        transform: scale(1);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.05);
      }
    }

    @keyframes scan {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @keyframes scanReverse {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    @keyframes particle {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) translateX(50px);
        opacity: 0;
      }
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

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

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes pulseBright {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(0.8);
      }
    }

    @keyframes bounceLight {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }

    .animate-float {
      animation: float 15s ease-in-out infinite;
    }

    .animate-float-slow {
      animation: floatSlow 20s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: floatDelayed 18s ease-in-out infinite;
    }

    .animate-pulse-glow {
      animation: pulseGlow 4s ease-in-out infinite;
    }

    .animate-scan {
      animation: scan 3s linear infinite;
    }

    .animate-scan-reverse {
      animation: scanReverse 3s linear infinite;
    }

    .animate-particle {
      animation: particle 4s ease-in-out infinite;
    }

    .animate-on-scroll {
      opacity: 0;
      transition: opacity 0.8s ease, transform 0.8s ease;
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

    .animate-gradient {
      background-size: 300% 300%;
      animation: gradient 3s ease infinite;
    }

    .animate-pulse-bright {
      animation: pulseBright 1.5s ease-in-out infinite;
    }

    .animate-bounce-light {
      animation: bounceLight 1s ease-in-out infinite;
    }

    .bg-grid-pattern {
      background-image: 
        linear-gradient(to right, #1F3521 1px, transparent 1px),
        linear-gradient(to bottom, #1F3521 1px, transparent 1px);
      background-size: 50px 50px;
    }

    .bg-300\% {
      background-size: 300%;
    }
  `}</style>
    </section>
  );
}
