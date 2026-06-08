"use client";

import { useEffect, useState } from "react";
import { useGetDynamicQuery } from "@/src/redux/features/dynamic/dynamicApi";
import { TBatch } from "@/src/types";
import Image from "next/image";

interface CourseCardProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPersent: number;
  slots: string;
  icon?: string;
  className: {
    _id: string;
    name: string;
  };
}

const CourseCard = ({ course }: { course: CourseCardProps }) => {
  const discountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const whatsappMessage = `Hi! I'm interested in "${course.title}" (${course.className.name}) batch. Please share the details and joining process.`;
  const whatsappNumber = "8801758055533";

  return (
    <article className="card bg-gradient-to-br from-[#0F170F] via-[#0F0F0F] to-[#131A13] rounded-xl p-5 border border-[#1F3521] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#228B22]/30 hover:border-[#228B22] focus-within:outline focus-within:outline-2 focus-within:[outline-color:#228B22] focus-within:outline-offset-2 flex flex-col relative group overflow-hidden">
      {/* Animated Background Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#228B22]/0 via-[#228B22]/5 to-[#228B22]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Corner Glow Effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#228B22]/30 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#3DAA3D]/30 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150"></div>

      {/* Border Glow Animation */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-xl border-2 border-[#228B22] animate-pulse-ring"></div>
      </div>

      {/* Discount Badge with Enhanced Animation */}
      {course.discountPersent > 0 && (
        <span className="discount-badge absolute top-3.5 right-3.5 bg-gradient-to-r from-[#22C55E] to-[#228B22] text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-lg animate-pulse-slow z-10 hover:scale-105 transition-transform duration-300">
          🔥 {course.discountPersent}% OFF
        </span>
      )}

      {/* Card Icon with Enhanced Animation */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-[#228B22] to-[#3DAA3D] rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        <div
          className="card-icon relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#228B22] to-[#2D8F2D] flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {course.icon ? (
            <Image
              src={course.icon}
              alt={`${course.title} icon`}
              fill
              className="rounded-xl object-cover"
            />
          ) : (
            <span className="text-2xl">🎓</span>
          )}
        </div>
      </div>

      {/* Card Title and Class Badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="card-title text-lg md:text-xl font-bold text-[#E8F5E8] leading-snug line-clamp-2 transition-all duration-300 group-hover:text-[#3DAA3D]">
          {course.title}
        </h3>

        <div className="inline-block px-2 py-1 bg-[#228B22]/20 text-[#3DAA3D] rounded text-xs font-medium whitespace-nowrap transition-all duration-300 group-hover:bg-[#228B22] group-hover:text-white group-hover:scale-105">
          {course.className?.name}
        </div>
      </div>

      {/* Card Description */}
      <p className="card-description text-[#A8C5A8] mb-4 text-sm flex-grow line-clamp-2 transition-all duration-300 group-hover:text-[#C8E6C9]">
        {course.description ||
          `Complete ${course.title} preparation with expert guidance and regular assessments.`}
      </p>

      {/* Price Wrapper with Animation */}
      <div className="price-wrapper flex items-baseline gap-2.5 flex-wrap mb-4">
        {course.discountPersent > 0 && (
          <span
            className="price-original text-base md:text-lg font-semibold text-[#7A9A7A] line-through group-hover:text-[#9A9A9A] transition-all duration-300"
            aria-label={`Original price ${course.price} taka`}
          >
            ৳{course.price}
          </span>
        )}
        <span
          className="price-tag text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#3DAA3D] to-[#228B22] bg-clip-text text-transparent group-hover:from-[#4CAF50] group-hover:to-[#32CD32] transition-all duration-300"
          aria-label={`Discounted price ${discountedPrice(course.price, course.discountPersent)} taka per month`}
        >
          ৳{discountedPrice(course.price, course.discountPersent)}
          <span className="price-period text-xs md:text-sm text-[#A8C5A8] font-medium ml-1 group-hover:text-[#3DAA3D] transition-all duration-300">
            /month
          </span>
        </span>
      </div>

      {/* Features with Hover Effects */}
      <div className="flex items-center gap-4 mb-4 text-xs text-[#A8C5A8]">
        <div className="flex items-center gap-1 transition-all duration-300 group-hover:text-[#3DAA3D] group-hover:scale-105">
          <span className="text-base">👥</span>
          <span>{course.slots} seats</span>
        </div>
        <div className="flex items-center gap-1 transition-all duration-300 group-hover:text-[#3DAA3D] group-hover:scale-105">
          <span className="text-base">📅</span>
          <span>Live classes</span>
        </div>
      </div>

      {/* Join Button with Enhanced Effects */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer border-none text-sm md:text-base relative overflow-hidden bg-gradient-to-r from-[#228B22] to-[#2D8F2D] text-white shadow-lg hover:shadow-2xl hover:shadow-[#228B22]/50 hover:-translate-y-1 hover:scale-[1.02] focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 group/btn"
        aria-label={`Join ${course.title} batch via WhatsApp`}
      >
        {/* Animated Button Background */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600"></span>
        <span className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>

        {/* Button Content */}
        <span className="text-xl transition-all duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110">
          💬
        </span>
        <span className="font-bold">Join Batch Now</span>
        <span className="text-lg transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110">
          →
        </span>

        {/* WhatsApp Badge */}
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full text-xs flex items-center justify-center animate-pulse-slow">
          ✓
        </span>
      </a>

      {/* Hover Tooltip Effect */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#228B22] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Click to join on WhatsApp
      </div>
    </article>
  );
};

export default function Courses() {
  // Fetch batches
  const { data: batchData, isLoading } = useGetDynamicQuery({
    url: "/batch",
  });

  // Compute batches directly without state and useEffect

  const batches: CourseCardProps[] = batchData?.data
    ? batchData.data.map((batch: TBatch) => ({
        _id: batch._id,
        title: batch.title,
        description: batch.description,
        price: batch.price,
        discountPersent: batch.discountPersent,
        slots: batch.slots,
        className: batch.className,
        icon: batch.icon,
      }))
    : [];

  // Intersection Observer for animations
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
  }, [batches]);

  // Calculate statistics
  const totalBatches = batches.length;
  const averageDiscount =
    batches.length > 0
      ? batches.reduce((acc, batch) => acc + batch.discountPersent, 0) /
        batches.length
      : 0;
  const totalSlots = batches.reduce(
    (acc, batch) => acc + parseInt(batch.slots),
    0,
  );

  if (isLoading) {
    return (
      <section className="py-20 bg-[#0A0F0A]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-32 bg-[#1F3521] rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 w-96 bg-[#1F3521] rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-64 bg-[#1F3521] rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-[#0F170F] rounded-xl p-5 border border-[#1F3521] animate-pulse"
              >
                <div className="h-14 w-14 bg-[#1F3521] rounded-xl mb-4"></div>
                <div className="h-6 bg-[#1F3521] rounded mb-2"></div>
                <div className="h-4 bg-[#1F3521] rounded mb-4"></div>
                <div className="h-10 bg-[#1F3521] rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="courses"
      className="py-20 bg-gradient-to-b from-[#0A0F0A] to-[#051005]"
      aria-labelledby="courses-title"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="section-header text-center max-w-3xl mx-auto mb-12 animate-on-scroll fade-up">
          <span className="section-badge inline-block px-3.5 py-1.5 bg-[#131A13] text-[#3DAA3D] rounded-md text-xs font-semibold mb-3.5 border border-[#1F551F]">
            🚀 Limited Time Offer
          </span>
          <h2
            id="courses-title"
            className="section-title text-4xl md:text-[2.5rem] mt-2 font-extrabold mb-4 text-[#E8F5E8]"
          >
            Live Batch Courses - {totalBatches || 6} Courses
          </h2>
          <p className="section-description text-base md:text-lg text-[#A8C5A8] max-w-2xl mx-auto">
            Join our interactive live batches with expert guidance and regular
            assessments. 50% OFF on all courses!
          </p>
        </div>

        {/* Courses Grid */}
        {batches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {batches.map((course, index) => (
              <div
                key={course._id}
                className="animate-on-scroll fade-up"
                style={{
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
                }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0F170F] rounded-xl border border-[#1F3521]">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-[#E8F5E8] mb-2">
              No Active Batches
            </h3>
            <p className="text-[#A8C5A8]">
              Check back soon for new batch announcements!
            </p>
          </div>
        )}

        {/* Trust Badge */}
        {batches.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#131A13] rounded-full border border-[#1F3521]">
              <span className="text-2xl">⭐</span>
              <span className="text-[#A8C5A8] text-sm">
                Trusted by 5000+ students
              </span>
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        )}
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
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
