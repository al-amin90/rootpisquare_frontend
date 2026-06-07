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
    <section aria-labelledby="cta-title" className="py-14 bg-[#0A0F0A]">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* CTA Box */}
        <div className="cta-section animate-on-scroll scale bg-gradient-to-br from-[#228B22] to-[#1A6B1A] text-white text-center rounded-2xl p-8 md:p-12 shadow-2xl transition-all duration-400 hover:-translate-y-2 hover:shadow-3xl">
          {/* CTA Title */}
          <h2
            id="cta-title"
            className="text-4xl md:text-5xl font-extrabold mb-3.5 leading-tight"
          >
            Ready to Excel in Your Studies?
          </h2>

          {/* CTA Description */}
          <p className="text-base md:text-xl mb-7 opacity-95 max-w-2xl mx-auto">
            Join Root Pi Square today and get 50% OFF on all batch courses.
            Limited seats available!
          </p>

          {/* CTA Button */}
          <a
            href="https://wa.me/8801758055533"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-white inline-flex items-center gap-2 px-8 py-3.5 bg-[#131A13] text-[#E8F5E8] rounded-lg font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 hover:bg-[#0F170F] hover:border-[#228B22] border border-[#1F551F] focus:outline-2 focus:outline-white focus:outline-offset-2 relative overflow-hidden group"
            aria-label="Get started with Root Pi Square courses"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"></span>
            Get Started Now
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </a>
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
      `}</style>
    </section>
  );
}
