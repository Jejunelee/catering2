"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lead from "@/app/events/modals/Lead";

export default function Hero() {
  const images = ["/landing/hero/Hero1.png", "/landing/hero/Hero2.jpg","/landing/hero/Hero3.jpg","/landing/hero/Hero4.jpg"];
  const [index, setIndex] = useState(0);
  const [leadOpen, setLeadOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    }, 1500);

    return () => clearInterval(interval);
  }, [images.length]);

  // Intersection Observer for section transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full h-[600px] sm:h-[610px] md:h-[670px] lg:h-[860px] bg-white overflow-hidden transition-all duration-1000 ${
        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      
      {/* ---------- MOBILE BACKGROUND IMAGE WITH SWIPE ---------- */}
      <div 
        className="absolute inset-0 md:hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Catering table setup"
            fill
            priority
            className={`object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}

        {/* Improved gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90" />
        
        {/* Mobile image indicator dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index 
                  ? 'w-8 bg-[#F15B19]' 
                  : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ---------- DESKTOP IMAGE SIDE ---------- */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-[65%] sm:w-[60%] md:w-[55%] xl:w-[60%] pointer-events-none">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Catering table setup"
            fill
            priority
            className={`object-cover transition-opacity duration-[1200ms] ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 via-[25%] to-transparent to-[40%]" />
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-20 flex items-start md:items-center justify-center md:justify-start h-full pt-12 md:pt-0 px-6 lg:px-10 text-center md:text-left">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="max-w-[700px] mx-auto md:mx-0">
            
            {/* Mobile-optimized typography */}
            <h1 className={`font-jost font-medium leading-tight text-gray-900 text-xl sm:text-2xl md:text-[clamp(20px,3vw,40px)] transition-all duration-700 delay-100 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Elevate your events with
            </h1>

            <h2 className="text-orange-500 font-brisa italic leading-[0.95] text-6xl sm:text-6xl md:text-[clamp(35px,10vw,7rem)] mt-1 relative">
              <span className={`inline-block transition-all duration-700 delay-200 ${
                isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Cravings Catering
              </span>
              {/* Path drawing animation overlay */}
            </h2>

            <p className={`mt-3 font-jost leading-relaxed text-neutral-800 text-base sm:text-lg md:text-[clamp(15px,2vw,20px)] max-w-[38ch] sm:max-w-[42ch] md:max-w-[520px] mx-auto md:mx-0 transition-all duration-700 delay-300 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              With over 30 years of experience, we create memorable events
              through crave-worthy cuisine and thoughtful, personalized
              service.
            </p>

            {/* Mobile CTA with better touch target */}
            <div className={`mt-8 md:mt-12 flex justify-center md:justify-start transition-all duration-700 delay-400 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button
                onClick={() => setLeadOpen(true)}
                className="font-jost bg-[#F15B19] hover:bg-orange-600 text-white font-medium px-8 py-4 md:px-8 md:py-4 text-base md:text-[clamp(14px,1.5vw,20px)] transition shadow-lg active:scale-95 rounded-lg md:rounded-none w-full max-w-[280px] mx-auto md:w-auto md:mx-0"
              >
                GET A QUOTE
              </button>
            </div>

            {/* Mobile trust indicator */}
            <p className={`mt-4 text-xs text-gray-500 md:hidden transition-all duration-700 delay-500 ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Free consultation • No obligation
            </p>
          </div>
        </div>
      </div>

      {/* ---------- CONTROLS ---------- */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 md:left-[20%] md:translate-x-0 z-30 flex items-center justify-between w-[100px] sm:w-[110px] px-4 py-2 bg-[#DDC8B7] shadow-md md:rounded-none transition-all duration-700 delay-600 ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <button 
          onClick={prev} 
          className="hover:text-[#F15B19] transition p-1 active:scale-90"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="md:size-[28px]" />
        </button>
        <button 
          onClick={next} 
          className="hover:text-[#F15B19] transition p-1 active:scale-90"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="md:size-[28px]" />
        </button>
      </div>

      <Lead open={leadOpen} onClose={() => setLeadOpen(false)} />
    </section>
  );
}