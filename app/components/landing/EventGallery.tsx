"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventGallery() {
  const images = [
    "/EventGallery.png",
    "/EventGallery2.png",
    "/EventGallery3.png",
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

  // Auto carousel (optimized)
  useEffect(() => {
    // Don't run auto-carousel on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    
    const interval = setInterval(() => {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full relative overflow-hidden">
      {/* Desktop Layout - 30% smaller proportionately */}
      <div className="hidden md:flex w-full items-stretch">
        {/* Left Orange Panel - 30% smaller */}
        <div className="bg-[#FF8400] flex flex-col justify-center px-14 py-20 text-white w-[469px] h-[613px]">
          <h2 className="font-brisa text-[70px] leading-[1.15] font-light">
            Moments Worth
            <br />
            Remembering
          </h2>

          <button className="mt-7 border-2 border-white px-5 py-2.5 text-[21px] tracking-[2px] hover:bg-white hover:text-[#F5821F] transition-all duration-300 w-fit font-medium">
            VIEW EVENT GALLERY
          </button>
        </div>

        {/* Right Image Carousel - 30% smaller */}
        <div className="flex-1 p-6 bg-[#E6D7C7]">
          <div className="relative w-full h-[560px]">
            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt="Event Gallery"
                fill
                priority={i === 0}
                className={`object-cover transition-opacity duration-1000 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))}
          </div>
        </div>

        {/* Desktop Chevron Controls - ORIGINAL DESIGN PRESERVED */}
        <div className="px-4 py-2 absolute bottom-0 left-[469px] -translate-x-1/2 z-20 flex items-center justify-between w-[130px] bg-[#000000] shadow-md">
          <button 
            onClick={prev} 
            className="hover:bg-[#F15B19] transition p-1 text-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={next} 
            className="hover:bg-[#F15B19] transition p-1 text-white"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Mobile Layout - Enhanced with swipe */}
      <div className="md:hidden flex flex-col">
        {/* Mobile Orange Header - SINGLE LINE */}
        <div className="bg-[#FF8400] px-6 py-2 text-white text-center">
          <h2 className="font-brisa text-4xl sm:text-4xl font-light whitespace-nowrap overflow-x-auto scrollbar-hide">
            Moments Worth Remembering
          </h2>
        </div>

        {/* Mobile Image Carousel with Swipe */}
        <div 
          className="relative w-full h-[350px] bg-[#E6D7C7]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Event Gallery"
              fill
              priority={i === 0}
              className={`object-cover transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              sizes="100vw"
            />
          ))}

          {/* Mobile Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all active:scale-90"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all active:scale-90"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          {/* Mobile Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index 
                    ? 'w-6 bg-[#FF8400]' 
                    : 'bg-white/70 hover:bg-white'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          {/* Image Counter for mobile */}
          <div className="absolute top-3 right-3 z-20 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {index + 1}/{images.length}
          </div>
        </div>

        {/* Mobile Button */}
        <div className="bg-[#E6D7C7] px-6 py-6">
          <button className="w-full bg-[#FF8400] text-white py-4 px-6 text-lg tracking-wide hover:bg-[#F5821F] transition-all duration-300 active:scale-98 font-medium rounded-lg shadow-md">
            VIEW EVENT GALLERY
          </button>
        </div>
      </div>
    </section>
  );
}