"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight, Utensils, Sparkles, Star } from "lucide-react";
import Classic from "@/app/events/modals/Classic";
import Signature from "@/app/events/modals/Signature";
import Premium from "@/app/events/modals/Premium";
import Upgrades from "@/app/events/modals/Upgrades";

export default function Section2() {
  const [openClassic, setOpenClassic] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const [openPremium, setOpenPremium] = useState(false);
  const [openUpgrades, setOpenUpgrades] = useState(false);

  const items = [
    {
      title: "CLASSIC CRAVINGS",
      image: "/events/sections/Section2x1.png",
      action: () => setOpenClassic(true),
      description: "Time-honored favorites that never go out of style",
      icon: <Utensils size={20} />,
    },
    {
      title: "SIGNATURE SELECTION",
      image: "/events/sections/Section2x2.png",
      action: () => setOpenSignature(true),
      description: "Our chef's specially curated signature dishes",
      icon: <Sparkles size={20} />,
    },
    {
      title: "PREMIUM SELECTION",
      image: "/events/sections/Section2x3.png",
      action: () => setOpenPremium(true),
      description: "Elevated offerings for the most discerning palates",
      icon: <Sparkles size={20} />,
    },
    {
      title: "BUFFET UPGRADES",
      image: "/events/sections/Section2x4.png",
      action: () => setOpenUpgrades(true),
      description: "Enhance your buffet experience with premium additions",
      icon: <Star size={20} />,
    },
  ];

  return (
    <>
      <section className="w-full py-10 md:py-12 bg-[#f6f6f6]">
        
        {/* Title - Responsive */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-[45px] font-jost font-normal text-black">
            WHAT WE OFFER
          </h2>
          <p className="md:hidden text-gray-500 text-sm mt-2">
            Choose from our carefully curated selection
          </p>
        </div>

        {/* Cards - Updated grid for 4 columns on desktop */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={item.action}
              className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-xl md:rounded-lg shadow-lg md:shadow-xl cursor-pointer group"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30" />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
                
                {/* Desktop Title - Centered Bottom */}
                <div className="hidden md:flex w-full justify-center">
                  <h3 className="font-jost underline decoration-4 underline-offset-8 text-[32px] lg:text-[42px] font-normal leading-tight text-center">
                    {item.title}
                  </h3>
                </div>
                
                {/* Mobile Title */}
                <h3 className="md:hidden font-jost underline decoration-2 underline-offset-4 text-2xl sm:text-3xl font-normal leading-tight mb-1">
                  {item.title}
                </h3>
                
                {/* Mobile Description */}
                <p className="md:hidden text-sm text-white/90 mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                {/* Mobile CTA */}
                <div className="md:hidden flex items-center gap-1 text-sm font-medium text-white/90">
                  <span>Learn more</span>
                  <ChevronRight size={16} />
                </div>

                {/* Desktop Hover Content */}
                <div className="hidden md:flex flex-col items-center justify-center absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <p className="text-white text-sm text-center mb-3">{item.description}</p>
                  <span className="flex items-center gap-1 text-[#F28C28] text-sm font-medium">
                    View Menu <ChevronRight size={16} />
                  </span>
                </div>
              </div>

              {/* Mobile Icon Badge */}
              <div className="absolute top-3 right-3 md:hidden bg-[#F28C28] text-white p-2 rounded-full shadow-lg">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="md:hidden text-center mt-8">
          <button 
            onClick={() => setOpenClassic(true)}
            className="inline-flex items-center gap-2 text-[#F28C28] font-medium"
          >
            View all offerings <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Modals */}
      <Classic open={openClassic} onClose={() => setOpenClassic(false)} />
      <Signature open={openSignature} onClose={() => setOpenSignature(false)} />
      <Premium open={openPremium} onClose={() => setOpenPremium(false)} />
      <Upgrades open={openUpgrades} onClose={() => setOpenUpgrades(false)} />
    </>
  );
}