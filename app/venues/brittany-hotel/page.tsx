"use client";

export default function BrittanyHotelPage() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="w-full lg:w-1/2 bg-[#F5F5F5] flex items-center justify-center px-8 lg:px-20 py-16">
        <div className="max-w-xl mb-40">

          {/* Title */}
          <h1 className="font-brisa text-[64px] md:text-[78px] text-[#F15A24] mb-2">
            Cravings @ Brittany
          </h1>

          {/* Address */}
          <p className="font-jost text-[22px] text-black leading-snug">
            6 McKinley Parkway,
            <br />
            Bonifacio Global City,
            <br />
            Taguig, Metro Manila
          </p>

          {/* Divider */}
          <div className="w-32 h-[5px] bg-[#F15A24] mt-7 mb-12"></div>

          {/* Description */}
          <p className="font-jost text-[22px] leading-relaxed text-black">
            Located in the heart of Bonifacio Global City, Brittany Hotel offers
            an elegant and contemporary venue ideal for corporate events,
            celebrations, and private gatherings. With modern interiors,
            exceptional catering, and a prime BGC location, it provides a
            refined setting for memorable occasions.
          </p>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 h-[500px] lg:h-auto">
        <iframe
          src="https://maps.google.com/maps?q=Brittany%20Hotel%20BGC&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </main>
  );
}