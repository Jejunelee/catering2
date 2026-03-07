"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-black/5
      transition-all duration-300
      ${scrolled ? "py-2 bg-[#FFEFE0]/10 backdrop-blur-md" : "py-3 bg-[#FFEFE0]"}`}
    >
      <div className="max-w-[1790px] mx-auto flex items-center justify-between px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/Logo.png"
            alt="Cravings Catering Logo"
            width={320}
            height={83}
            priority
            className={`object-contain transition-all duration-300
            ${scrolled ? "scale-[0.85]" : "scale-100"}`}
          />
        </Link>

        {/* Right Side */}
        <div
          className={`flex items-center gap-10 transition-all duration-300
          ${scrolled ? "scale-[0.9]" : "scale-100"}`}
        >

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12 text-[25px] font-jost text-black">

            <Link href="/events" className="hover:text-[#F15B19] transition-colors duration-200">
              Events & Catering
            </Link>

            <Link href="/foodtrays" className="hover:text-[#F15B19] transition-colors duration-200">
              Food Trays
            </Link>

            <Link href="/gifts" className="hover:text-[#F15B19] transition-colors duration-200">
              Gifts
            </Link>

            <Link href="/venues" className="hover:text-[#F15B19] transition-colors duration-200">
              Venues
            </Link>

            <Link href="/blog" className="hover:text-[#F15B19] transition-colors duration-200">
              Blogs & Articles
            </Link>

          </nav>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="font-jost bg-[#F15B19] text-white px-8 py-2.5 rounded-[21px] text-[22px]
            shadow-[0_6px_16px_rgba(241,91,25,0.25)]
            hover:bg-orange-600
            hover:shadow-[0_10px_24px_rgba(241,91,25,0.35)]
            active:scale-[0.97]
            transition-all duration-200"
          >
            Contact Us
          </Link>

        </div>
      </div>
    </header>
  );
}