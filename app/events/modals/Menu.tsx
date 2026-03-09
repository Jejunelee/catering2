"use client";

import Image from "next/image";
import { X, ChevronRight, Sparkles, Utensils, Coffee, Wine, Download } from "lucide-react";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

export default function Menu({ open, onClose }: MenuProps) {
  if (!open) return null;

  const features = [
    "Timeless classics to modern selections",
    "Quality ingredients & refined presentation",
    "Customizable to match your theme",
    "Flexible for any budget"
  ];

  // Function to handle PDF download
  const downloadPDF = (pdfPath: string, fileName: string): void => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName || 'PremiumMenu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 font-jost backdrop-blur-sm">
      
      {/* Modal - Responsive sizing */}
      <div className="relative w-full max-w-[900px] bg-white shadow-2xl overflow-hidden rounded-xl md:rounded-lg max-h-[90vh] flex flex-col md:grid md:grid-cols-[1.2fr_1fr]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Mobile: Images on top | Desktop: Left Panel */}
        <div className="md:order-1 flex flex-col overflow-y-auto md:overflow-visible">
          {/* Images - Mobile only */}
          <div className="md:hidden grid grid-cols-2 gap-1 p-1 h-[180px] flex-shrink-0">
            <div className="relative w-full h-full rounded-l-lg overflow-hidden">
              <Image
                src="/events/menu/menu1x1.png"
                alt="Menu"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative w-full h-full rounded-r-lg overflow-hidden">
              <Image
                src="/events/menu/menu1x2.png"
                alt="Menu"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>

          {/* Left Panel - Orange */}
          <div className="bg-[#F5821F] text-white px-5 py-6 md:px-8 md:py-10 flex flex-col flex-1">
            
            {/* Title */}
            <h2 className="text-3xl md:text-[60px] font-brisa font-light mb-3 md:mb-4 flex-shrink-0">
              Menu
            </h2>
            
            {/* Description */}
            <div className="space-y-3 md:space-y-4 text-sm md:text-[20px] leading-relaxed mb-4 md:mb-6">
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

            {/* Features List */}
            <div className="space-y-2 md:space-y-3 mt-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm md:text-base">
                  <Sparkles size={16} className="text-white/80 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Download Menu Button - Desktop */}
            <button 
              onClick={() => downloadPDF("/files/PremiumMenu.pdf", "PremiumMenu.pdf")}
              className="hidden md:flex items-center justify-center gap-2 bg-white text-[#F5821F] px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors mt-6 w-fit"
            >
              <Download size={20} />
              <span>Download Our Menu</span>
            </button>

            {/* Mobile Buttons */}
            <div className="md:hidden mt-4 space-y-2">
              <button 
                onClick={() => downloadPDF("/files/PremiumMenu.pdf", "PremiumMenu.pdf")}
                className="w-full bg-white text-[#F5821F] py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Download size={16} />
                <span>Download Menu</span>
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                Request a consultation <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: Right Images - Hidden on mobile */}
        <div className="hidden md:grid grid-rows-2 h-full md:order-2">
          <div className="relative w-full min-h-[225px]">
            <Image
              src="/events/menu/menu1x1.png"
              alt="Menu"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="relative w-full min-h-[225px]">
            <Image
              src="/events/menu/menu1x2.png"
              alt="Menu"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="md:hidden bg-gray-50 px-4 py-3 flex justify-between items-center">
          <div className="flex gap-1.5">
            <span className="text-[10px] bg-[#F5821F]/10 text-[#F5821F] px-2 py-0.5 rounded-full">Customizable</span>
            <span className="text-[10px] bg-[#F5821F]/10 text-[#F5821F] px-2 py-0.5 rounded-full">Premium</span>
          </div>
          <button 
            onClick={onClose}
            className="text-xs text-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}