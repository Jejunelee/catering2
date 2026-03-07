"use client";

import Image from "next/image";
import { useState } from "react";
import Action from "@/app/events/modals/Action";

export default function Section3() {
  const [openAction, setOpenAction] = useState(false);

  return (
    <>
      <section className="w-full py-12 bg-[#FFFFFF]">

        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2">

          {/* Row 1 */}
          <div className="bg-[#633300] text-white flex flex-col justify-center items-center text-center px-14 py-20">
            <h3 className="text-[100px] font-brisa italic">Action Stations</h3>

            <p className="text-[25px] font-jost max-w-[700px] text-sm leading-relaxed mb-6">
              Elevate your event with thoughtfully curated dining experiences and
              refined presentation. Menus can be customized to suit your theme
              and budget that complements every occasion.
            </p>

            <button
              onClick={() => setOpenAction(true)}
              className="font-jost border-3 border-white px-5 py-1 text-[35px] tracking-widest hover:bg-white hover:text-black transition"
            >
              LEARN MORE
            </button>
          </div>

          <div className="relative h-[320px] md:h-[580px]">
            <Image
              src="/events/Section3x1.png"
              alt="Action Stations"
              fill
              className="object-cover"
            />
          </div>


          {/* Row 2 */}
          <div className="relative h-[320px] md:h-[580px]">
            <Image
              src="/events/Section3x2.png"
              alt="Event Styling"
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-[#FF8400] text-white flex flex-col justify-center items-center text-center px-14 py-20">
            <h3 className="text-[100px] font-brisa italic">Events Styling</h3>

            <p className="text-[25px] font-jost max-w-[700px] text-sm leading-relaxed">
              Event styling services are available, offering curated design
              concepts with up to four theme options to suit your celebration and
              overall event vision.
            </p>
          </div>


          {/* Row 3 */}
          <div className="bg-[#FFEFE0] text-black flex flex-col justify-center items-center text-center px-14 py-20">
            <h3 className="text-[90px] font-brisa italic">Personalized Gifts</h3>

            <p className="text-[25px] font-jost max-w-[700px] text-sm leading-relaxed">
              Personalized gift arrangements are available to add a thoughtful
              and memorable touch to your event.
            </p>
          </div>

          <div className="relative h-[320px] md:h-[580px]">
            <Image
              src="/events/Section3x3.png"
              alt="Personalized Gifts"
              fill
              className="object-cover"
            />
          </div>

        </div>


        {/* Bottom CTA */}
        <div className="max-w-[1500px] mx-auto mt-10">
          <button className="font-jost text-[43px] underline decoration-3 underline-offset-4 w-full bg-black text-white py-5 text-sm hover:opacity-70 transition">
            SEE ALL OUR OFFERINGS
          </button>
        </div>

      </section>

      {/* Action Modal */}
      <Action open={openAction} onClose={() => setOpenAction(false)} />
    </>
  );
}