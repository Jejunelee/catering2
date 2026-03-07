"use client";

import Image from "next/image";

export default function Section4() {
  return (
    <section className="w-full bg-[#FFEFE0]">

      <div className="w-full grid grid-cols-1 md:grid-cols-[17fr_7fr]">

        {/* LEFT SIDE */}
        <div className="relative flex items-center justify-start py-20">

          {/* Header */}
          <h2 className="text-black absolute top-16 left-20 text-[85px] font-normal font-jost ml-6">
            SERVED AND <span className="text-[130px] font-brisa">Satisfied</span>
          </h2>

          {/* Image */}
          <div className="relative w-[75%] h-[340px] mt-24 ml-20">
            <Image
              src="/events/Section4x1.png"
              alt="Clients served"
              fill
              className="object-contain"
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="font-jost bg-[#7B3F00] flex items-center justify-center p-10">

          <div className="text-black bg-[#ECECEC] rounded-2xl p-10 py-32 text-center max-w-[620px]">

            <h4 className="text-[35px] font-medium">
              Pia Trinidad
            </h4>

            <p className="text-[35px] italic mb-10">
              OTW Coffee
            </p>

            <p className="text-[35px] leading-tight">
              Working with this team was seamless. They understood our vision
              perfectly and delivered a culinary experience that our guests are
              still talking about.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}