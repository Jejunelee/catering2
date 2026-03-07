"use client";

import Image from "next/image";
import { useState } from "react";
import Action from "@/app/events/modals/Action";

export default function Section1() {
  const [openAction, setOpenAction] = useState(false);

  return (
    <>
      <section className="w-full bg-white pb-24 md:pb-32">

        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2">

          {/* Party Trays TEXT */}
          <div className="bg-[#FF8400] text-white flex flex-col justify-center items-center text-center px-14 py-20">
            <h3 className="text-[90px] font-brisa italic mb-6">
              Party Trays
            </h3>

            <p className="font-jost text-[25px] max-w-[650px] leading-relaxed mb-10">
              Our customizable party trays feature a delectable assortment of
              appetizers, main courses, and desserts, crafted with the finest
              ingredients and culinary expertise.
            </p>

            <button
              onClick={() => setOpenAction(true)}
              className="font-jost border-3 border-white px-10 py-3 text-[28px] tracking-widest hover:bg-white hover:text-black transition"
            >
              ORDER NOW
            </button>
          </div>

          {/* Party Trays IMAGE */}
          <div className="relative h-[350px] md:h-[580px]">
            <Image
              src="/events/Section1x1.png"
              alt="Party Trays"
              fill
              className="object-cover"
            />
          </div>

          {/* Packed Meals IMAGE */}
          <div className="relative h-[350px] md:h-[580px]">
            <Image
              src="/events/Section1x2.png"
              alt="Packed Meals"
              fill
              className="object-cover"
            />
          </div>

          {/* Packed Meals TEXT */}
          <div className="bg-[#633300] text-white flex flex-col justify-center items-center text-center px-14 py-20">
            <h3 className="text-[90px] font-brisa italic mb-6">
              Packed Meals
            </h3>

            <p className="font-jost text-[25px] max-w-[650px] leading-relaxed mb-10">
              Our packed meals offer a delicious and hassle-free dining
              experience. Whether you're on-the-go or simply want a convenient
              meal at home, our packed meals are the perfect solution.
            </p>

            <button
              onClick={() => setOpenAction(true)}
              className="font-jost border-3 border-white px-10 py-3 text-[28px] tracking-widest hover:bg-white hover:text-black transition"
            >
              ORDER NOW
            </button>
          </div>

        </div>

        {/* CHECK OUR MENU BAR */}
        <div className="max-w-[1500px] mx-auto mt-10">
          <button
            onClick={() => setOpenAction(true)}
            className="font-jost text-[43px] underline decoration-3 underline-offset-4 w-full bg-black text-white py-6 hover:opacity-80 transition"
          >
            CHECK OUR MENU
          </button>
        </div>

      </section>

      <Action open={openAction} onClose={() => setOpenAction(false)} />
    </>
  );
}