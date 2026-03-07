"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Section4() {
  const testimonials = [
    {
      name: "Pia Trinidad",
      company: "OTW Coffee",
      text: "Working with this team was seamless. They understood our vision perfectly and delivered a culinary experience that our guests are still talking about.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Tech Summit 2024",
      text: "Exceptional service and attention to detail. Our corporate event was elevated by their professional catering team.",
      rating: 5
    },
    {
      name: "Sarah Rodriguez",
      company: "Wedding Celebration",
      text: "They made our special day unforgettable. The food was amazing and the staff went above and beyond.",
      rating: 5
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="w-full bg-[#FFEFE0] overflow-hidden">
      {/* Mobile Section Header */}
      <div className="md:hidden text-center pt-8 px-4">
        <h2 className="text-3xl font-jost font-medium text-black">
          SERVED AND <span className="text-4xl font-brisa block text-[#7B3F00]">Satisfied</span>
        </h2>
        <p className="text-sm text-gray-600 mt-2">What our clients say about us</p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-[17fr_7fr]">
        
        {/* LEFT SIDE */}
        <div className="relative flex flex-col md:flex-row items-center justify-start py-10 md:py-20 px-4 md:px-0">
          
          {/* Desktop Header */}
          <h2 className="hidden md:block text-black absolute top-16 left-20 text-[60px] font-normal font-jost ml-6">
            SERVED AND <span className="text-[90px] font-brisa">Satisfied</span>
          </h2>

          {/* Image */}
          <div className="relative w-full md:w-[75%] h-[220px] md:h-[340px] mt-0 md:mt-24 ml-0 md:ml-20">
            <Image
              src="/events/sections/Section4x1.png"
              alt="Clients served"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
            />
          </div>
          
          {/* Mobile Image Caption */}
          <div className="md:hidden text-center mt-2">
            <p className="text-sm text-gray-600">Over 1,000+ happy clients</p>
          </div>
        </div>

        {/* RIGHT SIDE - Carousel for both mobile and desktop */}
        <div className="font-jost bg-[#7B3F00] flex items-center justify-center p-4 md:p-10">
          
          {/* Testimonial Carousel - Works on both mobile and desktop */}
          <div className="w-full max-w-[550px]">
            <div className="text-black bg-[#ECECEC] rounded-2xl p-6 md:p-10 md:py-16 text-center relative">
              
              {/* Rating Stars */}
              <div className="flex justify-center gap-1 mb-3 md:mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className="md:w-6 md:h-6 fill-[#7B3F00] text-[#7B3F00]" 
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <h4 className="text-xl md:text-[28px] font-medium">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-base md:text-[22px] italic mb-4 md:mb-6 text-[#7B3F00]">
                {testimonials[currentTestimonial].company}
              </p>
              <p className="text-base md:text-[22px] leading-relaxed md:leading-tight">
                "{testimonials[currentTestimonial].text}"
              </p>

              {/* Carousel Controls */}
              <div className="flex justify-between items-center mt-6 md:mt-8">
                <button 
                  onClick={prevTestimonial}
                  className="bg-[#7B3F00] text-white p-2 md:p-3 rounded-full hover:bg-[#633300] transition"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} className="md:w-6 md:h-6" />
                </button>
                
                {/* Dots Indicator */}
                <div className="flex gap-2 md:gap-3">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentTestimonial 
                          ? 'w-6 md:w-8 bg-[#7B3F00]' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextTestimonial}
                  className="bg-[#7B3F00] text-white p-2 md:p-3 rounded-full hover:bg-[#633300] transition"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} className="md:w-6 md:h-6" />
                </button>
              </div>

              {/* Counter */}
              <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
                {currentTestimonial + 1} of {testimonials.length}
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}