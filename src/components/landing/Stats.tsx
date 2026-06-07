"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  target: number;
  label: string;
}

const StatCounter = ({ target, label }: StatItem) => {
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
    <div className="stat-item bg-[#0F170F] rounded-lg p-6 border border-[#1F3521] transition-all duration-300 hover:-translate-y-1 hover:border-[#228B22] hover:shadow-xl">
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
  const stats: StatItem[] = [
    { target: 500, label: "Students Enrolled" },
    { target: 5, label: "Years Experience" },
    { target: 38, label: "Free Playlists" },
    { target: 6, label: "Live Batches" },
  ];

  return (
    <section
      className="stats-section py-12 bg-[#051005] border-t border-b border-[#1F3521]"
      aria-labelledby="stats-title"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <h2 id="stats-title" className="sr-only">
          Our Achievement Statistics
        </h2>

        {/* Stats Grid */}
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
