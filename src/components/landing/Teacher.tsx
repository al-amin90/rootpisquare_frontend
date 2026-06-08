"use client";

import { useEffect } from "react";
import Image from "next/image";

interface TeacherInfo {
  name: string;
  designation: string;
  experience: string;
  bio: string;
  message: string;
  image: string;
  imageAlt: string;
  social: {
    platform: string;
    icon: string;
    url: string;
    ariaLabel: string;
  }[];
}

export default function Teacher() {
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

  const teacher: TeacherInfo = {
    name: "MD. Sakib Saleem",
    designation: "Founder & Lead Instructor",
    experience: "5+ Years Teaching Experience",
    bio: "With years of experience in teaching Mathematics and Science, MD. Sakib Saleem has helped hundreds of students achieve excellence in SSC and HSC examinations. Specializing in making complex topics simple and engaging.",
    message: "I don't know everything, but I know how to teach everyone.",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZRQB//2Q==",
    imageAlt: "MD. Sakib Saleem, Founder and Lead Instructor at Root Pi Square",
    social: [
      {
        platform: "Facebook",
        icon: "f",
        url: "https://www.facebook.com/ImMD.SakibSaleem",
        ariaLabel: "Visit MD. Sakib Saleem's Facebook Profile",
      },
    ],
  };

  return (
    <section
      id="teacher"
      className="py-14 bg-[#0A0F0A]"
      aria-labelledby="teacher-title"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header text-center max-w-2xl mx-auto mb-10 px-4 animate-on-scroll fade-up">
          <span className="section-badge inline-block px-3.5 py-1.5 bg-[#131A13] text-[#3DAA3D] rounded-md text-xs font-semibold mb-3.5 border border-[#1F551F]">
            Meet Your Mentor
          </span>
          <h2
            id="teacher-title"
            className="section-title text-4xl md:text-[40px] my-3 font-bold mb-3.5 text-[#E8F5E8]"
          >
            Your Teacher
          </h2>
          <p className="section-description text-base md:text-xl text-[#A8C5A8]">
            Learn from experienced educators dedicated to your academic success.
          </p>
        </div>

        {/* Teacher Card */}
        <article className="teacher-card animate-on-scroll scale flex flex-col md:flex-row gap-8 md:gap-16 items-center bg-gradient-to-br from-[#0F170F] via-[#0A0F0A] to-[#051005] backdrop-blur-3xl bg-opacity-90 border border-[#1F3521] rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_30px_rgba(34,139,34,0.3)] hover:border-[#228B22] max-w-4xl mx-auto relative overflow-hidden group">
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#228B22]/0 via-[#228B22]/10 to-[#228B22]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>

          {/* Corner Glow Effects */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#228B22]/20 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#228B22]/20 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Border Glow Animation */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-3xl border-2 border-[#228B22] animate-pulse-ring"></div>
          </div>

          {/* Teacher Image Wrapper */}
          <div className="teacher-image-wrapper relative flex-shrink-0">
            {/* Animated Glow Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#228B22] via-[#3DAA3D] to-[#228B22] rounded-2xl z-0 opacity-0 group-hover:opacity-80 transition-all duration-500 group-hover:blur-2xl animate-pulse-glow"></div>

            {/* Rotating Ring */}
            <div className="absolute inset-[-8px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-2xl border-2 border-[#228B22] border-t-transparent animate-spin-slow"></div>
            </div>

            {/* Image Container */}
            <div className="relative z-10">
              <Image
                src={"/teacher.jpeg"}
                alt={teacher.imageAlt}
                width={180}
                height={180}
                loading="lazy"
                className="teacher-image w-44 h-44 md:w-52 md:h-52 rounded-xl object-cover border-4 border-[#1F551F] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-[#228B22] group-hover:shadow-2xl"
              />

              {/* Pulse Dot on Image */}
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-[#228B22] rounded-full animate-pulse-bright shadow-lg"></div>
            </div>
          </div>

          {/* Teacher Details */}
          <div className="teacher-details flex-1 text-center md:text-left">
            {/* Teacher Name with Animated Underline */}
            <div className="relative inline-block md:inline-block">
              <h3 className="teacher-name text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#3DAA3D] via-[#228B22] to-[#3DAA3D] bg-clip-text text-transparent bg-200% animate-gradient">
                {teacher.name}
              </h3>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#228B22] to-[#3DAA3D] group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>

            {/* Designation with Slide Animation */}
            <p className="teacher-designation text-base md:text-lg text-[#228B22] font-semibold mb-2 transform transition-all duration-500 group-hover:translate-x-2">
              {teacher.designation}
            </p>

            {/* Experience Badge with Glow */}
            <div className="teacher-experience inline-flex md:inline-flex items-center gap-2 px-4 py-2 bg-[#131A13] border border-[#1F551F] rounded-lg text-sm text-[#A8C5A8] font-semibold mb-4 transition-all duration-300 group-hover:border-[#228B22] group-hover:shadow-[0_0_15px_rgba(34,139,34,0.3)] group-hover:scale-105">
              <span className="text-[#228B22] text-lg">⭐</span>
              {teacher.experience}
            </div>

            {/* Bio with Fade Animation */}
            <p className="teacher-bio text-[#A8C5A8] mb-4 text-base leading-relaxed transition-all duration-500 group-hover:text-[#C8E6C9]">
              {teacher.bio}
            </p>

            {/* Message/Quote with Neon Effect */}
            <div
              className={`teacher-message px-4 py-3 bg-[#131A13] border-l-4 border-[#228B22] rounded-lg font-italic text-[#3DAA3D] mb-5 text-base leading-relaxed relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(34,139,34,0.2)] before:content-['"'] before:text-3xl before:text-[#228B22] before:leading-none before:mr-1 after:content-['"'] after:text-3xl after:text-[#228B22] after:leading-none after:ml-1`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#228B22]/0 via-[#228B22]/5 to-[#228B22]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {teacher.message}
            </div>

            {/* Social Links with Bounce Animation */}
            <div className="teacher-social flex gap-3.5 md:justify-start justify-center">
              {teacher.social.map((social, index) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-gradient-to-br from-[#228B22] to-[#2D8F2D] flex items-center justify-center text-white text-lg font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-2 hover:rotate-12 hover:scale-110 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 animate-social-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={social.ariaLabel}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </article>

        {/* Add these animations to your styles */}
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
      <style>{`
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.05);
      opacity: 0;
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes pulse-bright {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.8);
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

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes social-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .animate-pulse-ring {
    animation: pulse-ring 2s ease-out infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .animate-pulse-bright {
    animation: pulse-bright 1.5s ease-in-out infinite;
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }

  .animate-social-in {
    animation: social-in 0.5s ease-out forwards;
  }
`}</style>
    </section>
  );
}
