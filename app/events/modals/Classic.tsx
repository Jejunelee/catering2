"use client";

import Image from "next/image";
import { X, Soup, Salad, Flame, Cake } from "lucide-react";

interface ClassicProps {
  open: boolean;
  onClose: () => void;
}

export default function Classic({ open, onClose }: ClassicProps) {
  if (!open) return null;

  const menuSections = [
    {
      category: "SOUP",
      icon: <Soup size={18} />,
      items: ["Wild Mushroom Soup Served with freshly baked artisan breads"]
    },
    {
      category: "SALAD",
      icon: <Salad size={18} />,
      items: ["Classic Caesar Salad"]
    },
    {
      category: "HOT SELECTIONS",
      icon: <Flame size={18} />,
      items: [
        "Baked Fish in Olive Oil with pancetta, garlic and crispy shallots",
        "Roast Beef with Mushroom Sauce",
        "Chicken Cordon Bleu",
        "Tuscan Style Bolognese",
        "Steamed Jasmine Rice"
      ]
    },
    {
      category: "DESSERTS",
      icon: <Cake size={18} />,
      items: [
        "Cravings Cake Selection",
        "Chocolate Caramel",
        "Tropical Fresh Fruit Platter"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 font-jost backdrop-blur-sm">
      
      {/* Modal - Responsive sizing */}
      <div className="relative w-full max-w-[900px] bg-white shadow-2xl overflow-hidden rounded-xl md:rounded-lg max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header Image */}
        <div className="relative w-full h-[200px] md:h-[280px] flex-shrink-0">
          <Image
            src="/events/classic/classic1x1.png"
            alt="Classic Catering"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />

          {/* Pricing Badge - Mobile Optimized */}
          <div className="absolute bottom-0 w-full flex justify-center">
            <div className="bg-white text-[#F26522] text-sm md:text-xl tracking-wide px-4 md:px-8 py-2 md:py-3 mb-3 md:mb-4 font-semibold rounded-full md:rounded-none shadow-lg md:shadow-none">
              1,500 + 5% SERVICE CHARGE • MINIMUM OF 50 PAX
            </div>
          </div>
          
          {/* Mobile Image Overlay */}
          <div className="absolute top-3 left-3 md:hidden bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            Classic Menu
          </div>
        </div>

        {/* MENU GRID - Scrollable */}
        <div className="overflow-y-auto flex-1 px-3 md:px-0">
          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-[220px_1fr] text-base">
            {menuSections.map((section, index) => [
              // Category Cell
              <div 
                key={`cat-${index}`} 
                className="bg-[#F26522] text-white px-6 py-4 tracking-wider font-medium flex items-center gap-2"
              >
                {section.icon}
                <span>{section.category}</span>
              </div>,
              
              // Items Cell
              <div 
                key={`items-${index}`} 
                className="bg-[#E9D8C7] px-6 py-4 text-gray-800"
              >
                {section.items.map((item, i) => (
                  <p key={i} className="mb-1 last:mb-0">{item}</p>
                ))}
              </div>
            ]).flat()}
          </div>

          {/* Mobile Menu - Visible on mobile only */}
          <div className="md:hidden space-y-3 py-3">
            {menuSections.map((section, index) => (
              <div key={index} className="bg-[#E9D8C7] rounded-lg overflow-hidden shadow-md">
                {/* Category Header */}
                <div className="bg-[#F26522] text-white px-4 py-3 font-medium flex items-center gap-2">
                  {section.icon}
                  <span className="text-sm tracking-wider">{section.category}</span>
                </div>
                
                {/* Items */}
                <div className="px-4 py-3 text-sm text-gray-800 space-y-1.5">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#F26522] mt-1">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Mobile Pricing Note */}
            <div className="bg-[#F26522]/10 p-3 rounded-lg text-center">
              <p className="text-xs text-[#F26522] font-medium">
                *Menu customizable for your event
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Footer Note */}
        <div className="hidden md:block bg-gray-50 px-6 py-3 text-xs text-gray-500 border-t">
          *Menu items can be customized • Prices subject to 5% service charge • Minimum of 50 pax
        </div>
      </div>
    </div>
  );
}