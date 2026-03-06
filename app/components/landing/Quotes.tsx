"use client";

import Image from "next/image";

export default function Quotes() {
  return (
    <section className="w-full bg-[#E9E9E9] py-20">
      <div className="max-w-[1600px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Image */}
        <div className="relative w-full aspect-[4/5]">
          <Image
            src="/Quotes.png"
            alt="Roasted pork dish"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Content */}
        <div className="text-center md:text-center">
          
          {/* Title */}
          <h2 className="text-[42px] italic text-orange-500 mb-6 font-light">
            Classic since 1988
          </h2>

          {/* Paragraph 1 */}
          <p className="text-gray-800 leading-relaxed mb-6">
            At Cravings, we believe food should make you feel at home. For over
            37 years, we’ve been serving crave-worthy comfort food made with
            care—recipes that people recognize, love, and always come back for.
          </p>

          {/* Paragraph 2 */}
          <p className="text-gray-800 leading-relaxed mb-6">
            Our signature dishes aren’t just familiar—they’re feel-good
            favorites that bring people together and make any gathering
            instantly warmer and more memorable.
          </p>

          {/* Emphasis */}
          <p className="font-semibold italic mb-6">
            Made with Love
          </p>

          {/* Paragraph 3 */}
          <p className="text-gray-800 leading-relaxed mb-6">
            Cravings was founded by Annie Guerrero, whose passion for cooking
            with love shaped everything we do. From day one, she believed in
            thoughtful cooking, respect for ingredients, and applying zero-waste
            concepts long before it became a trend.
          </p>

          {/* Emphasis */}
          <p className="font-semibold italic mb-6">
            Powered by CCA Manila
          </p>

          {/* Paragraph 4 */}
          <p className="text-gray-800 leading-relaxed mb-6">
            Today, we continue that legacy—powered by the culinary excellence
            and standards of CCA Manila—combining heart, heritage, and
            professional expertise in every dish we serve.
          </p>

          {/* Closing */}
          <p className="font-semibold">
            Good food. Real comfort. Made with love.
          </p>

        </div>
      </div>
    </section>
  );
}