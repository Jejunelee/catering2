"use client";

import Image from "next/image";

export default function Quotes() {
  return (
    <section className="w-full bg-[#FFFFFF] py-20">
      <div className="max-w-[1800px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-stretch">
        
        {/* Left Image */}
        <div className="relative w-full aspect-[3/3.2]">
          <Image
            src="/Quotes.png"
            alt="Roasted pork dish"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Content */}
        <div className="h-full flex flex-col justify-between text-center">
          
          <div>
            <h2 className="text-[80px] font-brisa italic text-orange-500 mb-3 font-medium">
              Classic Since 1988
            </h2>

            <p className="font-jost text-[25px] text-black leading-relaxed mb-3">
              At Cravings, we believe food should make you feel at home. For over
              37 years, we’ve been serving crave-worthy comfort food made with
              care—recipes that people recognize, love, and always come back for.
            </p>

            <p className="font-jost text-[25px] text-black leading-relaxed mb-3">
              Our signature dishes aren’t just familiar—they’re feel-good
              favorites that bring people together and make any gathering
              instantly warmer and more memorable.
            </p>

            <p className="font-jost text-[28px] text-black font-semibold italic mb-3">
              Made with Love
            </p>

            <p className="font-jost text-[25px] text-black leading-relaxed mb-3">
              Cravings was founded by Annie Guerrero, whose passion for cooking
              with love shaped everything we do. From day one, she believed in
              thoughtful cooking, respect for ingredients, and applying zero-waste
              concepts long before it became a trend.
            </p>

            <p className="font-jost text-[28px] text-black font-semibold italic mb-3">
              Powered by CCA Manila
            </p>

            <p className="font-jost text-[25px] text-black leading-relaxed mb-3">
              Today, we continue that legacy—powered by the culinary excellence
              and standards of CCA Manila—combining heart, heritage, and
              professional expertise in every dish we serve.
            </p>
          </div>

          <p className="font-jost text-[28px] text-black font-semibold">
            Good food. Real comfort. Made with love.
          </p>

        </div>
      </div>
    </section>
  );
}