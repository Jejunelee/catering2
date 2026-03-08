"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Section2() {
  const images = [
    "/gifts/sections/Section2x1.png",
    "/gifts/sections/Section2x1.png",
    "/gifts/sections/Section2x1.png",
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
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full relative overflow-hidden bg-white">
      

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full items-stretch">
        {/* LEFT PANEL - 30% smaller */}
        <div className="bg-[#FF8400] flex flex-col justify-center px-10 py-20 text-white w-[500px] min-h-[650px]">
          
          <h2 className="font-brisa text-[60px] italic leading-[1.1] mb-4">
            Personalize with us!
          </h2>

          <p className="font-jost text-[22px] leading-tight max-w-[420px] mb-8">
            Bring your vision to life with custom packaging that reflects
            your style. Browse our past creations for inspiration and see
            how we've transformed ordinary gifts into unforgettable experiences.
          </p>

          <button className="font-jost border-2 border-white px-8 py-2.5 text-[20px] tracking-widest hover:bg-white hover:text-[#FF8400] transition w-fit">
            TALK TO OUR GIFT CONCIERGE
          </button>
        </div>

        {/* RIGHT IMAGE CAROUSEL */}
        <div className="flex-1 relative min-h-[650px]">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Personalized Gifts"
              fill
              priority={i === 0}
              className={`object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              sizes="50vw"
            />
          ))}
        </div>

        {/* CHEVRON CONTROLS - Original design */}
        <div className="px-4 py-2 absolute bottom-0 left-[500px] -translate-x-1/2 z-20 flex items-center justify-between w-[130px] bg-black text-white shadow-md">
          <button onClick={prev} className="hover:bg-[#FF8400] transition p-1">
            <ChevronLeft size={32} />
          </button>
          <button onClick={next} className="hover:bg-[#FF8400] transition p-1">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col">
        {/* Mobile Image Carousel with Swipe */}
        <div 
          className="relative w-full h-[300px]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Personalized Gifts"
              fill
              priority={i === 0}
              className={`object-cover transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              sizes="100vw"
            />
          ))}

          {/* Image Counter */}
          <div className="absolute top-4 right-4 z-20 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            {index + 1} / {images.length}
          </div>

          {/* Mobile Navigation Arrows - Simple design */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-[#FF8400]' : 'w-2 bg-white/70'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="bg-[#FF8400] text-white px-5 py-8">
          <h3 className="font-brisa text-center italic text-5xl mb-3">Personalize with us!</h3>

          <p className="font-jost text-md text-center leading-relaxed mb-5 opacity-90">
            Bring your vision to life with custom packaging that reflects your style. 
            Browse our past creations for inspiration and see how we've transformed 
            ordinary gifts into unforgettable experiences.
          </p>

          {/* Mobile CTA - Simple button */}
          <button className="w-full bg-white text-[#FF8400] font-jost py-3 font-medium text-base hover:bg-white/90 transition">
            TALK TO OUR GIFT CONCIERGE
          </button>
        </div>
      </div>
    </section>
  );
}