"use client";

import { useEffect } from "react";

interface CourseCard {
  icon: string;
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  period: string;
  originalPriceAria: string;
  discountedPriceAria: string;
  whatsappMessage: string;
  ariaLabel: string;
}

const CourseCard = ({ course }: { course: CourseCard }) => {
  return (
    <article className="card bg-[#0F170F] rounded-xl p-5 border border-[#1F3521] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-[#228B22] hover:bg-[#131A13] focus-within:outline focus-within:outline-2 focus-within:[outline-color:#228B22] focus-within:outline-offset-2 flex flex-col relative">
      {/* Discount Badge */}
      <span className="discount-badge absolute top-3.5 right-3.5 bg-gradient-to-r from-[#22C55E] to-[#228B22] text-white px-2.5 py-1.5 rounded-md text-xs font-bold shadow-md animate-pulse">
        50% OFF
      </span>

      {/* Card Icon */}
      <div
        className="card-icon w-11 h-11 rounded-lg bg-gradient-to-br from-[#228B22] to-[#2D8F2D] flex items-center justify-center text-2xl font-bold text-white mb-3.5 flex-shrink-0"
        aria-hidden="true"
      >
        {course.icon}
      </div>

      {/* Card Title */}
      <h3 className="card-title text-base md:text-lg font-bold mb-2 text-[#E8F5E8] leading-snug">
        {course.title}
      </h3>

      {/* Card Description */}
      <p className="card-description text-[#A8C5A8] mb-3.5 text-xs md:text-sm flex-grow">
        {course.description}
      </p>

      {/* Price Wrapper */}
      <div className="price-wrapper flex items-baseline gap-2.5 flex-wrap mb-3.5">
        <span
          className="price-original text-base md:text-lg font-semibold text-[#7A9A7A] line-through"
          aria-label={course.originalPriceAria}
        >
          {course.originalPrice}
        </span>
        <span
          className="price-tag text-2xl md:text-3xl font-extrabold text-[#228B22]"
          aria-label={course.discountedPriceAria}
        >
          {course.discountedPrice}
          <span className="price-period text-xs md:text-sm text-[#A8C5A8] font-medium ml-1">
            {course.period}
          </span>
        </span>
      </div>

      {/* Join Button */}
      <a
        href={`https://wa.me/8801758055533?text=${encodeURIComponent(course.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary w-full px-3.5 py-2.5 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer border-none text-sm md:text-base whitespace-nowrap relative overflow-hidden bg-gradient-to-br from-[#228B22] to-[#2D8F2D] text-white shadow-lg hover:shadow-2xl hover:-translate-y-0.5 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 group"
        aria-label={course.ariaLabel}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-600"></span>
        Join Batch
      </a>
    </article>
  );
};

export default function Courses() {
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

  const courses: CourseCard[] = [
    {
      icon: "🎯",
      title: "Class 9 Science Batch",
      description:
        "Complete preparation for Class 9 SSC. Math, Physics, Chemistry, Biology coverage.",
      originalPrice: "৳1000",
      discountedPrice: "৳500",
      period: "/month",
      originalPriceAria: "Original price 1000 taka",
      discountedPriceAria: "Discounted price 500 taka per month",
      whatsappMessage: "I'm interested in Class 9 Science Batch",
      ariaLabel: "Join Class 9 Science Batch via WhatsApp",
    },
    {
      icon: "🎓",
      title: "Class 10 Science Batch",
      description:
        "Full SSC preparation for Class 10. Complete syllabus with test papers.",
      originalPrice: "৳1000",
      discountedPrice: "৳500",
      period: "/month",
      originalPriceAria: "Original price 1000 taka",
      discountedPriceAria: "Discounted price 500 taka per month",
      whatsappMessage: "I'm interested in Class 10 Science Batch",
      ariaLabel: "Join Class 10 Science Batch via WhatsApp",
    },
    {
      icon: "📖",
      title: "Class 9 Math Special",
      description:
        "Focused mathematics batch for Class 9. Algebra, Geometry, Trigonometry mastery.",
      originalPrice: "৳1000",
      discountedPrice: "৳500",
      period: "/month",
      originalPriceAria: "Original price 1000 taka",
      discountedPriceAria: "Discounted price 500 taka per month",
      whatsappMessage: "I'm interested in Class 9 Math Special",
      ariaLabel: "Join Class 9 Math Special via WhatsApp",
    },
    {
      icon: "🚀",
      title: "Class 10 Math Special",
      description:
        "Intensive Math preparation for SSC. Board question solving & model tests.",
      originalPrice: "৳1000",
      discountedPrice: "৳500",
      period: "/month",
      originalPriceAria: "Original price 1000 taka",
      discountedPriceAria: "Discounted price 500 taka per month",
      whatsappMessage: "I'm interested in Class 10 Math Special",
      ariaLabel: "Join Class 10 Math Special via WhatsApp",
    },
    {
      icon: "💡",
      title: "Physics-Chemistry Combo",
      description:
        "Combined Physics & Chemistry batch for Classes 9-10. From basics to advanced.",
      originalPrice: "৳1000",
      discountedPrice: "৳500",
      period: "/month",
      originalPriceAria: "Original price 1000 taka",
      discountedPriceAria: "Discounted price 500 taka per month",
      whatsappMessage: "I'm interested in Physics-Chemistry Combo",
      ariaLabel: "Join Physics-Chemistry Combo via WhatsApp",
    },
    {
      icon: "⭐",
      title: "SSC Model Test Batch",
      description:
        "Special doubt clearing & model test batch. Solve previous year questions.",
      originalPrice: "৳1000",
      discountedPrice: "৳500",
      period: "/month",
      originalPriceAria: "Original price 1000 taka",
      discountedPriceAria: "Discounted price 500 taka per month",
      whatsappMessage: "I'm interested in SSC Model Test Batch",
      ariaLabel: "Join SSC Model Test Batch via WhatsApp",
    },
  ];

  return (
    <section
      id="courses"
      className="py-14 bg-[#0A0F0A]"
      aria-labelledby="courses-title"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header text-center max-w-2xl mx-auto mb-10 px-4 animate-on-scroll fade-up">
          <span className="section-badge inline-block px-3.5 py-1.5 bg-[#131A13] text-[#3DAA3D] rounded-md text-xs font-semibold mb-3.5 border border-[#1F551F]">
            Live Classes
          </span>
          <h2
            id="courses-title"
            className="section-title text-4xl md:text-5xl font-extrabold mb-3.5 text-[#E8F5E8]"
          >
            Batch Courses - 6 Courses
          </h2>
          <p className="section-description text-base md:text-xl text-[#A8C5A8]">
            Join our interactive live batches with expert guidance and regular
            assessments. 50% OFF on all courses!
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className="animate-on-scroll fade-up"
              style={{
                animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
              }}
            >
              <CourseCard course={course} />
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
          transform: translate(0);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
