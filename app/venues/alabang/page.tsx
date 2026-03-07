"use client";

export default function AlabangPage() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="w-full lg:w-1/2 bg-[#F5F5F5] flex items-center justify-center px-8 lg:px-20 py-16">
        <div className="max-w-xl mb-40">

          {/* Title */}
          <h1 className="font-brisa text-[64px] md:text-[78px] text-[#F15A24] mb-2">
            Cravings Alabang
          </h1>

          {/* Address */}
          <p className="font-jost text-[22px] text-black leading-snug">
            2nd Level, Insular Corporate Centre,
            <br />
            Filinvest City, Alabang, Muntinlupa,
            <br />
            Filinvest City, 1781 Metro Manila
          </p>

          {/* Divider */}
          <div className="w-32 h-[5px] bg-[#F15A24] mt-7 mb-12"></div>

          {/* Description */}
          <p className="font-jost text-[22px] leading-relaxed text-black">
            Cravings Signatures Alabang offers an elegant venue in the heart of
            Filinvest City, perfect for celebrations, corporate events, and
            intimate gatherings. With refined interiors, excellent cuisine, and
            a convenient location, it provides a sophisticated setting for
            memorable occasions.
          </p>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 h-[500px] lg:h-auto">
        <iframe
          src="https://maps.google.com/maps?q=Cravings%20Signatures%20Alabang&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </main>
  );
}