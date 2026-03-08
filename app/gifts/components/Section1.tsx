"use client";

import Image from "next/image";
import { ChevronRight, Sparkles, Gift, Star } from "lucide-react";

export default function Section2() {
  const items = [
    {
      title: "BASKETS &\nHAMPERS",
      description: "Timeless favorites crafted to perfection",
      image: "/gifts/sections/Section1-1.png",
      link: "https://cravingskitchenph.com/collections/all",
      icon: <Star size={28} />,
      color: "from-[#FF4D00] to-[#FF8400]"
    },
    {
      title: "DELUXE GIFT\nBOXES",
      description: "Our most beloved and sought-after treats",
      image: "/gifts/sections/Section1-2.png",
      link: "https://cravingskitchenph.com/collections/all",
      icon: <Sparkles size={28} />,
      color: "from-[#FF4D00] to-[#FF8400]"
    },
    {
      title: "PASTRIES &\nCHOCOLATES",
      description: "Exquisite offerings for the discerning palate",
      image: "/gifts/sections/Section1-3.png",
      link: "https://cravingskitchenph.com/collections/all",
      icon: <Gift size={28} />,
      color: "from-[#FF4D00] to-[#FF8400]"
    },
  ];

const handleClick = (link: string) => {
  window.location.href = link;
};

  return (
    <>
      <section className="w-full py-12 md:py-20 bg-[#FFEFE0] relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#FF8400] blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#633300] blur-3xl"></div>
        </div>

        {/* Cards */}
        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => handleClick(item.link)}
              className="group relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer 
              shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Gradient Overlay - More sophisticated than solid color */}
              <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-70 group-hover:opacity-60 transition-opacity duration-500`} />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 px-6 text-center
              bg-gradient-to-t from-black/60 via-transparent to-transparent">
                
                {/* Icon */}
                <div className="mb-3 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <div className="text-white bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-jost text-white text-4xl md:text-5xl font-bold leading-tight md:leading-[50px] whitespace-pre-line mb-2
                drop-shadow-lg">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/90 font-jost text-base md:text-lg max-w-[250px] mb-6 opacity-0 transform translate-y-4 
                group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {item.description}
                </p>

                {/* Hover Button */}
                <div className="opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <button className="bg-white text-[#633300] px-6 py-2 rounded-full font-jost text-sm font-medium
                  flex items-center gap-2 hover:bg-[#FF8400] hover:text-white transition-colors duration-300 shadow-lg">
                    <span>Go to Shop</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Top Accent Badge for Premium Items */}
              {i === 2 && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-[#633300] px-4 py-1 rounded-full 
                text-sm font-bold font-jost shadow-lg z-20">
                  BESTSELLER
                </div>
              )}
              {i === 1 && (
                <div className="absolute top-4 left-4 bg-white/90 text-[#633300] px-4 py-1 rounded-full 
                text-sm font-bold font-jost shadow-lg backdrop-blur-sm z-20">
                  POPULAR
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Section Indicator */}
        <div className="md:hidden flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                dot === 0 ? 'w-8 bg-[#FF8400]' : 'bg-[#633300]/30'
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}