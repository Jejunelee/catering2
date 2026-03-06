"use client";

import Image from "next/image";

export default function Section() {
  return (
    <section className="relative w-full py-8 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/SectionBG.png"
          alt="Catering background"
          fill
          priority
          className="object-cover"
        />
        {/* Optional soft overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container (matches Header width) */}
      <div className="relative max-w-[95rem] mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Card 1 */}
          <div className="aspect-square bg-[#F6E9DC]/85 backdrop-blur-xs rounded-3xl p-8 text-center shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-[#E25D1F] text-3xl font-semibold tracking-wide">
              FULL SERVICE <br /> CATERING
            </h3>
            <p className="mt-6 text-gray-700 leading-snug text-lg">
              Elevated, full-service catering for gatherings big or small, 
              serving classics or elevated dishes made with care.
            </p>
          </div>

          {/* Card 2 */}
          <div className="aspect-square bg-[#F6E9DC]/85 backdrop-blur-xs rounded-3xl p-8 text-center shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-[#E25D1F] text-3xl font-semibold tracking-wide">
              EVENT STYLING <br /> & DESIGN
            </h3>
            <p className="mt-6 text-gray-700 leading-snug text-lg">
              Beautifully curated event setups designed to elevate your 
              celebrations with elegance and thoughtful detail.
            </p>
          </div>

          {/* Card 3 */}
          <div className="aspect-square bg-[#F6E9DC]/85 backdrop-blur-xs rounded-3xl p-8 text-center shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-[#E25D1F] text-3xl font-semibold tracking-wide">
              CUSTOM MENU <br /> CREATION
            </h3>
            <p className="mt-6 text-gray-700 leading-snug text-lg">
              Tailored menus crafted around your taste and event theme, 
              ensuring a memorable dining experience for every guest.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}