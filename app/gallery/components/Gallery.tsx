"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

interface GalleryProps {
  images?: GalleryImage[];
  title?: string;
  subtitle?: string;
}

// Exact folder names as you provided
const folderConfig = [
  { 
    folder: "cap", 
    category: "Capital One Event • Kalubkob Elementary School • Oct 9, 2025 • 100th Water Tank Donation",
    displayName: "Capital One Event"
  },
  { 
    folder: "wtc", 
    category: "WTC E3 • September 24-25, 2025",
    displayName: "WTC E3"
  },
  { 
    folder: "pma", 
    category: "Phil Marketing Association • BYD Aseana Manila • August 8, 2025",
    displayName: "Phil Marketing Association"
  },
  { 
    folder: "travelclub", 
    category: "Travel Club • Rockwell Powerplant • September 14, 2025",
    displayName: "Travel Club"
  },
  { 
    folder: "paypal", 
    category: "PayPal Launch Event",
    displayName: "PayPal Launch"
  },
  { 
    folder: "rt", 
    category: "RT's 60th Birthday",
    displayName: "RT's 60th Birthday"
  },
  { 
    folder: "pdi", 
    category: "PDI's Best Desserts",
    displayName: "PDI's Best Desserts"
  },
  { 
    folder: "cat24", 
    category: "Catering Photos 2024",
    displayName: "Catering 2024"
  }
];

// Specify exact number of images per folder
const imagesPerFolder: Record<string, number> = {
  "cap": 6,
  "wtc": 4,
  "pma": 3,
  "travelclub": 4,
  "paypal": 63,
  "rt": 11,
  "pdi": 4,
  "cat24": 7
};

// Maximum number of images to show per event in the collage
const MAX_COLLAGE_IMAGES_PER_EVENT = 3;

// Generate all images
const generateAllImages = (): GalleryImage[] => {
  const allImages: GalleryImage[] = [];
  
  folderConfig.forEach((config) => {
    const imageCount = imagesPerFolder[config.folder] || 0;
    
    for (let i = 1; i <= imageCount; i++) {
      allImages.push({
        src: `/gallery/${config.folder}/P${i}.jpg`,
        alt: `${config.category} - Photo ${i}`,
        category: config.displayName,
      });
    }
  });
  
  return allImages;
};

// Generate collage images (max 3 per category)
const generateCollageImages = (allImages: GalleryImage[]): GalleryImage[] => {
  const collageImages: GalleryImage[] = [];
  const categoryCounts: Record<string, number> = {};
  
  for (const img of allImages) {
    const cat = img.category || '';
    const currentCount = categoryCounts[cat] || 0;
    
    if (currentCount < MAX_COLLAGE_IMAGES_PER_EVENT) {
      collageImages.push(img);
      categoryCounts[cat] = currentCount + 1;
    }
  }
  
  return collageImages;
};

const allImagesGenerated = generateAllImages();
const collageImages = generateCollageImages(allImagesGenerated);

// Split images into columns for masonry layout
const getMasonryColumns = (images: GalleryImage[], columns: number = 3): GalleryImage[][] => {
  const columnArrays: GalleryImage[][] = Array(columns).fill(null).map(() => []);
  
  images.forEach((image, index) => {
    const columnIndex = index % columns;
    columnArrays[columnIndex].push(image);
  });
  
  return columnArrays;
};

