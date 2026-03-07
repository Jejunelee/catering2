"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

export default function Menu({ open, onClose }: MenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-jost">

      {/* Modal */}
      <div className="relative h-[800px] w-[1100px] max-w-[95%] bg-white shadow-2xl overflow-hidden grid grid-cols-[1fr_1.2fr]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 text-white hover:opacity-70"
        >
          <X size={30} />
        </button>

        {/* Left Panel */}
        <div className="bg-[#F5821F] text-white px-12 py-16 flex flex-col justify-center">

          {/* Title */}
          <h2 className="text-[90px] font-brisa font-light mb-2">
            Menu
          </h2>

          {/* Description */}
          <div className="space-y-4 text-[25px] leading-relaxed">

            <p>
              Our curated catering menus are thoughtfully designed to elevate
              every celebration.
            </p>

            <p>
              From timeless classics to modern culinary selections, each dish
              is prepared with quality ingredients and refined presentation.
            </p>

            <p>
              Menus may be customized to match your event theme, preferences,
              and budget.
            </p>

          </div>

        </div>

        {/* Right Images */}
        <div className="grid grid-rows-2 h-full">

          <div className="relative w-full">
            <Image
              src="/events/menu/menu1x1.png"
              alt="Menu"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-full">
            <Image
              src="/events/menu/menu1x2.png"
              alt="Menu"
              fill
              className="object-cover"
            />
          </div>

        </div>

      </div>

    </div>
  );
}