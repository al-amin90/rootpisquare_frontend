"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.querySelector("nav");
      if (nav && !nav.contains(e.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const navItems = [
    { href: "#playlists", label: "Playlists" },
    { href: "#courses", label: "Courses" },
    { href: "#notebooks", label: "Note Books" },
    { href: "#teacher", label: "Teacher" },
    { href: "#contact", label: "Contact" },
    { href: "/login", label: "Login" },
  ];

  return (
    <header
      id="mainHeader"
      className={`sticky top-0 z-100 bg-opacity-95 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "bg-[rgba(10,15,10,0.95)] shadow-lg"
          : "bg-[rgba(10,15,10,0.95)] shadow-md"
      } border-b border-[#1F3521]`}
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <nav
          aria-label="Main navigation"
          className="flex justify-between items-center py-3.5 relative"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[#E8F5E8] no-underline cursor-pointer z-101 group"
            aria-label="Root Pi Square Home"
          >
            <div
              className="relative w-9 h-9 flex items-center justify-center text-lg font-bold text-[#228B22] flex-shrink-0"
              aria-hidden="true"
            >
              <span className="inline-block transition-transform duration-600 group-hover:rotate-360">
                √
              </span>
              <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:[text-shadow:0_0_20px_#3DAA3D,0_0_40px_#228B22]">
                π²
              </span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#3DAA3D] to-[#228B22] bg-clip-text text-transparent whitespace-nowrap">
              Root Pi Square
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex gap-6 list-none items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[#A8C5A8] font-medium transition-colors duration-300 text-sm hover:text-[#228B22] relative group no-underline"
                >
                  {item.label}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#228B22] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-none border-none text-2xl cursor-pointer text-[#E8F5E8] p-2 z-101 transition-transform duration-300 hover:scale-110 focus:outline-2 focus:outline-[#228B22] focus:outline-offset-2"
            onClick={handleMenuClick}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobileNavLinks"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Mobile Navigation Menu */}
          <ul
            className={`fixed md:hidden top-0 left-0 right-0 h-screen bg-[#051005] flex flex-col p-24 gap-0 transition-transform duration-300 z-99 shadow-xl ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            id="mobileNavLinks"
          >
            {navItems.map((item) => (
              <li key={item.href} className="w-full border-b border-[#1F3521]">
                <a
                  href={item.href}
                  className="block py-4 text-base text-[#E8F5E8] no-underline"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
