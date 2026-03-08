"use client";

import { Navigation } from "lucide-react";

export default function MaginhawaPage() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="w-full lg:w-1/2 bg-[#F5F5F5] flex items-center justify-center px-5 md:px-8 lg:px-20 py-12 lg:py-16">
        <div className="max-w-xl">
          
          {/* Mobile Location Badge */}
          <div className="lg:hidden inline-block bg-[#F15A24] text-white text-xs px-3 py-1 rounded-full mb-3 font-jost">
            Maginhawa Branch
          </div>

          {/* Title */}
          <h1 className="font-brisa text-4xl md:text-5xl lg:text-[78px] text-[#F15A24] mb-2 leading-tight">
            Cravings Maginhawa
          </h1>

          {/* Address */}
          <p className="font-jost text-base md:text-lg lg:text-[22px] text-black leading-snug">
            28 Maginhawa, Diliman, Quezon City,
            <br />
            1101 Kalakhang Maynila
          </p>

          {/* Divider */}
          <div className="w-20 md:w-24 lg:w-32 h-[3px] md:h-[4px] lg:h-[5px] bg-[#F15A24] mt-5 md:mt-6 lg:mt-7 mb-6 md:mb-8 lg:mb-12"></div>

          {/* Description */}
          <p className="font-jost text-base md:text-lg lg:text-[22px] leading-relaxed text-black mb-6 lg:mb-0">
            Ideal for intimate gatherings and business meetings, Cravings
            Maginhawa offers a warm, comfortable space perfect for small events.
            With a relaxed ambiance, great food, and a convenient location, it's
            a welcoming venue for meaningful conversations and focused meetings.
          </p>

          {/* Mobile Get Directions Button */}
          <div className="lg:hidden mt-6">
            <a 
              href="https://maps.google.com/?q=Cravings+Dessert+Bar+Maginhawa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F15A24] text-white px-6 py-3 rounded-lg font-jost text-base hover:bg-[#d44d1f] transition shadow-md"
            >
              <Navigation size={18} />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Map */}
      <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-auto relative">
        <iframe
          src="https://www.google.com/maps?q=Cravings+Dessert+Bar+Maginhawa&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cravings Maginhawa Location"
        />
        
        {/* Mobile Map Overlay Button */}
        <div className="lg:hidden absolute bottom-4 left-4 right-4">
          <a 
            href="https://maps.google.com/?q=Cravings+Dessert+Bar+Maginhawa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-white/95 backdrop-blur-sm text-gray-800 text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg font-jost font-medium"
          >
            <Navigation size={16} className="text-[#F15A24]" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      {/* Desktop Get Directions Button - Hidden on mobile */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-10">
        <a 
          href="https://maps.google.com/?q=Cravings+Dessert+Bar+Maginhawa" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#F15A24] text-white px-6 py-3 rounded-lg font-jost text-lg hover:bg-[#d44d1f] transition shadow-lg hover:shadow-xl"
        >
          <Navigation size={20} />
          <span>Get Directions</span>
        </a>
      </div>

    </main>
  );
}