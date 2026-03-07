"use client";

import Image from "next/image";
import { useState } from "react";
import Classic from "@/app/events/modals/Classic";

export default function Section2() {
  const [openClassic, setOpenClassic] = useState(false);

  const items = [
    {
      title: "CLASSIC\nCRAVINGS",
      image: "/gifts/sections/Section1-1.png",
      action: () => setOpenClassic(true),
    },
    {
      title: "SIGNATURE\nSELECTION",
      image: "/gifts/sections/Section1-2.png",
    },
    {
      title: "PREMIUM\nSELECTION",
      image: "/gifts/sections/Section1-3.png",
    },
  ];

  return (
    <>
      <section className="w-full py-16 bg-[#FFEFE0]">

        {/* Cards */}
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-10">

          {items.map((item, i) => (
            <div
              key={i}
              onClick={item.action}
              className="relative h-[650px] overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#FF4D00]/30" />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <h3 className="font-jost text-white text-[60px] font-bold leading-[60px] whitespace-pre-line">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Classic Modal */}
      <Classic open={openClassic} onClose={() => setOpenClassic(false)} />
    </>
  );
}