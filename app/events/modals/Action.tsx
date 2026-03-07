"use client";

import Image from "next/image";
import { X, ChevronRight, Coffee, Wine, Utensils, Sparkles } from "lucide-react";

interface ActionProps {
  open: boolean;
  onClose: () => void;
}

export default function Action({ open, onClose }: ActionProps) {
  if (!open) return null;

  const menuItems = [
    { name: "Grazing Table - cheese and charcuterie", icon: <Utensils size={14} /> },
    { name: "Prime Rib Eye Roast", icon: <Utensils size={14} /> },
    { name: "Roasted Porchetta", icon: <Utensils size={14} /> },
    { name: "Thanksgiving Turkey with Cranberry Sauce and Gravy", icon: <Utensils size={14} /> },
    { name: "Cuchinillo", icon: <Utensils size={14} /> },
    { name: "Live Paella Station", icon: <Sparkles size={14} /> },
    { name: "Dessert Buffet", icon: <Sparkles size={14} /> },
    { name: "Coffee Bar", icon: <Coffee size={14} /> },
    { name: "Wine and Cocktail Bar", icon: <Wine size={14} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 font-jost backdrop-blur-sm">
      
      {/* Modal */}
      <div className="relative w-full max-w-[660px] md:max-w-[900px] bg-white shadow-2xl overflow-hidden rounded-xl md:rounded-lg flex flex-col md:grid md:grid-cols-[1.2fr_1fr] max-h-[90vh]">
        
        {/* Mobile: Image on top | Desktop: Left column (orange panel) */}
        <div className="md:order-1 flex flex-col overflow-y-auto md:overflow-visible">
          {/* Image - Mobile only */}
          <div className="relative h-[180px] md:hidden w-full flex-shrink-0">
            <Image
              src="/events/action/action1x1.png"
              alt="Action Stations"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
              Live cooking stations
            </div>
          </div>

          {/* Orange Panel - Mobile and Desktop */}
          <div className="bg-[#F5821F] text-white px-5 py-6 md:px-8 md:py-10 flex flex-col overflow-y-auto md:overflow-visible flex-1">
            
            {/* Title */}
            <h2 className="text-xl md:text-[42px] font-brisa font-light mb-3 md:mb-4 flex-shrink-0">
              Action Stations
            </h2>
            
            {/* Menu Items - Scrollable if needed */}
            <div className="space-y-2 md:space-y-2.5 overflow-y-auto flex-1 pr-1">
              {menuItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 text-sm md:text-[16px] leading-relaxed border-b border-white/10 pb-2 last:border-0"
                >
                  <span className="mt-0.5 text-white/70 flex-shrink-0">{item.icon}</span>
                  <span className="flex-1">{item.name}</span>
                  <ChevronRight size={12} className="text-white/50 flex-shrink-0" />
                </div>
              ))}
            </div>
            
            {/* Note - Fixed at bottom */}
            <p className="text-xs text-white/80 mt-4 flex-shrink-0">
              *Customizable for your event • All stations include professional staff and setup
            </p>
          </div>
        </div>

        {/* Desktop: Right column (image) - Hidden on mobile */}
        <div className="hidden md:block relative h-full min-h-[450px] w-full md:order-2">
          <Image
            src="/events/action/action1x1.png"
            alt="Action Stations"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}