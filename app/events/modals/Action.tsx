"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface ActionProps {
  open: boolean;
  onClose: () => void;
}

export default function Action({ open, onClose }: ActionProps) {
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

        {/* Left Orange Panel */}
        <div className="bg-[#F5821F] text-white px-12 py-16 flex flex-col justify-center">

          {/* Title */}
          <h2 className="text-[70px] font-brisa font-light mb-2">
            Action Stations
          </h2>

          {/* Menu */}
          <div className="space-y-3 text-[22px] leading-relaxed">

            <p>Grazing Table - cheese and charcuterie</p>
            <p>Prime Rib Eye Roast</p>
            <p>Roasted Porchetta</p>
            <p>Thanksgiving Turkey with Cranberry Sauce and Gravy</p>
            <p>Cuchinillo</p>
            <p>Live Paella Station</p>
            <p>Dessert Buffet</p>
            <p>Coffee Bar</p>
            <p>Wine and Cocktail Bar</p>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative min-h-[600px] w-full">
          <Image
            src="/events/action/action1x1.png"
            alt="Action Stations"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </div>
  );
}