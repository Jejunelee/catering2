"use client";

export default function UPBGCPage() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="w-full lg:w-1/2 bg-[#F5F5F5] flex items-center justify-center px-8 lg:px-20 py-16">
        <div className="max-w-xl mb-40">

          {/* Title */}
          <h1 className="font-brisa text-[64px] md:text-[78px] text-[#F15A24] mb-2">
            Cravings @ UP
          </h1>

          {/* Address */}
          <p className="font-jost text-[22px] text-black leading-snug">
            LG, UP BGC,
            <br />
            Henry Sy Building,
            <br />
            Taguig, 1634 Metro Manila
          </p>

          {/* Divider */}
          <div className="w-32 h-[5px] bg-[#F15A24] mt-7 mb-12"></div>

          {/* Description */}
          <p className="font-jost text-[22px] leading-relaxed text-black">
            Located inside the University of the Philippines BGC campus at the
            Henry Sy Sr. Building, this venue offers a modern and professional
            setting ideal for corporate meetings, academic events, and intimate
            gatherings. With its prime location in Bonifacio Global City and a
            refined dining experience, it provides a convenient and elegant
            space for special occasions.
          </p>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 h-[500px] lg:h-auto">
        <iframe
          src="https://maps.google.com/maps?q=UP%20BGC%20Henry%20Sy%20Building&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </main>
  );
}