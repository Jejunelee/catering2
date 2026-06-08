"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

interface TestimonialProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Corporate Event Planner",
    content: "The party trays were absolutely amazing! Our entire team raved about the food. The presentation was stunning and everything tasted fresh and delicious.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Wedding Client",
    content: "Best catering decision we made. The packed meals for our guests were convenient and incredibly tasty. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Birthday Party Host",
    content: "Professional, punctual, and the food was outstanding. Will definitely be using them for all future events.",
    rating: 5,
  },
];

export default function Testimonial({ 
  testimonials = defaultTestimonials, 
  title = "Client Love", 
  subtitle = "What our customers are saying" 
}: TestimonialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-[#FFF9F0] to-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-brisa italic text-4xl md:text-5xl font-light text-gray-800 mb-2">
            {title}
          </h2>
          <p className="font-jost text-md text-gray-500">
            {subtitle}
          </p>
          <div className="w-16 h-0.5 bg-[#FF8400] mx-auto mt-4"></div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Rating Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#FF8400] text-[#FF8400]" />
              ))}
            </div>

            {/* Content */}
            <p className="font-jost text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-6">
              "{current.content}"
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-gray-200 mx-auto my-4"></div>

            {/* Author */}
            <div className="text-center">
              <p className="font-jost font-semibold text-gray-800 text-lg">
                {current.name}
              </p>
              <p className="font-jost text-sm text-gray-400">
                {current.role}
              </p>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 h-2 bg-[#FF8400]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                prevTestimonial();
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-gray-500" />
            </button>
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                nextTestimonial();
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}