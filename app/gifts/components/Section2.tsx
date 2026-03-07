"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Section2() {
  const images = [
    "/gifts/sections/Section2x1.png",
    "/gifts/sections/Section2x2.png",
    "/gifts/sections/Section2x3.png",
  ];

  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full relative">

      <div className="flex w-full items-stretch">

        {/* LEFT PANEL */}
        <div className="bg-[#FF8400] flex flex-col justify-center px-8 py-28 text-white w-[570px] min-h-[820px]">

          <h2 className="font-brisa text-[70px] italic leading-[1.1] mb-4">
            Personalize with us!
          </h2>

          <p className="font-jost text-[28px] leading-tight max-w-[480px] mb-10">
            Bring your vision to life with custom packaging that reflects
            your style. Browse our past creations for inspiration and see
            how we’ve transformed ordinary gifts and treats into unforgettable,
            personalized experiences.
          </p>

          <button className="font-jost border-3 border-white px-10 py-3 text-[24px] tracking-widest hover:bg-white hover:text-[#FF8400] transition w-fit">
            TALK TO OUR GIFT CONCIERGE
          </button>

        </div>


        {/* RIGHT IMAGE CAROUSEL */}
        <div className="flex-1 relative min-h-[820px]">

          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Personalized Gifts"
              fill
              priority
              className={`object-cover transition-opacity duration-[1200ms] ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

        </div>

      </div>


      {/* CHEVRON CONTROLS */}
      <div className="px-4 py-2 absolute bottom-0 left-[565px] -translate-x-1/2 z-20 flex items-center justify-between w-[130px] bg-black text-white shadow-md">

        <button onClick={prev} className="hover:bg-[#FF8400] transition p-1">
          <ChevronLeft size={32} />
        </button>

        <button onClick={next} className="hover:bg-[#FF8400] transition p-1">
          <ChevronRight size={32} />
        </button>

      </div>

    </section>
  );
}