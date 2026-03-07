"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Header() {
  const images = [
    "/foodtrays/Header1-1.png",
    "/foodtrays/Header1x2.png",
    "/foodtrays/Header1x3.png",
  ];

  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full">

      {/* Hero Image */}
      <div className="relative w-full h-[420px] md:h-[520px] lg:h-[600px]">

        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Cravings Delivered"
            fill
            priority
            className={`object-cover transition-opacity duration-[1200ms] ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Chevron Controls */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-between w-[130px] px-4 py-2 bg-[#FFFFFF] shadow-md">

          <button
            onClick={prev}
            className="text-[#F15B19] hover:text-white hover:bg-[#F15B19] transition"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={next}
            className="text-[#F15B19] hover:text-white hover:bg-[#F15B19] transition"
          >
            <ChevronRight size={32} />
          </button>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="relative w-full py-16 flex flex-col items-center justify-center text-center">

        <h1 className="font-brisa text-4xl md:text-[125px] font-medium tracking-wide text-black mb-2">
          Cravings Delivered
        </h1>

        <p className="font-jost text-xl md:text-[32px] max-w-[1100px] leading-tight text-black px-6">
          Hosting made easy with Cravings. Enjoy delivered party trays and packed meals,
          with optional chafing dish rentals for a smooth, stress-free celebration.
        </p>

      </div>

    </section>
  );
}