export default function Gallery({ 
  images = collageImages, 
  title = "Event Gallery", 
  subtitle = "Capturing moments that matter" 
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [columns, setColumns] = useState(3);

  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 768) setColumns(2);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get all images for a category (for lightbox)
  const getAllImagesForCategory = (category: string): GalleryImage[] => {
    return allImagesGenerated.filter(img => img.category === category);
  };

  const openLightbox = (image: GalleryImage) => {
    const categoryImages = getAllImagesForCategory(image.category || '');
    const actualIndex = categoryImages.findIndex(img => img.src === image.src);
    setSelectedImage(image);
    setCurrentIndex(actualIndex >= 0 ? actualIndex : 0);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const getCurrentCategoryImages = (): GalleryImage[] => {
    if (!selectedImage) return [];
    return getAllImagesForCategory(selectedImage.category || '');
  };

  const navigatePrev = () => {
    const categoryImages = getCurrentCategoryImages();
    const newIndex = currentIndex === 0 ? categoryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(categoryImages[newIndex]);
  };

  const navigateNext = () => {
    const categoryImages = getCurrentCategoryImages();
    const newIndex = currentIndex === categoryImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(categoryImages[newIndex]);
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

  const getCurrentDisplayIndex = () => {
    if (!selectedImage) return { current: 1, total: 1 };
    const categoryImages = getAllImagesForCategory(selectedImage.category || '');
    const index = categoryImages.findIndex(img => img.src === selectedImage.src);
    return { current: index + 1, total: categoryImages.length };
  };

  // Generate unique ID for image
  const getImageId = (image: GalleryImage, colIndex: number, rowIndex: number) => {
    return `${image.category}-${image.src}-${colIndex}-${rowIndex}`;
  };

  // Get masonry columns for images
  const masonryColumns = getMasonryColumns(images, columns);

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-20 bg-gradient-to-b from-[#FFFFFF] to-[#FFF9F0]">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header - No badge */}
        <div className="text-center mb-12 md:mb-16 relative">
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

        {/* Masonry Collage Grid - Equal spacing, no large gaps */}
        <div className="flex gap-4 md:gap-6">
          {masonryColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-4 md:gap-6">
              {column.map((image, rowIndex) => {
                const imageId = getImageId(image, colIndex, rowIndex);
                const totalInCategory = allImagesGenerated.filter(img => img.category === image.category).length;
                const hasMoreImages = totalInCategory > MAX_COLLAGE_IMAGES_PER_EVENT;
                
                return (
                  <div
                    key={imageId}
                    onClick={() => openLightbox(image)}
                    onMouseEnter={() => setHoveredImageId(imageId)}
                    onMouseLeave={() => setHoveredImageId(null)}
                    className="relative group overflow-hidden cursor-pointer rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500"
                    style={{
                      transform: hoveredImageId === imageId ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
                    }}
                  >
                    {/* Image Container with aspect ratio based on natural image dimensions */}
                    <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500
                        ${hoveredImageId === imageId ? 'opacity-100' : 'opacity-0'}`}
                      />
                      
                      {/* Content Overlay */}
                      <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-all duration-500
                        ${hoveredImageId === imageId ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                          <p className="font-jost text-white text-sm md:text-base font-medium line-clamp-2">
                            {image.category}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-[#FF8400] font-jost tracking-wide uppercase">
                              View Gallery
                            </span>
                            <div className="w-4 h-px bg-white/50"></div>
                            <span className="text-xs text-white/70">Click to explore →</span>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      {image.category && (
                        <div className="absolute top-3 left-3 z-10">
                          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-white text-[10px] md:text-xs font-jost tracking-wider line-clamp-1 max-w-[200px]">
                              {image.category}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* "More Images" indicator */}
                      {hasMoreImages && (
                        <div className="absolute bottom-3 right-3 z-10">
                          <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                            <span className="text-white text-[10px] font-jost">
                              +{totalInCategory - MAX_COLLAGE_IMAGES_PER_EVENT} more
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center"
          onClick={closeLightbox}
          tabIndex={0}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-20 text-white hover:text-[#FF8400] transition-all duration-300 hover:rotate-90"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {getCurrentCategoryImages().length > 1 && (
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
            
            <div className="absolute -bottom-16 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="font-brisa italic text-xl md:text-2xl text-white">{selectedImage.category}</p>
                  <p className="font-jost text-sm text-white/70 mt-1">
                    Photo {getCurrentDisplayIndex().current} of {getCurrentDisplayIndex().total}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm font-jost">
                  <div className="w-8 h-px bg-white/30"></div>
                  <span>{getCurrentDisplayIndex().current} / {getCurrentDisplayIndex().total}</span>
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