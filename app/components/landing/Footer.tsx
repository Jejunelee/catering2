"use client";

import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="font-jost w-full bg-black text-white py-6 md:py-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0">
        
        {/* LEFT - fixed width */}
        <div className="flex flex-col gap-2 md:gap-2 w-full md:w-auto md:min-w-[300px]">
          {/* Logo - reduced size */}
          <div className="relative w-[200px] md:w-[300px] h-auto">
            <Image
              src="/LogoCater.png"
              alt="Cravings Logo"
              width={400}
              height={126}
              className="object-contain w-full h-auto"
              priority={false}
            />
          </div>

          <p className="text-xs md:text-sm text-white/80 md:text-white">
            © 2026 Cravings Catering Group.<br className="md:hidden" /> All rights reserved.
          </p>
        </div>

        {/* RIGHT - 30% wider */}
        <div className="flex flex-col gap-4 md:gap-5 w-full md:w-[520px] md:max-w-[520px]">
          
          {/* Date Section */}
          <div className="w-full">
            <p className="text-base md:text-lg mb-1 md:mb-1.5">
              When's the special day?
            </p>

            <div className="text-sm md:text-base flex items-center border-b border-gray-400 pb-1">
              <input
                type="text"
                placeholder="Event Date here"
                className="bg-transparent outline-none text-gray-300 placeholder-gray-400 w-full py-0.5"
              />
              <ArrowRight size={14} className="ml-1.5 text-white flex-shrink-0" />
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-2">
            <p className="text-base md:text-lg font-medium">
              Get in touch
            </p>

            {/* Social Icons with correct links */}
            <div className="flex gap-3 md:gap-4">
              <a 
                href="https://web.facebook.com/profile.php?id=61566411753625"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FF8400] flex items-center justify-center hover:bg-orange-600 transition-colors active:scale-95"
                aria-label="Facebook"
              >
                <Facebook size={16} className="md:size-[18px]" />
              </a>

              <a 
                href="https://www.instagram.com/cravingsphils/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FF8400] flex items-center justify-center hover:bg-orange-600 transition-colors active:scale-95"
                aria-label="Instagram"
              >
                <Instagram size={16} className="md:size-[18px]" />
              </a>

              <a 
                href="tel:09626281582"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FF8400] flex items-center justify-center hover:bg-orange-600 transition-colors active:scale-95"
                aria-label="Phone"
                title="Call 0962 628 1582"
              >
                <Phone size={16} className="md:size-[18px]" />
              </a>

              <a 
                href="mailto:wecater@cravingsgroup.com"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FF8400] flex items-center justify-center hover:bg-orange-600 transition-colors active:scale-95"
                aria-label="Email"
                title="Email wecater@cravingsgroup.com"
              >
                <Mail size={16} className="md:size-[18px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}