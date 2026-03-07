"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize (if switching to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const navItems = [
    { href: "/events", label: "Events & Catering" },
    { href: "/foodtrays", label: "Food Trays" },
    { href: "/gifts", label: "Gifts" },
    { href: "/venues", label: "Venues" },
    { href: "/blog", label: "Blogs & Articles" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-black/5
        transition-all duration-300
        ${scrolled ? "py-1 bg-[#FFEFE0]/95 backdrop-blur-md shadow-md" : "py-2 bg-[#FFEFE0]"}`}
      >
        <div className="max-w-[1790px] mx-auto flex items-center justify-between px-4 md:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center group" onClick={() => open && setOpen(false)}>
            <Image
              src="/LogoCater.png"
              alt="Cravings Catering Logo"
              width={240}
              height={83}
              priority
              className={`object-contain transition-all duration-300
              ${scrolled ? "scale-[0.85]" : "scale-100"}`}
            />
          </Link>

          {/* Right Side */}
          <div
            className={`flex items-center gap-4 md:gap-10 transition-all duration-300
            ${scrolled ? "scale-[0.92]" : "scale-100"}`}
          >

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10 text-[16px] lg:text-[19px] font-jost text-black">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="hover:text-[#F15B19] transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F15B19] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Contact Button (hidden on small phones) */}
            <Link
              href="/contact"
              className="hidden sm:inline-block font-jost bg-[#F15B19] text-white px-6 lg:px-8 py-2.5 rounded-[21px] text-[18px] lg:text-[22px]
              shadow-[0_6px_16px_rgba(241,91,25,0.25)]
              hover:bg-orange-600
              hover:shadow-[0_10px_24px_rgba(241,91,25,0.35)]
              hover:-translate-y-0.5
              active:scale-[0.97]
              transition-all duration-200"
            >
              Contact Us
            </Link>

            {/* Hamburger - improved touch target */}
            <button
              className="md:hidden text-black p-2 hover:bg-black/5 rounded-full transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Dropdown - NO BLUR, solid background */}
      <div
        className={`fixed left-0 right-0 z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#FFEFE0] shadow-xl
        ${open ? "max-h-[calc(100vh-73px)] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ 
          top: '73px',
          pointerEvents: open ? 'auto' : 'none'
        }}
      >
        <nav className="flex flex-col h-full overflow-y-auto pb-8">
          
          {/* Navigation Links */}
          <div className="flex-1 px-6 py-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 text-black font-jost text-xl border-b border-black/10 hover:text-[#F15B19] transition-colors group"
              >
                <span>{item.label}</span>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-[#F15B19] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* Contact Section */}
          <div className="px-6 pt-4 pb-6 bg-[#FFE4D0] mt-auto">
            <p className="text-sm text-gray-600 mb-3 font-medium">Ready to start your event?</p>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between w-full bg-[#F15B19] text-white px-6 py-4 rounded-xl text-lg font-medium
              shadow-lg shadow-[#F15B19]/30
              hover:bg-orange-600 active:scale-[0.98] transition-all duration-200"
            >
              <span>Contact Us</span>
              <ChevronRight size={22} />
            </Link>
            
            {/* Social or additional links can go here */}
            <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-[#F15B19]">Privacy</Link>
              <Link href="/terms" className="hover:text-[#F15B19]">Terms</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Backdrop overlay when menu is open - NO BLUR */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 md:hidden z-30"
          style={{ top: '73px' }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}