"use client";

export default function MaginhawaPage() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL */}
      <div className="w-full lg:w-1/2 bg-[#F5F5F5] flex items-center justify-center px-8 lg:px-20 py-16">
        <div className="max-w-xl mb-40">

          {/* Title */}
          <h1 className="font-brisa text-[64px] md:text-[78px] text-[#F15A24] mb-2">
            Cravings Maginhawa
          </h1>

          {/* Address */}
          <p className="font-jost text-[22px] text-black leading-snug">
            28 Maginhawa, Diliman, Quezon City,
            <br />
            1101 Kalakhang Maynila
          </p>

          {/* Divider */}
          <div className="w-32 h-[5px] bg-[#F15A24] mt-7 mb-12"></div>

          {/* Description */}
          <p className="font-jost text-[22px] leading-relaxed text-black">
            Ideal for intimate gatherings and business meetings, Cravings
            Maginhawa offers a warm, comfortable space perfect for small events.
            With a relaxed ambiance, great food, and a convenient location, it’s
            a welcoming venue for meaningful conversations and focused meetings.
          </p>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 h-[500px] lg:h-auto">
        <iframe
          src="https://www.google.com/maps?q=Cravings+Dessert+Bar+Maginhawa&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </main>
  );
}