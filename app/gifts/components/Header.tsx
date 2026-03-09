"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Header() {
  const images = [
    "/gifts/header/header1x1.png",
  ];

  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  // Swipe handling for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full bg-white">
      {/* Hero Image */}
      <div 
        className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[520px] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Gifts"
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}

        {/* Image Counter - Mobile only */}
        <div className="absolute top-4 right-4 z-20 md:hidden bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
          {index + 1} / {images.length}
        </div>

        {/* Chevron Controls - EXACT SAME DESIGN, JUST SMALLER ON MOBILE */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-between bg-[#FFFFFF] shadow-md"
          style={{ 
            width: 'clamp(90px, 25vw, 130px)',
            padding: 'clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 16px)'
          }}
        >
          <button
            onClick={prev}
            className="text-[#F15B19] hover:text-white hover:bg-[#F15B19] transition p-1"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="md:size-[32px]" />
          </button>
          <button
            onClick={next}
            className="text-[#F15B19] hover:text-white hover:bg-[#F15B19] transition p-1"
            aria-label="Next image"
          >
            <ChevronRight size={24} className="md:size-[32px]" />
          </button>
        </div>
      </div>

      {/* Bottom Section - Mobile Optimized with Desktop following same pattern */}
      <div className="relative w-full px-4 md:px-0 py-5 md:py-8 flex flex-col items-center justify-center text-center">
        
        {/* Title - Progressive scaling exactly like other pages */}
        <h1 className="font-brisa text-4xl sm:text-5xl md:text-[75px] font-medium tracking-wide text-black mb-2 md:mb-1 leading-tight">
          Gifts
        </h1>

        {/* Description - Properly scaled for all devices */}
        <p className="font-jost text-base sm:text-lg md:text-xl lg:text-[28px] max-w-[1100px] leading-tight text-black px-6 md:px-4">
          Delight your guests with thoughtfully curated gifts and giveaway baskets. 
          From elegant treats to personalized keepsakes, our selections add a special touch to any event, 
          leaving a lasting impression.
        </p>
      </div>
    </section>
  );
}