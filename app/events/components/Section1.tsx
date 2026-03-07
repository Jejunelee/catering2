"use client";

import Image from "next/image";
import { useState } from "react";
import Menu from "@/app/events/modals/Menu";

export default function Section() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <section className="w-full flex flex-col lg:flex-row">
        
        {/* Left Image */}
        <div className="relative w-full lg:w-3/8 h-[420px] lg:h-[720px]">
          <Image
            src="/events/Section1x1.png"
            alt="Event Catering"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-5/8 bg-[#7B3F00] flex items-center justify-center px-10 py-16">
          <div className="max-w-4xl text-center text-white">

            <p className="font-jost text-lg md:text-[40px] leading-relaxed mb-8">
              Our event catering services are designed to accommodate a wide
              range of occasions, including corporate events, weddings,
              birthdays, baptisms, baby showers, and funeral services. With
              thoughtfully prepared menus and attentive service, we ensure every
              gathering is handled with care and professionalism.
            </p>

            <button
              onClick={() => setOpenMenu(true)}
              className="font-jost border border-white px-10 py-3 text-[30px] tracking-widest hover:bg-white hover:text-[#7B3F00] transition"
            >
              EXPLORE OUR MENUS
            </button>

          </div>
        </div>

      </section>

      {/* Menu Modal */}
      <Menu open={openMenu} onClose={() => setOpenMenu(false)} />
    </>
  );
}