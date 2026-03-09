"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRight, Sparkles, Gift, Palette } from "lucide-react";
import Action from "@/app/events/modals/Action";

export default function Section3() {
  const [openAction, setOpenAction] = useState(false);
  
  // Add carousel images array for each section
  const sectionImages = [
    [
      "/events/actionstations/1-1.png",
      "/events/actionstations/2-2.png", // Add more images for Action Stations
    ],
    [
      "/events/eventstyling/1-1.png",
      "/events/eventstyling/2-2.png", // Add more images for Events Styling
      "/events/eventstyling/3-3.png",
    ],
    [
      "/events/personalizedgifts/11.png",
      "/events/personalizedgifts/22.png", // Add more images for Personalized Gifts
      "/events/personalizedgifts/33.png",
    ]
  ];

  // Add carousel state for each section
  const [indexes, setIndexes] = useState([0, 0, 0]);

  // Function to handle PDF download
  const downloadPDF = (pdfPath: string, fileName: string): void => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName || 'Offerings.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auto carousel for each section (desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    
    const interval = setInterval(() => {
      setIndexes(prev => prev.map((idx, i) => 
        idx === sectionImages[i].length - 1 ? 0 : idx + 1
      ));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sections = [
    {
      bgColor: "bg-[#633300]",
      title: "Action Stations",
      description: "Elevate your event with thoughtfully curated dining experiences and refined presentation. Menus can be customized to suit your theme and budget that complements every occasion.",
      image: "/events/sections/Section3x1.png",
      alt: "Action Stations",
      button: true,
      icon: <Sparkles size={24} />,
      modalAction: () => setOpenAction(true),
      textColor: "text-white"
    },
    {
      bgColor: "bg-[#FF8400]",
      title: "Events Styling",
      description: "Event styling services are available, offering curated design concepts with up to four theme options to suit your celebration and overall event vision.",
      image: "/events/sections/Section3x2.png",
      alt: "Event Styling",
      button: false,
      icon: <Palette size={24} />,
      textColor: "text-white"
    },
    {
      bgColor: "bg-[#FFEFE0]",
      title: "Personalized Gifts",
      description: "Personalized gift arrangements are available to add a thoughtful and memorable touch to your event.",
      image: "/events/sections/Section3x3.png",
      alt: "Personalized Gifts",
      button: false,
      icon: <Gift size={24} />,
      textColor: "text-black"
    }
  ];

  return (
    <>
      <section className="w-full py-8 md:py-12 bg-[#FFFFFF]">
        
        {/* Mobile Section Header */}
        <div className="md:hidden text-center px-4 mb-6">
          <h2 className="text-2xl font-jost font-medium text-gray-800">Complete Event Solutions</h2>
          <p className="text-sm text-gray-500 mt-1">Everything you need in one place</p>
        </div>

        <div className="max-w-[1200px] mx-auto">
          {/* Mobile Layout (stacked) - visible on mobile only */}
          <div className="md:hidden flex flex-col">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col">
                {/* Image */}
                <div className="relative h-[220px] w-full">
                  {sectionImages[index].map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt={section.alt}
                      fill
                      className={`object-cover transition-opacity duration-1000 ${
                        i === indexes[index] ? "opacity-100" : "opacity-0"
                      }`}
                      sizes="100vw"
                    />
                  ))}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                    {section.icon}
                    <span>{section.title}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`${section.bgColor} ${section.textColor} flex flex-col justify-center items-center text-center px-6 py-10 min-h-[240px]`}>
                  <h3 className="font-brisa italic text-6xl font-light leading-tight mb-3">
                    {section.title}
                  </h3>
                  <p className="font-jost text-md max-w-[600px] leading-relaxed mb-5 opacity-90">
                    {section.description}
                  </p>
                  {section.button && (
                    <button
                      onClick={section.modalAction}
                      className="font-jost border-2 border-white px-6 py-2 text-lg tracking-wider 
                      hover:bg-white hover:text-black transition-colors duration-300 
                      flex items-center gap-2 shadow-lg"
                    >
                      <span>LEARN MORE</span>
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout (staggered grid) - hidden on mobile */}
          <div className="hidden md:grid grid-cols-2 auto-rows-fr">
            {/* Row 1: Image | Content */}
            <div className="relative w-full h-full min-h-[450px]">
              {sectionImages[0].map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={sections[0].alt}
                  fill
                  className={`object-cover transition-opacity duration-1000 ${
                    i === indexes[0] ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="50vw"
                />
              ))}
            </div>
            <div className={`${sections[0].bgColor} ${sections[0].textColor} flex flex-col justify-center items-center text-center px-12 py-12 h-full`}>
              <div className="mb-4">{sections[0].icon}</div>
              <h3 className="font-brisa italic text-[70px] font-light leading-tight mb-4">
                {sections[0].title}
              </h3>
              <p className="font-jost text-[20px] max-w-[600px] leading-relaxed mb-6 opacity-90">
                {sections[0].description}
              </p>
              {sections[0].button && (
                <button
                  onClick={sections[0].modalAction}
                  className="font-jost border-3 border-white px-5 py-1 text-[28px] tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
                >
                  LEARN MORE
                </button>
              )}
            </div>

            {/* Row 2: Content | Image (staggered) */}
            <div className={`${sections[1].bgColor} ${sections[1].textColor} flex flex-col justify-center items-center text-center px-12 py-12 h-full`}>
              <div className="mb-4">{sections[1].icon}</div>
              <h3 className="font-brisa italic text-[70px] font-light leading-tight mb-4">
                {sections[1].title}
              </h3>
              <p className="font-jost text-[20px] max-w-[600px] leading-relaxed mb-6 opacity-90">
                {sections[1].description}
              </p>
            </div>
            <div className="relative w-full h-full min-h-[450px]">
              {sectionImages[1].map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={sections[1].alt}
                  fill
                  className={`object-cover transition-opacity duration-1000 ${
                    i === indexes[1] ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="50vw"
                />
              ))}
            </div>

            {/* Row 3: Image | Content */}
            <div className="relative w-full h-full min-h-[450px]">
              {sectionImages[2].map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={sections[2].alt}
                  fill
                  className={`object-cover transition-opacity duration-1000 ${
                    i === indexes[2] ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="50vw"
                />
              ))}
            </div>
            <div className={`${sections[2].bgColor} ${sections[2].textColor} flex flex-col justify-center items-center text-center px-12 py-12 h-full`}>
              <div className="mb-4">{sections[2].icon}</div>
              <h3 className="font-brisa italic text-[70px] font-light leading-tight mb-4">
                {sections[2].title}
              </h3>
              <p className="font-jost text-[20px] max-w-[600px] leading-relaxed mb-6 opacity-90">
                {sections[2].description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[1200px] mx-auto mt-6 md:mt-10 px-4 md:px-0">
          <button 
            onClick={() => downloadPDF("/files/Offerings.pdf", "Offerings.pdf")}
            className="font-jost text-xl md:text-[36px] underline decoration-2 md:decoration-3 underline-offset-4 w-full bg-black text-white py-4 md:py-5 
            hover:bg-gray-900 transition-colors duration-300 md:rounded-none shadow-lg md:shadow-none
            flex items-center justify-center gap-2"
          >
            <span>SEE ALL OUR OFFERINGS</span>
            <ChevronRight size={22} className="md:hidden" />
          </button>
        </div>
      </section>

      {/* Action Modal */}
      <Action open={openAction} onClose={() => setOpenAction(false)} />
    </>
  );
}