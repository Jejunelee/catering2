"use client";

import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="font-jost w-full bg-black text-white py-16">
      <div className="max-w-[1700px] mx-auto px-8 grid md:grid-cols-[1fr_1.3fr] items-start">
        
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          <Image
            src="/Logo.png"
            alt="Cravings Logo"
            width={760}
            height={240}
            className="object-contain"
          />

          <p className="text-2xl text-white">
            © 2026 Cravings Catering Group. All rights reserved.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-12 ml-auto w-full max-w-[500px]">
          
          {/* Date Section */}
          <div className="w-full">
            <p className="text-4xl mb-4">When’s the special day?</p>

            <div className="text-2xl flex items-center border-b border-gray-400 pb-2">
              <input
                type="text"
                placeholder="Event Date here"
                className="bg-transparent outline-none text-gray-300 placeholder-gray-500 w-full"
              />

              <ArrowRight size={20} className="ml-3 text-white" />
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4">
            <p className="text-4xl font-medium">Get in touch</p>

            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-[#FF8400] flex items-center justify-center">
                <Facebook size={38} />
              </div>

              <div className="w-16 h-16 rounded-full bg-[#FF8400] flex items-center justify-center">
                <Instagram size={38} />
              </div>

              <div className="w-16 h-16 rounded-full bg-[#FF8400] flex items-center justify-center">
                <Phone size={38} />
              </div>

              <div className="w-16 h-16 rounded-full bg-[#FF8400] flex items-center justify-center">
                <Mail size={38} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}