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
            className="section-title text-4xl md:text-5xl font-extrabold mb-3.5 text-[#E8F5E8]"
          >
            Your Teacher
          </h2>
          <p className="section-description text-base md:text-xl text-[#A8C5A8]">
            Learn from experienced educators dedicated to your academic success.
          </p>
        </div>

        {/* Teacher Card */}
        <article className="teacher-card animate-on-scroll scale flex flex-col md:flex-row gap-8 md:gap-16 items-center bg-gradient-to-b from-[#0F170F] to-[#0A0F0A] backdrop-blur-3xl bg-opacity-80 border border-[#1F3521] rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-400 hover:-translate-y-2 hover:shadow-3xl hover:border-[#228B22] max-w-4xl mx-auto">
          {/* Teacher Image Wrapper */}
          <div className="teacher-image-wrapper relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#228B22] to-[#1A6B1A] rounded-2xl z-0 opacity-50 filter blur-2xl transition-opacity duration-400 hover:opacity-80"></div>
            <div className="relative z-10">
              <Image
                src={teacher.image}
                alt={teacher.imageAlt}
                width={180}
                height={180}
                loading="lazy"
                className="teacher-image w-44 h-44 md:w-52 md:h-52 rounded-xl object-cover border-4 border-[#1F551F] shadow-lg transition-transform duration-400 hover:scale-105"
              />
            </div>
          </div>

          {/* Teacher Details */}
          <div className="teacher-details flex-1 text-center md:text-left">
            {/* Teacher Name */}
            <h3 className="teacher-name text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#3DAA3D] to-[#228B22] bg-clip-text text-transparent">
              {teacher.name}
            </h3>

            {/* Designation */}
            <p className="teacher-designation text-base md:text-lg text-[#228B22] font-semibold mb-2">
              {teacher.designation}
            </p>

            {/* Experience Badge */}
            <div className="teacher-experience inline-flex md:inline-flex items-center gap-2 px-4 py-2 bg-[#131A13] border border-[#1F551F] rounded-lg text-sm text-[#A8C5A8] font-semibold mb-4 before:content-['⭐']">
              {teacher.experience}
            </div>

            {/* Bio */}
            <p className="teacher-bio text-[#A8C5A8] mb-4 text-base leading-relaxed">
              {teacher.bio}
            </p>

            {/* Message/Quote */}
            <div
              className={`teacher-message px-4 py-3 bg-[#131A13] border-l-4 border-[#228B22] rounded-lg font-italic text-[#3DAA3D] mb-5 text-base leading-relaxed before:content-['\"'] before:text-3xl before:text-[#228B22] before:leading-none before:mr-1 after:content-['\"'] after:text-3xl after:text-[#228B22] after:leading-none after:ml-1`}
            >
              {teacher.message}
            </div>

            {/* Social Links */}
            <div className="teacher-social flex gap-3.5 md:justify-start justify-center">
              {teacher.social.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-gradient-to-br from-[#228B22] to-[#2D8F2D] flex items-center justify-center text-white text-lg font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 hover:rotate-6 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2"
                  aria-label={social.ariaLabel}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </article>
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
