"use client";

import Image from "next/image";
import { useState } from "react";
import Classic from "@/app/events/modals/Classic";

export default function Section2() {
  const [openClassic, setOpenClassic] = useState(false);

  const items = [
    {
      title: "CLASSIC\nCRAVINGS",
      image: "/events/Section2x1.png",
      action: () => setOpenClassic(true),
    },
    {
      title: "SIGNATURE\nSELECTION",
      image: "/events/Section2x2.png",
    },
    {
      title: "PREMIUM\nSELECTION",
      image: "/events/Section2x3.png",
    },
  ];

  return (
    <>
      <section className="w-full py-16 bg-[#f6f6f6]">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-[65px] font-jost font-normal text-black">
            WHAT WE OFFER
          </h2>
        </div>

        {/* Cards */}
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-10">

          {items.map((item, i) => (
            <div
              key={i}
              onClick={item.action}
              className="relative h-[520px] overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/16" />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <h3 className="font-jost underline decoration-4 underline-offset-8 text-white text-[60px] font-normal leading-tight whitespace-pre-line">
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