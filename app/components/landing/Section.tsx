"use client";

import Image from "next/image";

export default function Section() {
  return (
    <section className="relative w-full py-8 overflow-x-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 ">
        <Image
          src="/SectBG.png"
          alt="Catering background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content Container (aligned with header) */}
      <div className="font-jost max-w-[1600px] mx-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3">

          {/* Card 1 */}
          <div className="aspect-square scale-[0.85] bg-[#FFEFE0]/85 backdrop-blur-sm rounded-[45px] p-8 text-center shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-[#E25D1F] text-[45px] font-semibold tracking-wide leading-[45px]">
              FULL SERVICE <br /> CATERING
            </h3>
            <p className="mt-6 text-neutral-900 leading-snug text-[30px]">
              Elevated, full-service catering for gatherings big or small,
              serving classics or elevated dishes made with care.
            </p>
          </div>

          {/* Card 2 */}
          <div className="scale-[0.85] aspect-square bg-[#FFEFE0]/85 backdrop-blur-sm rounded-[45px] p-8 text-center shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-[#E25D1F] text-[45px] font-semibold tracking-wide leading-[45px]">
              EVENT <br /> CATERING
            </h3>
            <p className="mt-6 text-neutral-900 leading-snug text-[30px]">
              Fresh Cravings favorites delivered to your door,
              so you can enjoy good food with family, friends, or your team.
            </p>
          </div>

          {/* Card 3 */}
          <div className="scale-[0.85] aspect-square bg-[#FFEFE0]/85 backdrop-blur-sm rounded-[45px] p-8 text-center shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-[#E25D1F] text-[45px] font-semibold tracking-wide leading-[45px]">
              EVENT <br /> VENUES
            </h3>
            <p className="mt-6 text-neutral-900 leading-snug text-[30px]">
              Refined and versatile spaces ideal for weddings, corporate
              functions, and meaningful celebrations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}