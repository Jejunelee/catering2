"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Quotes() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  
  // Carousel images array
  const carouselImages = [
    "/landing/quotes/Quotes-1.jpg",
    "/landing/quotes/Quotes-2.jpg",
    "/landing/quotes/Quotes-3.jpg",
  ];

  // Carousel state
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Navigation functions
  const prev = () => {
    setIndex((i) => (i === 0 ? carouselImages.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === carouselImages.length - 1 ? 0 : i + 1));
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

  // Auto carousel (desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    
    const interval = setInterval(() => {
      setIndex((i) => (i === carouselImages.length - 1 ? 0 : i + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const mobileSections = [
    {
      id: 0,
      title: "Classic Since 1988",
      content: "At Cravings, we believe food should make you feel at home. For over 37 years, we've been serving crave-worthy comfort food made with care—recipes that people recognize, love, and always come back for. Our signature dishes aren't just familiar—they're feel-good favorites that bring people together and make any gathering instantly warmer and more memorable."
    },
    {
      id: 1,
      title: "Made with Love",
      content: "Cravings was founded by Annie Guerrero, whose passion for cooking with love shaped everything we do. From day one, she believed in thoughtful cooking, respect for ingredients, and applying zero-waste concepts long before it became a trend."
    },
    {
      id: 2,
      title: "Powered by CCA Manila",
      content: "Today, we continue that legacy—powered by the culinary excellence and standards of CCA Manila—combining heart, heritage, and professional expertise in every dish we serve."
    }
  ];

  const toggleSection = (id: number) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-stretch">
        
        {/* Left Image Carousel */}
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-auto md:aspect-[3/3.2] rounded-md overflow-hidden">
          {/* Carousel Images */}
          {carouselImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Food dish ${i + 1}`}
              fill
              priority={i === 0}
              className={`object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}

          {/* Desktop Chevron Controls - Same style as EventGallery */}
          <div className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 z-20 items-center justify-between h-[40px] w-[90px] bg-black shadow-md">
            <button 
              onClick={prev} 
              className="hover:bg-[#F15B19] transition p-2 text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={next} 
              className="hover:bg-[#F15B19] transition p-2 text-white"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Mobile Touch Handlers */}
          <div
            className="absolute inset-0 z-10 md:hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />

          {/* Mobile Chevron Controls - Positioned to avoid overlap */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 transition-all md:hidden rounded-r-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 transition-all md:hidden rounded-l-lg"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Counter for mobile */}
          <div className="absolute top-2 right-2 z-20 bg-black/60 text-white text-xs px-2 py-1 rounded-full md:hidden">
            {index + 1}/{carouselImages.length}
          </div>
        </div>

        {/* Right Content */}
        <div className="h-full flex flex-col justify-between">
          
          {/* Desktop Version (unchanged) */}
          <div className="hidden md:block text-center">
            <h2 className="font-brisa italic text-orange-500 font-medium mb-3
              text-[28px] sm:text-[36px] md:text-[50px] lg:text-[70px] xl:text-[80px]">
              Classic Since 1988
            </h2>

            <p className="font-jost text-black leading-relaxed mb-3
              text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px]">
              At Cravings, we believe food should make you feel at home. For over
              37 years, we've been serving crave-worthy comfort food made with
              care—recipes that people recognize, love, and always come back for.
            </p>

            <p className="font-jost text-black leading-relaxed mb-3
              text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px]">
              Our signature dishes aren't just familiar—they're feel-good
              favorites that bring people together and make any gathering
              instantly warmer and more memorable.
            </p>

            <p className="font-jost text-black font-semibold italic mb-2
              text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px]">
              Made with Love
            </p>

            <p className="font-jost text-black leading-relaxed mb-3
              text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px]">
              Cravings was founded by Annie Guerrero, whose passion for cooking
              with love shaped everything we do. From day one, she believed in
              thoughtful cooking, respect for ingredients, and applying zero-waste
              concepts long before it became a trend.
            </p>

            <p className="font-jost text-black font-semibold italic mb-2
              text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px]">
              Powered by CCA Manila
            </p>

            <p className="font-jost text-black leading-relaxed mb-3
              text-[14px] sm:text-[15px] md:text-[18px] lg:text-[22px]">
              Today, we continue that legacy—powered by the culinary excellence
              and standards of CCA Manila—combining heart, heritage, and
              professional expertise in every dish we serve.
            </p>
          </div>

          {/* Mobile Version - Vertical Accordion */}
          <div className="md:hidden flex flex-col space-y-3">
            {mobileSections.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 py-3 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className={`font-jost font-semibold text-base ${
                    expandedSection === section.id ? 'text-orange-500' : 'text-black'
                  }`}>
                    {section.title}
                  </span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      expandedSection === section.id ? 'rotate-180 text-orange-500' : 'text-gray-400'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    expandedSection === section.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="font-jost text-black text-sm leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom tagline - visible on both mobile and desktop */}
          <p className="font-jost text-black font-semibold text-center
            text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] mt-6 md:mt-0">
            Good food. Real comfort. Made with love.
          </p>

        </div>
      </div>
    </section>
  );
}