"use client";

import Image from "next/image";
import { ChevronRight, UtensilsCrossed, PackageOpen } from "lucide-react";

export default function Section1() {
  // Define interface for section items
  interface SectionItem {
    bgColor: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    button: boolean;
    icon: React.ReactNode;
    pdfPath: string;
    fileName: string;
    textColor: string;
  }

  const sections: SectionItem[] = [
    {
      bgColor: "bg-[#FF8400]",
      title: "Party Trays",
      description: "Our customizable party trays feature a delectable assortment of appetizers, main courses, and desserts, crafted with the finest ingredients and culinary expertise.",
      image: "/foodtrays/sections/section1x1.png",
      alt: "Party Trays",
      button: true,
      icon: <UtensilsCrossed size={24} />,
      pdfPath: "/files/Sample1.pdf",
      fileName: "Party-Trays-Menu.pdf",
      textColor: "text-white"
    },
    {
      bgColor: "bg-[#633300]",
      title: "Packed Meals",
      description: "Our packed meals offer a delicious and hassle-free dining experience. Whether you're on-the-go or want a convenient meal at home, our packed meals are the perfect solution.",
      image: "/foodtrays/sections/section1x2.png",
      alt: "Packed Meals",
      button: true,
      icon: <PackageOpen size={24} />,
      pdfPath: "/files/Sample1.pdf",
      fileName: "Packed-Meals-Menu.pdf",
      textColor: "text-white"
    }
  ];

  // Function to handle PDF download with proper typing
  const downloadPDF = (pdfPath: string, fileName: string): void => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName || 'menu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section className="w-full py-8 md:py-12 bg-[#FFFFFF]">
        
        {/* Mobile Section Header */}
        <div className="md:hidden text-center px-4 mb-6">
          <h2 className="text-2xl font-jost font-medium text-gray-800">Fresh Catering Options</h2>
          <p className="text-sm text-gray-500 mt-1">Ready when you are</p>
        </div>

        <div className="max-w-[1200px] mx-auto">
          {/* Mobile Layout (stacked) - visible on mobile only */}
          <div className="md:hidden flex flex-col">
            {sections.map((section: SectionItem, index: number) => (
              <div key={index} className="flex flex-col">
                {/* Image */}
                <div className="relative h-[220px] w-full">
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
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
                      onClick={() => downloadPDF(section.pdfPath, section.fileName)}
                      className="font-jost border-2 border-white px-6 py-2 text-lg tracking-wider 
                      hover:bg-white hover:text-black transition-colors duration-300 
                      flex items-center gap-2 shadow-lg"
                    >
                      <span>DOWNLOAD MENU</span>
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
              <Image
                src={sections[0].image}
                alt={sections[0].alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
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
                  onClick={() => downloadPDF(sections[0].pdfPath, sections[0].fileName)}
                  className="font-jost border-3 border-white px-5 py-1 text-[28px] tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
                >
                  DOWNLOAD MENU
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
              {sections[1].button && (
                <button
                  onClick={() => downloadPDF(sections[1].pdfPath, sections[1].fileName)}
                  className="font-jost border-3 border-white px-5 py-1 text-[28px] tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
                >
                  DOWNLOAD MENU
                </button>
              )}
            </div>
            <div className="relative w-full h-full min-h-[450px]">
              <Image
                src={sections[1].image}
                alt={sections[1].alt}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[1200px] mx-auto mt-6 md:mt-10 px-4 md:px-0">
          <button 
            onClick={() => downloadPDF("/files/Sample1.pdf", "Full-Menu.pdf")}
            className="font-jost text-xl md:text-[36px] underline decoration-2 md:decoration-3 underline-offset-4 w-full bg-black text-white py-4 md:py-5 
            hover:bg-gray-900 transition-colors duration-300 md:rounded-none shadow-lg md:shadow-none
            flex items-center justify-center gap-2"
          >
            <span>CHECK OUR FULL MENU</span>
            <ChevronRight size={22} className="md:hidden" />
          </button>
        </div>
      </section>
    </>
  );
}