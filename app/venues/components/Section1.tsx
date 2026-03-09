"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Section1() {
  // Add carousel images array for each venue
  const venueImages = [
    [
      "/venues/locations/maginhawa/1.jpg",
      "/venues/locations/maginhawa/2.jpg",
      "/venues/locations/maginhawa/3.jpg",
      "/venues/locations/maginhawa/4.jpg",
      "/venues/locations/maginhawa/5.jpg", 
      "/venues/locations/maginhawa/6.jpg",
      "/venues/locations/maginhawa/7.jpg", 
      "/venues/locations/maginhawa/8.jpg",
    ],
    [
      "/venues/locations/alabang/1.jpg",
      "/venues/locations/alabang/2.jpg",
      "/venues/locations/alabang/3.jpg",
      "/venues/locations/alabang/4.jpg",
      "/venues/locations/alabang/5.jpg",
      "/venues/locations/alabang/6.jpg",
      "/venues/locations/alabang/7.jpg",
      "/venues/locations/alabang/8.jpg",
    ],
    [
      "/venues/locations/brittany/1.png",
      "/venues/locations/brittany/2.png",
      "/venues/locations/brittany/3.png",
    ],
    [
      "/venues/locations/katipunan/1.png",
      "/venues/locations/katipunan/2.png",
      "/venues/locations/katipunan/3.png",
    ],
    [
      "/venues/locations/up/1.png",
      "/venues/locations/up/2.png",
      "/venues/locations/up/3.png",
    ],
    [
      "/venues/locations/savea/1.png",
      "/venues/locations/savea/2.png",
      "/venues/locations/savea/3.png",
    ]
  ];

  // State for tracking hover of each venue
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // State for carousel indexes
  const [indexes, setIndexes] = useState<number[]>(new Array(6).fill(0));
  
  // Refs for interval cleanup
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>(new Array(6).fill(null));

  // Handle hover start
  const handleMouseEnter = (i: number) => {
    setHoveredIndex(i);
    
    // Clear any existing interval for this venue
    if (intervalRefs.current[i]) {
      clearInterval(intervalRefs.current[i] as NodeJS.Timeout);
    }
    
    // Start carousel for this specific venue
    intervalRefs.current[i] = setInterval(() => {
      setIndexes((prev: number[]) => {
        const newIndexes = [...prev];
        newIndexes[i] = newIndexes[i] === venueImages[i].length - 1 ? 0 : newIndexes[i] + 1;
        return newIndexes;
      });
    }, 1000);
  };

  // Handle hover end
  const handleMouseLeave = (i: number) => {
    setHoveredIndex(null);
    
    // Clear interval for this venue
    if (intervalRefs.current[i]) {
      clearInterval(intervalRefs.current[i] as NodeJS.Timeout);
      intervalRefs.current[i] = null;
    }
    
    // Reset to first image
    setIndexes((prev: number[]) => {
      const newIndexes = [...prev];
      newIndexes[i] = 0;
      return newIndexes;
    });
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      intervalRefs.current.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  interface Venue {
    name: string;
    location: string;
    image: string;
    link: string;
  }

  const venues: Venue[] = [
    {
      name: "CRAVINGS MAGINHAWA",
      location: "Quezon City",
      image: "/venues/locations/locations1-1.png",
      link: "venues/maginhawa",
    },
    {
      name: "CRAVINGS ALABANG",
      location: "Alabang",
      image: "/venues/locations/locations1-2.png",
      link: "venues/alabang",
    },
    {
      name: "BRITTANY HOTEL",
      location: "BGC",
      image: "/venues/locations/locations1-3.png",
      link: "venues/brittany-hotel",
    },
    {
      name: "CASA KATIPUNAN",
      location: "Quezon City",
      image: "/venues/locations/locations1-4.png",
      link: "venues/casa-katipunan",
    },
    {
      name: "UNIVERSITY OF THE PHILIPPINES",
      location: "Bonifacio Global City",
      image: "/venues/locations/locations1-5.png",
      link: "venues/up",
    },
    {
      name: "CRAVINGS AT SAVEA",
      location: "Bay City Manila",
      image: "/venues/locations/locations1-6.png",
      link: "venues/savea",
    },
  ];

  return (
    <section className="w-full bg-[#F4F4F4] py-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 px-6">
        {venues.map((venue: Venue, i: number) => (
          <div 
            key={i} 
            className="bg-white shadow-md overflow-hidden"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            {/* Image Container with Magnify Effect */}
            <div className="relative w-full h-[320px] overflow-hidden">
              {venueImages[i].map((src: string, idx: number) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    idx === indexes[i] ? "opacity-100" : "opacity-0"
                  } ${hoveredIndex === i ? 'scale-110' : 'scale-100'}`}
                >
                  <Image
                    src={src}
                    alt={venue.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>

            {/* Orange Bar */}
            <div className="bg-[#F05A00] text-white flex items-center justify-between px-6 py-5 font-jost">
              <div>
                <h3 className="text-[20px] tracking-wide">
                  {venue.name}
                </h3>
                <p className="text-[15px] opacity-90">
                  {venue.location}
                </p>
              </div>

              <Link
                href={venue.link}
                className="border border-white px-4 py-2 text-[13px] tracking-widest hover:bg-white hover:text-[#F05A00] transition"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}