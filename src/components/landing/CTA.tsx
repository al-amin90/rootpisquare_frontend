"use client";

import { useEffect } from "react";

export default function CTA() {
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

  return (
    <section
      aria-labelledby="cta-title"
      className="py-20 bg-gradient-to-b from-[#0A0F0A] to-[#051005] relative overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#228B22]/10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3DAA3D]/10 rounded-full filter blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#228B22]/5 via-transparent to-[#228B22]/5"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        {/* CTA Box */}
        <div className="cta-section animate-on-scroll scale bg-gradient-to-br from-[#0F170F] via-[#0A0F0A] to-[#051005] text-white text-center rounded-3xl p-8 md:p-16 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(34,139,34,0.4)] border border-[#1F3521] relative overflow-hidden group">
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 rounded-3xl border-2 border-[#228B22] animate-pulse-ring"></div>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#228B22]/0 via-[#228B22]/10 to-[#228B22]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          {/* Corner Light Effects */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#228B22]/30 to-transparent rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#228B22]/30 to-transparent rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Floating Orbs */}
          <div className="absolute top-10 left-10 w-3 h-3 bg-[#3DAA3D] rounded-full animate-float-orb opacity-0 group-hover:opacity-100"></div>
          <div className="absolute bottom-10 right-10 w-4 h-4 bg-[#228B22] rounded-full animate-float-orb-delayed opacity-0 group-hover:opacity-100"></div>
          <div className="absolute top-1/2 right-20 w-2 h-2 bg-[#4CAF50] rounded-full animate-float-orb-fast opacity-0 group-hover:opacity-100"></div>

          {/* Decorative Stars */}
          <div className="absolute top-20 right-32 text-[#3DAA3D] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-twinkle">
            ⭐
          </div>
          <div className="absolute bottom-20 left-24 text-[#228B22] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-twinkle-delayed">
            ⭐
          </div>

          {/* CTA Title with Gradient Animation */}
          <h2
            id="cta-title"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-[#E8F5E8] via-[#3DAA3D] to-[#228B22] bg-clip-text text-transparent bg-200% animate-gradient"
          >
            Ready to Excel in Your Studies?
          </h2>

          {/* CTA Description with Slide Animation */}
          <p className="text-base md:text-xl lg:text-2xl mb-8 opacity-95 max-w-2xl mx-auto text-[#A8C5A8] animate-slide-up">
            Join Root Pi Square today and get{" "}
            <span className="text-[#3DAA3D] font-bold animate-pulse-text">
              50% OFF
            </span>{" "}
            on all batch courses. Limited seats available!
          </p>

          {/* Countdown Timer (Optional) */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-[#131A13]/80 backdrop-blur-sm rounded-xl p-3 min-w-[70px] border border-[#1F3521] group-hover:border-[#228B22] transition-all duration-300">
              <div className="text-2xl font-bold text-[#3DAA3D] animate-count">
                24
              </div>
              <div className="text-xs text-[#A8C5A8]">Hours</div>
            </div>
            <div className="bg-[#131A13]/80 backdrop-blur-sm rounded-xl p-3 min-w-[70px] border border-[#1F3521] group-hover:border-[#228B22] transition-all duration-300">
              <div className="text-2xl font-bold text-[#3DAA3D] animate-count">
                60
              </div>
              <div className="text-xs text-[#A8C5A8]">Minutes</div>
            </div>
            <div className="bg-[#131A13]/80 backdrop-blur-sm rounded-xl p-3 min-w-[70px] border border-[#1F3521] group-hover:border-[#228B22] transition-all duration-300">
              <div className="text-2xl font-bold text-[#3DAA3D] animate-count">
                00
              </div>
              <div className="text-xs text-[#A8C5A8]">Seconds</div>
            </div>
          </div>

          {/* CTA Button with Enhanced Effects */}
          <a
            href="https://wa.me/8801758055533"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#228B22] to-[#2D8F2D] text-white rounded-xl font-bold text-base md:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 relative overflow-hidden group/btn"
            aria-label="Get started with Root Pi Square courses"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600"></span>
            <span className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            <span className="text-2xl animate-bounce-light">📚</span>
            <span>Get Started Now</span>
            <span
              aria-hidden="true"
              className="text-xl transition-transform duration-300 group-hover/btn:translate-x-1"
            >
              →
            </span>
          </a>

          {/* Trust Badge */}
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-[#A8C5A8]">
            <div className="flex items-center gap-1">
              <span className="text-[#3DAA3D]">✓</span>
              <span>5000+ Students</span>
            </div>
            <div className="w-1 h-1 bg-[#1F3521] rounded-full"></div>
            <div className="flex items-center gap-1">
              <span className="text-[#3DAA3D]">✓</span>
              <span>Expert Teachers</span>
            </div>
            <div className="w-1 h-1 bg-[#1F3521] rounded-full"></div>
            <div className="flex items-center gap-1">
              <span className="text-[#3DAA3D]">✓</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
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

    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      50% {
        transform: translateY(-20px) translateX(10px);
      }
    }

    @keyframes floatDelayed {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      50% {
        transform: translateY(20px) translateX(-10px);
      }
    }

    @keyframes floatOrb {
      0%, 100% {
        transform: translateY(0) scale(1);
        opacity: 0.8;
      }
      50% {
        transform: translateY(-30px) scale(1.5);
        opacity: 1;
      }
    }

    @keyframes twinkle {
      0%, 100% {
        opacity: 0;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
    }

    @keyframes pulseRing {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1.05);
        opacity: 0;
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

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulseText {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
        text-shadow: 0 0 10px rgba(34,139,34,0.5);
      }
    }

    @keyframes count {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(1.05);
      }
    }

    @keyframes bounceLight {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-3px);
      }
    }

    .animate-on-scroll {
      opacity: 0;
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-on-scroll.scale {
      transform: scale(0.95);
    }

    .animate-on-scroll.visible {
      opacity: 1;
      transform: scale(1);
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: floatDelayed 7s ease-in-out infinite;
    }

    .animate-float-orb {
      animation: floatOrb 4s ease-in-out infinite;
    }

    .animate-float-orb-delayed {
      animation: floatOrb 5s ease-in-out infinite 1s;
    }

    .animate-float-orb-fast {
      animation: floatOrb 3s ease-in-out infinite 0.5s;
    }

    .animate-twinkle {
      animation: twinkle 3s ease-in-out infinite;
    }

    .animate-twinkle-delayed {
      animation: twinkle 3.5s ease-in-out infinite 0.5s;
    }

    .animate-pulse-ring {
      animation: pulseRing 2s ease-out infinite;
    }

    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
    }

    .animate-slide-up {
      animation: slideUp 0.8s ease-out;
    }

    .animate-pulse-text {
      animation: pulseText 1.5s ease-in-out infinite;
    }

    .animate-count {
      animation: count 0.5s ease-out;
    }

    .animate-bounce-light {
      animation: bounceLight 1s ease-in-out infinite;
    }
  `}</style>
    </section>
  );
}
