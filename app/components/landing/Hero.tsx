"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[650px] md:h-[770px] bg-white overflow-visible">
      
      {/* Right Image Container */}
      <div className="absolute right-0 top-0 h-full w-[60%] hidden md:block">
        
        <Image
          src="/Hero.png"
          alt="Catering table setup"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Short Left Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 via-[25%] to-transparent to-[30%]" />
      </div>

      {/* Content Container — SAME WIDTH AS HEADER */}
      <div className="relative z-10 h-full flex items-center px-8 overflow-visible">
        <div className="max-w-[1650px] mx-auto w-full">
          
          {/* Text Block (No Width Restriction + Slight Overlap) */}
          <div className="relative max-w-none w-[1000px] md:-ml-16">

            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              Elevate your events with
            </h1>

            <h2 className="mt-3 text-5xl md:text-[5.8rem] text-orange-500 font-serif italic leading-[0.95] tracking-tight">
              Cravings Catering
            </h2>

            <p className="mt-6 text-3xl text-gray-700 leading-relaxed w-[700px] leading-tight">
              We have over 30 years of experience in delivering
              crave-worthy food and personalized service.
            </p>

            <div className="mt-16">
              <Link
                href="/contact"
                className="inline-block bg-[#F15B19] hover:bg-orange-600 text-white font-md px-6 py-4 text-3xl transition"
              >
                GET A QUOTE
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}