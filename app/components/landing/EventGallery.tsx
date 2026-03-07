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

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full relative">
      <div className="flex w-full items-stretch">

        {/* Left Orange Panel */}
        <div className="bg-[#FF8400] flex flex-col justify-center px-20 py-28 text-white w-[670px] h-[876px]">
          <h2 className="font-brisa text-[100px] leading-[1.15] font-light font-[cursive]">
            Moments Worth
            <br />
            Remembering
          </h2>

          <button className="mt-10 border-3 border-white px-7 py-3 text-[30px] tracking-[3px] hover:bg-white hover:text-[#F5821F] transition-all duration-300 w-fit">
            VIEW EVENT GALLERY
          </button>
        </div>

        {/* Right Image Carousel */}
        <div className="flex-1 p-9 bg-[#E6D7C7]">
          <div className="relative w-full h-[800px]">

            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt="Event Gallery"
                fill
                priority
                className={`object-cover transition-opacity duration-[1200ms] ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

          </div>
        </div>

      </div>

      {/* Chevron Controls (OVERLAPPING BOTH SECTIONS) */}
      <div className="px-4 py-2 absolute bottom-0 left-[670px] -translate-x-1/2 z-20 flex items-center justify-between w-[130px] bg-[#000000] shadow-md">

        <button
          onClick={prev}
          className="hover:bg-[#F15B19] transition"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={next}
          className="hover:bg-[#F15B19] transition"
        >
          <ChevronRight size={32} />
        </button>

      </div>

    </section>
  );
}