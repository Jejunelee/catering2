"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface ClassicProps {
  open: boolean;
  onClose: () => void;
}

export default function Classic({ open, onClose }: ClassicProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-jost">
      
      {/* Modal */}
      <div className="relative w-[1100px] max-w-[95%] bg-white shadow-2xl overflow-hidden">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 text-white hover:opacity-70"
        >
          <X size={30} />
        </button>

        {/* Header Image */}
        <div className="relative w-full h-[450px]">
          <Image
            src="/events/classic/classic1x1.png"
            alt="Classic Catering"
            fill
            className="object-cover"
          />

          <div className="absolute bottom-0 w-full flex justify-center">
            <div className="bg-white text-[#F26522] text-2xl tracking-wide px-8 py-3 mb-4 font-semibold">
              1,500 + 5% SERVICE CHARGE MINIMUM OF 50 PAX
            </div>
          </div>
        </div>

        {/* MENU GRID */}
        <div className="grid grid-cols-[280px_1fr] text-2xl">

          {/* SOUP */}
          <div className="bg-[#F26522] text-white px-8 py-10 tracking-wider font-medium">
            SOUP
          </div>
          <div className="bg-[#E9D8C7] px-10 py-10 text-gray-800">
            Wild Mushroom Soup Served with freshly baked artisan breads
          </div>

          {/* SALAD */}
          <div className="bg-[#F26522] text-white px-8 py-5 tracking-wider font-medium">
            SALAD
          </div>
          <div className="bg-[#E9D8C7] px-10 py-5 text-gray-800">
            Classic Caesar Salad
          </div>

          {/* HOT */}
          <div className="bg-[#F26522] text-white px-8 py-5 tracking-wider font-medium">
            HOT SELECTIONS
          </div>
          <div className="bg-[#E9D8C7] px-10 py-5 text-gray-800 space-y-1">
            <p>Baked Fish in Olive Oil with pancetta, garlic and crispy shallots</p>
            <p>Roast Beef with Mushroom Sauce</p>
            <p>Chicken Cordon Bleu</p>
            <p>Tuscan Style Bolognese</p>
            <p>Steamed Jasmine Rice</p>
          </div>

          {/* DESSERT */}
          <div className="bg-[#F26522] text-white px-8 py-5 tracking-wider font-medium">
            DESSERTS
          </div>
          <div className="bg-[#E9D8C7] px-10 py-5 pb-10 text-gray-800 space-y-1">
            <p>Cravings Cake Selection</p>
            <p>Chocolate Caramel</p>
            <p>Tropical Fresh Fruit Platter</p>
          </div>

        </div>

      </div>
    </div>
  );
}