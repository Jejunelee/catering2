"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
  span?: "single" | "double" | "wide" | "tall";
}

interface GalleryProps {
  images?: GalleryImage[];
  title?: string;
  subtitle?: string;
}

const defaultImages: GalleryImage[] = [
  {
    src: "/events/gallery/gallery1.jpg",
    alt: "Party Tray Display",
    category: "Party Trays",
    span: "wide",
  },
  {
    src: "/events/gallery/gallery2.jpg",
    alt: "Gourmet Packed Meals",
    category: "Packed Meals",
    span: "tall",
  },
  {
    src: "/events/gallery/gallery3.jpg",
    alt: "Dessert Selection",
    category: "Desserts",
    span: "single",
  },
  {
    src: "/events/gallery/gallery4.jpg",
    alt: "Corporate Catering Setup",
    category: "Corporate",
    span: "double",
  },
  {
    src: "/events/gallery/gallery5.jpg",
    alt: "Wedding Spread",
    category: "Weddings",
    span: "single",
  },
  {
    src: "/events/gallery/gallery6.jpg",
    alt: "Breakfast Buffet",
    category: "Breakfast",
    span: "wide",
  },
  {
    src: "/events/gallery/gallery7.jpg",
    alt: "Chef Plating",
    category: "Behind the Scenes",
    span: "tall",
  },
  {
    src: "/events/gallery/gallery8.jpg",
    alt: "Custom Cake Design",
    category: "Desserts",
    span: "single",
  },
  {
    src: "/events/gallery/gallery9.jpg",
    alt: "Outdoor Catering",
    category: "Events",
    span: "double",
  },
];

export default function Gallery({ 
  images = defaultImages, 
  title = "Visual Feast", 
  subtitle = "A glimpse into our culinary artistry" 
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [filter, setFilter] = useState<string>("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Get unique categories
  const categories = ["All", ...new Set(images.map(img => img.category).filter(Boolean))] as string[];

  // Filter images based on selected category
  const filteredImages = filter === "All" 
    ? images 
    : images.filter(img => img.category === filter);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigatePrev = () => {
    const newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const navigateNext = () => {
    const newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigatePrev();
      if (e.key === "ArrowRight") navigateNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  // Get grid class based on span
  const getGridClass = (span: string = "single") => {
    switch(span) {
      case "double":
        return "md:col-span-2 md:row-span-2";
      case "wide":
        return "md:col-span-2";
      case "tall":
        return "md:row-span-2";
      default:
        return "";
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-20 bg-gradient-to-b from-[#FFFFFF] to-[#FFF9F0]">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Creative Header with accent */}
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="inline-flex items-center gap-2 bg-[#FF8400]/10 px-4 py-1 rounded-full mb-4">
            <Sparkles size={16} className="text-[#FF8400]" />
            <span className="font-jost text-xs tracking-wider text-[#FF8400] uppercase">Moments Captured</span>
          </div>
          <h2 className="font-brisa italic text-5xl md:text-7xl font-light text-gray-800 mb-3">
            {title}
          </h2>
          <div className="relative inline-block">
            <p className="font-jost text-md md:text-lg text-gray-500">
              {subtitle}
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#FF8400]"></div>
          </div>
        </div>

        {/* Category Filter - Creative Pill Design */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-2 md:gap-3 bg-white/50 backdrop-blur-sm p-1 rounded-full shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`font-jost px-5 md:px-7 py-2 md:py-2.5 text-xs md:text-sm tracking-wider rounded-full transition-all duration-500 whitespace-nowrap
                  ${filter === category 
                    ? "bg-[#FF8400] text-white shadow-lg shadow-[#FF8400]/30 scale-105" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Creative Masonry/Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(280px,auto)] gap-4 md:gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(image, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group overflow-hidden cursor-pointer rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 ${getGridClass(image.span)}`}
              style={{
                transform: hoveredIndex === index ? 'scale-[1.02]' : 'scale(1)',
                transition: 'transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-full min-h-[280px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Gradient Overlay - Appears on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500
                  ${hoveredIndex === index ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}
                />
                
                {/* Content Overlay - Slides up on hover */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-all duration-500
                  ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                    <p className="font-jost text-white text-sm md:text-base font-medium">
                      {image.alt}
                    </p>
                    {image.category && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-[#FF8400] font-jost tracking-wide uppercase">
                          {image.category}
                        </span>
                        <div className="w-4 h-px bg-white/50"></div>
                        <span className="text-xs text-white/70">View Details →</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Badge - Top corner */}
                {image.category && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-[10px] md:text-xs font-jost tracking-wider">
                        {image.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State with creative illustration */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
              <Sparkles size={32} className="text-gray-400" />
            </div>
            <p className="font-jost text-gray-500 text-lg">No moments found in this category.</p>
            <button 
              onClick={() => setFilter("All")}
              className="mt-4 font-jost text-[#FF8400] underline"
            >
              View all moments
            </button>
          </div>
        )}
      </div>

      {/* Creative Lightbox Modal with Parallax Effect */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center"
          onClick={closeLightbox}
          tabIndex={0}
        >
          {/* Close button with animation */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-20 text-white hover:text-[#FF8400] transition-all duration-300 hover:rotate-90"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation buttons with creative styling */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePrev();
                }}
                className="absolute left-4 z-20 text-white hover:text-[#FF8400] transition-all duration-300 bg-black/30 hover:bg-black/50 backdrop-blur-sm p-3 rounded-full group"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateNext();
                }}
                className="absolute right-4 z-20 text-white hover:text-[#FF8400] transition-all duration-300 bg-black/30 hover:bg-black/50 backdrop-blur-sm p-3 rounded-full group"
                aria-label="Next image"
              >
                <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Image container with creative border */}
          <div
            className="relative w-full max-w-[85vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center border-2 border-white/10 rounded-2xl p-2 bg-black/30 backdrop-blur-sm">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            
            {/* Creative Caption with gradient */}
            <div className="absolute -bottom-16 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="font-brisa italic text-xl md:text-2xl text-white">{selectedImage.alt}</p>
                  {selectedImage.category && (
                    <p className="font-jost text-sm text-[#FF8400] mt-1">{selectedImage.category}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm font-jost">
                  <div className="w-8 h-px bg-white/30"></div>
                  <span>{currentIndex + 1} / {filteredImages.length}</span>
                  <div className="w-8 h-px bg-white/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}