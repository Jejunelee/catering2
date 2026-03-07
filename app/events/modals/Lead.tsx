"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface LeadProps {
  open: boolean;
  onClose: () => void;
}

export default function Lead({ open, onClose }: LeadProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl overflow-hidden font-jost"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-black transition"
          onClick={onClose}
        >
          <X size={26} />
        </button>

        <div className="grid md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="bg-[#F26522] text-white p-10 flex flex-col justify-between">

            <div>
              <Image
                src="/Logo.png"
                alt="Cravings Logo"
                width={200}
                height={60}
                className="mb-8"
              />

              <h2 className="text-5xl font-medium mb-4">
                Plan Your Event
              </h2>

              <p className="text-2xl text-white/90 leading-relaxed">
                Tell us about your event and our catering specialists will help
                craft the perfect menu and experience for you.
              </p>
            </div>

            <p className="text-lg text-white/70 mt-10">
              We typically respond within 24 hours.
            </p>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="p-10 bg-white">

            <form className="space-y-5">

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  NAME
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full mt-1 h-11 px-4 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full mt-1 h-11 px-4 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    PHONE
                  </label>
                  <input
                    type="text"
                    placeholder="0917 000 0000"
                    className="w-full mt-1 h-11 px-4 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                  />
                </div>

              </div>

              {/* Event Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    EVENT TYPE
                  </label>
                  <input
                    type="text"
                    placeholder="Wedding, Birthday..."
                    className="w-full mt-1 h-11 px-4 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    EVENT VENUE
                  </label>
                  <input
                    type="text"
                    placeholder="Venue name"
                    className="w-full mt-1 h-11 px-4 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    GUEST COUNT
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    className="w-full mt-1 h-11 px-4 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                  />
                </div>

              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  MESSAGE
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your event..."
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F26522]"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="bg-[#F26522] text-white px-8 py-3 rounded-md font-medium hover:bg-[#e35a1b] transition"
                >
                  Submit Inquiry
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}