"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const images = ["/Hero.png", "/Hero2.png"];
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
    <section className="relative w-full h-[650px] md:h-[820px] bg-white overflow-visible">

      {/* Right Image Container */}
      <div className="absolute right-0 top-0 h-full w-[60%] hidden md:block pointer-events-none">

        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Catering table setup"
            fill
            priority
            className={`object-cover object-center transition-opacity duration-[1200ms] ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Left Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 via-[25%] to-transparent to-[30%]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 overflow-visible">
        <div className="mt-24 max-w-[1650px] mx-auto w-full">

          <div className="relative max-w-none w-[1000px] md:-ml-8">

            <h1 className="text-4xl md:text-5xl font-jost font-medium text-gray-900 leading-tight">
              Elevate your events with
            </h1>

            <h2 className="mt-1 text-5xl md:text-[8rem] text-orange-500 font-brisa italic leading-[0.95]">
              Cravings Catering
            </h2>

            <p className="mt-4 text-[35px] text-black font-jost w-[750px] leading-tight">
              We have over 30 years of experience in delivering
              <br />crave-worthy food and personalized service.
            </p>

            <div className="mt-24">
              <Link
                href="/contact"
                className="font-jost inline-block bg-[#F15B19] hover:bg-orange-600 text-white px-7 py-5 text-4xl transition"
              >
                GET A QUOTE
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Chevron Controls */}
      <div className="px-4 py-2 absolute bottom-0 left-[500px] z-20 flex items-center justify-between w-[130px] bg-[#DDC8B7] shadow-md">

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