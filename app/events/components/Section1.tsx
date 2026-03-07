"use client";

import Image from "next/image";
import { useState } from "react";
import { Utensils, ChevronRight, Calendar } from "lucide-react";
import Menu from "@/app/events/modals/Menu";

export default function Section() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <section className="w-full flex flex-col lg:flex-row">
        
        {/* Left Image */}
        <div className="relative w-full lg:w-3/8 h-[280px] sm:h-[320px] lg:h-[720px] overflow-hidden">
          <Image
            src="/events/sections/Section1x1.png"
            alt="Event Catering"
            fill
            className="object-cover"
            priority
          />
          
          {/* Mobile image caption */}
          <div className="absolute bottom-4 left-4 lg:hidden text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
            Event Catering
          </div>
          
          {/* Desktop image badge */}
          <div className="hidden lg:flex absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#7B3F00] px-4 py-2 rounded-full text-sm font-medium shadow-lg items-center gap-2">
            <span>Premium Event Catering</span>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-5/8 bg-[#7B3F00] flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12 sm:py-14 lg:py-16 relative">
          
          <div className="max-w-4xl text-center text-white relative z-10">

            {/* Mobile-optimized heading */}
            <h2 className="lg:hidden font-brisa text-3xl sm:text-4xl mb-4 text-white/90">
              Event Catering
            </h2>

            {/* Desktop heading with decorative elements */}
            <div className="hidden lg:flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/30"></div>
              <span className="text-white/70 text-sm tracking-[3px] font-medium">PREMIUM SERVICE</span>
              <div className="w-12 h-px bg-white/30"></div>
            </div>

            {/* Description */}
            <p className="font-jost text-base sm:text-lg md:text-xl lg:text-[30px] leading-relaxed mb-6 sm:mb-8 lg:mb-8 font-light">
              Our event catering services are designed to accommodate a wide
              range of occasions, including <span className="text-[#FFB347] font-medium">
                corporate events, weddings, birthdays, baptisms, baby showers, and funeral services
              </span>. With
              thoughtfully prepared menus and attentive service, we ensure every
              gathering is handled with care and professionalism.
            </p>

            {/* Feature grid - mobile only */}
            <div className="lg:hidden grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-sm font-medium">Corporate Events</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-sm font-medium">Weddings</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-sm font-medium">Birthdays</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-sm font-medium">Baptisms</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setOpenMenu(true)}
              className="font-jost border border-white px-8 sm:px-10 lg:px-12 py-3 sm:py-3 lg:py-4 text-xl sm:text-2xl lg:text-[28px] tracking-wider 
              hover:bg-white hover:text-[#7B3F00] transition-colors duration-300 
              flex items-center justify-center gap-2 mx-auto shadow-lg lg:shadow-xl"
            >
              <Utensils size={22} className="lg:hidden" />
              <Utensils size={24} className="hidden lg:block" />
              <span>EXPLORE OUR MENUS</span>
              <ChevronRight size={22} className="lg:hidden" />
              <ChevronRight size={24} className="hidden lg:block" />
            </button>

            {/* Mobile helper text */}
            <p className="lg:hidden text-xs text-white/60 mt-4">
              View our full catering menu collection
            </p>
            
            {/* Desktop trust badge */}
            <div className="hidden lg:flex items-center justify-center gap-2 mt-6 text-white/50 text-xs">
              <Calendar size={14} />
              <span>Book your event today • Custom menus available • Professional staff</span>
              <Calendar size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Modal */}
      <Menu open={openMenu} onClose={() => setOpenMenu(false)} />
    </>
  );
}