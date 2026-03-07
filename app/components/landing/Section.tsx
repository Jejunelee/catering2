"use client";

import Image from "next/image";
import Link from "next/link";

export default function Section() {
  return (
    <section className="relative w-full py-8 md:py-6 overflow-x-hidden min-h-[60vh] md:min-h-0 flex items-center">
      
      {/* Background Image with overlay for better text contrast */}
      <div className="absolute inset-0">
        <Image
          src="/SectBG.png"
          alt="Catering background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 md:bg-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="font-jost relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 md:px-8 py-4 md:py-4 w-full">
        
        {/* Mobile Section Title - visible only on mobile */}
        <h2 className="md:hidden text-white text-2xl font-medium mb-4 text-center drop-shadow-lg">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          
          {/* Card 1 - Mobile: rectangle, Desktop: 30% smaller square */}
          <Link href="/events/catering/full-service" className="w-full">
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl md:rounded-[28px] p-5 md:p-5 text-center shadow-xl flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-300 cursor-pointer md:aspect-square border border-white/20 min-h-[200px] md:min-h-0">
              
              {/* Orange accent line */}
              <div className="w-12 md:w-8 h-1 md:h-0.5 bg-[#E25D1F] rounded-full mb-3 md:mb-2.5"></div>
              
              <h3 className="text-[#E25D1F] font-bold text-xl md:text-[28px] leading-tight px-1">
                FULL SERVICE <br className="hidden md:block" /> CATERING
              </h3>
              
              {/* Mobile description - concise */}
              <p className="md:hidden text-neutral-700 text-lg mt-2 px-2">
                Elevated, full-service catering for gatherings big or small
              </p>
              
              {/* Desktop description - 30% smaller text */}
              <p className="hidden md:block mt-2.5 text-neutral-900 leading-snug text-[14px] px-2">
                Elevated, full-service catering for gatherings big or small, serving classics or elevated dishes made with care.
              </p>
              
              {/* Mobile touch indicator */}
              <span className="md:hidden text-[#E25D1F] text-lg font-medium mt-2 flex items-center gap-1">
                Tap to learn more 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/events/catering/event" className="w-full">
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl md:rounded-[28px] p-5 md:p-5 text-center shadow-xl flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-300 cursor-pointer md:aspect-square border border-white/20 min-h-[200px] md:min-h-0">
              
              <div className="w-12 md:w-8 h-1 md:h-0.5 bg-[#E25D1F] rounded-full mb-3 md:mb-2.5"></div>
              
              <h3 className="text-[#E25D1F] font-bold text-xl md:text-[28px] leading-tight px-1">
                EVENT <br className="hidden md:block" /> CATERING
              </h3>
              
              <p className="md:hidden text-neutral-700 text-lg mt-2 px-2">
                Fresh Cravings favorites delivered to your door
              </p>
              
              <p className="hidden md:block mt-2.5 text-neutral-900 leading-snug text-[14px] px-2">
                Fresh Cravings favorites delivered to your door, so you can enjoy good food with family, friends, or your team.
              </p>
              
              <span className="md:hidden text-[#E25D1F] text-lg font-medium mt-2 flex items-center gap-1">
                Tap to learn more 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/events/venues" className="w-full">
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl md:rounded-[28px] p-5 md:p-5 text-center shadow-xl flex flex-col justify-center items-center hover:shadow-2xl transition-all duration-300 cursor-pointer md:aspect-square border border-white/20 min-h-[200px] md:min-h-0">
              
              <div className="w-12 md:w-8 h-1 md:h-0.5 bg-[#E25D1F] rounded-full mb-3 md:mb-2.5"></div>
              
              <h3 className="text-[#E25D1F] font-bold text-xl md:text-[28px] leading-tight px-1">
                EVENT <br className="hidden md:block" /> VENUES
              </h3>
              
              <p className="md:hidden text-neutral-700 text-lg mt-2 px-2">
                Refined spaces for weddings and celebrations
              </p>
              
              <p className="hidden md:block mt-2.5 text-neutral-900 leading-snug text-[14px] px-2">
                Refined and versatile spaces ideal for weddings, corporate functions, and meaningful celebrations.
              </p>
              
              <span className="md:hidden text-[#E25D1F] text-lg font-medium mt-2 flex items-center gap-1">
                Tap to learn more 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}