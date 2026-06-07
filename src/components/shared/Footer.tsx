"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { href: "#playlists", label: "Playlists", aria: "Go to playlists section" },
    { href: "#courses", label: "Courses", aria: "Go to courses section" },
    {
      href: "#notebooks",
      label: "Note Books",
      aria: "Go to notebooks section",
    },
    { href: "#teacher", label: "Teacher", aria: "Go to teacher section" },
  ];

  const subjects = [
    { href: "#playlists", label: "Mathematics" },
    { href: "#playlists", label: "Science" },
    { href: "#playlists", label: "Physics" },
    { href: "#playlists", label: "Chemistry" },
    { href: "#playlists", label: "Biology" },
  ];

  const contactLinks = [
    {
      href: "https://wa.me/8801758055533",
      label: "💬 WhatsApp: 01758055533",
      aria: "Contact us on WhatsApp",
      target: true,
    },
    {
      href: "tel:+8801758055533",
      label: "📞 Call: 01758055533",
      aria: "Call us at 01758055533",
      target: false,
    },
    {
      href: "mailto:info@rootpisquare.com",
      label: "✉️ Email: info@rootpisquare.com",
      aria: "Email us at info@rootpisquare.com",
      target: false,
    },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/immd.sakibsaleem",
      label: "Facebook",
      icon: "f",
      aria: "Follow us on Facebook",
      bgColor: "bg-[#1877F2]",
    },
    {
      href: "#",
      label: "YouTube",
      icon: "▶",
      aria: "Subscribe to our YouTube channel",
      bgColor: "bg-[#FF0000]",
    },
    {
      href: "https://wa.me/8801758055533",
      label: "WhatsApp",
      icon: "W",
      aria: "Message us on WhatsApp",
      bgColor: "bg-[#25D366]",
    },
    {
      href: "#",
      label: "Instagram",
      icon: "📷",
      aria: "Follow us on Instagram",
      bgColor: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    },
    {
      href: "https://t.me/+2rFcEQ_FI6w0NjE1",
      label: "Telegram",
      icon: "✈️",
      aria: "Join our Telegram channel",
      bgColor: "bg-[#0088CC]",
    },
    {
      href: "#",
      label: "LinkedIn",
      icon: "in",
      aria: "Connect on LinkedIn",
      bgColor: "bg-[#0A66C2]",
    },
    {
      href: "#",
      label: "TikTok",
      icon: "♪",
      aria: "Follow us on TikTok",
      bgColor: "bg-black",
    },
  ];

  return (
    <>
      {/* Footer */}
      <footer
        id="contact"
        role="contentinfo"
        className="bg-[#051005] border-t border-[#1F3521] py-10"
      >
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-7">
            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="text-sm font-bold mb-3.5 text-[#E8F5E8]">
                Quick Links
              </h3>
              <ul className="footer-links list-none space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-label={link.aria}
                      className="text-[#A8C5A8] text-sm no-underline transition-colors duration-300 inline-flex items-center gap-1.5 hover:text-[#228B22] focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subjects */}
            <div className="footer-section">
              <h3 className="text-sm font-bold mb-3.5 text-[#E8F5E8]">
                Subjects
              </h3>
              <ul className="footer-links list-none space-y-2.5">
                {subjects.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#A8C5A8] text-sm no-underline transition-colors duration-300 inline-flex items-center gap-1.5 hover:text-[#228B22] focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="footer-section">
              <h3 className="text-sm font-bold mb-3.5 text-[#E8F5E8]">
                Contact Us
              </h3>
              <ul className="footer-links list-none space-y-2.5">
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-label={link.aria}
                      target={link.target ? "_blank" : undefined}
                      rel={link.target ? "noopener noreferrer" : undefined}
                      className="text-[#A8C5A8] text-sm no-underline transition-colors duration-300 inline-flex items-center gap-1.5 hover:text-[#228B22] focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div className="footer-section">
              <h3 className="text-sm font-bold mb-3.5 text-[#E8F5E8]">
                Follow Us
              </h3>
              <p className="text-[#A8C5A8] text-sm mb-3.5">
                Connect with us on social media
              </p>
              <div className="social-icons flex flex-wrap gap-3.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-item flex flex-col items-center gap-1.5 no-underline transition-transform duration-300 hover:-translate-y-1 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 rounded-lg"
                    aria-label={social.aria}
                  >
                    <div
                      className={`social-icon w-11 h-11 rounded-full ${social.bgColor} flex items-center justify-center text-white font-bold text-xl transition-all duration-300 shadow-md hover:shadow-xl`}
                      aria-hidden="true"
                    >
                      {social.icon}
                    </div>
                    <span className="social-label text-xs text-[#A8C5A8] font-medium">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom text-center py-7 border-t border-[#1F3521] text-[#7A9A7A] text-xs">
            <p>
              &copy; 2025 Root Pi Square. All rights reserved. | Learn Any
              Subject
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        id="backToTop"
        onClick={handleBackToTop}
        aria-label="Back to top"
        title="Back to top"
        className={`back-to-top fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[#228B22] to-[#2D8F2D] rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-98 shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2 ${
          showBackToTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        ↑
      </button>
    </>
  );
}
