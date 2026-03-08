"use client";

import Image from "next/image";
import { X, ChefHat, Coffee, Wine, Gift, Candy, Sparkles, Beef, PiggyBank } from "lucide-react";

interface UpgradesProps {
  open: boolean;
  onClose: () => void;
}

export default function Upgrades({ open, onClose }: UpgradesProps) {
  if (!open) return null;

  const menuSections = [
    {
      category: "GRAZING & STARTERS",
      icon: <ChefHat size={18} />,
      items: ["Grazing Table - cheese and charcuterie"]
    },
    {
      category: "PREMIUM MAINS",
      icon: <Beef size={18} />,
      items: [
        "Prime Rib Eye Roast",
        "Roasted Porchetta",
        "Thanksgiving Turkey with Cranberry Sauce and Gravy",
        "Cuchinillo"
      ]
    },
    {
      category: "INTERACTIVE STATIONS",
      icon: <PiggyBank size={18} />,
      items: ["Live Paella Station"]
    },
    {
      category: "SWEET ENDINGS",
      icon: <Candy size={18} />,
      items: ["Dessert Buffet"]
    },
    {
      category: "BEVERAGE BARS",
      icon: <Coffee size={18} />,
      items: ["Coffee Bar", "Wine and Cocktail Bar"]
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

        {/* Header Image - Using signature image as placeholder, replace with upgrades image */}
        <div className="relative w-full h-[200px] md:h-[280px] flex-shrink-0">
          <Image
            src="/events/upgrades/upgrades1x1.png"
            alt="Buffet Upgrades"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />

          {/* Pricing Badge - Mobile Optimized */}
          <div className="absolute bottom-0 w-full flex justify-center">
            <div className="bg-white text-[#F26522] text-sm md:text-xl tracking-wide px-4 md:px-8 py-2 md:py-3 mb-3 md:mb-4 font-semibold rounded-full md:rounded-none shadow-lg md:shadow-none">
              CUSTOM PRICING • MINIMUM OF 50 PAX
            </div>
          </div>
          
          {/* Mobile Image Overlay */}
          <div className="absolute top-3 left-3 md:hidden bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            Buffet Upgrades
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
            
            {/* Customization Notes */}
            <div className="bg-[#E9D8C7] rounded-lg overflow-hidden shadow-md p-4 space-y-3">
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <Sparkles size={16} className="text-[#F26522] flex-shrink-0 mt-0.5" />
                <span>Curated menus can be customized to match your theme and budget ensuring a seamless dining experience.</span>
              </p>
              
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <Gift size={16} className="text-[#F26522] flex-shrink-0 mt-0.5" />
                <span>Personalized gifts are also available to make your celebrations even more memorable</span>
              </p>
              
              <div className="bg-[#F26522]/10 p-3 rounded-lg text-center mt-2">
                <p className="text-xs text-[#F26522] font-medium">
                  ✦ Event styling packages starting at P25,000 ✦
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Footer Notes */}
        <div className="hidden md:block bg-gray-50 px-6 py-3 text-xs text-gray-500 border-t space-y-1">
          <p className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#F26522]" />
            Curated menus can be customized to match your theme and budget ensuring a seamless dining experience.
          </p>
          <p className="flex items-center gap-2">
            <Gift size={14} className="text-[#F26522]" />
            Personalized gifts are also available to make your celebrations even more memorable
          </p>
          <p className="text-[#F26522] font-medium mt-1">
            ✦ Event styling packages starting at P25,000 designed to bring your vision to life ✦
          </p>
        </div>
      </div>
    </div>
  );
}