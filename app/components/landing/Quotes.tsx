"use client";

import Image from "next/image";
import { useState } from "react";

export default function Quotes() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

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
        
        {/* Left Image */}
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-auto md:aspect-[3/3.2] rounded-md overflow-hidden">
          <Image
            src="/Quotes.png"
            alt="Roasted pork dish"
            fill
            className="object-cover"
            priority
          />
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