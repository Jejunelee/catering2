"use client";

import Image from "next/image";
import Link from "next/link";

export default function Section1() {
  const venues = [
    {
      name: "CRAVINGS MAGINHAWA",
      location: "Quezon City",
      image: "/venues/locations/locations1-1.png",
      link: "venues/maginhawa",
    },
    {
      name: "CRAVINGS ALABANG",
      location: "Alabang",
      image: "/venues/locations/locations1-2.png",
      link: "venues/alabang",
    },
    {
      name: "BRITTANY HOTEL",
      location: "BGC",
      image: "/venues/locations/locations1-3.png",
      link: "venues/brittany-hotel",
    },
    {
      name: "CASA KATIPUNAN",
      location: "Quezon City",
      image: "/venues/locations/locations1-4.png",
      link: "venues/casa-katipunan",
    },
    {
      name: "UNIVERSITY OF THE PHILIPPINES",
      location: "Bonifacio Global City",
      image: "/venues/locations/locations1-5.png",
      link: "venues/up",
    },
    {
      name: "CRAVINGS AT SAVEA",
      location: "Bay City Manila",
      image: "/venues/locations/locations1-6.png",
      link: "venues/savea",
    },
  ];

  return (
    <section className="w-full bg-[#F4F4F4] py-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 px-6">

        {venues.map((venue, i) => (
          <div key={i} className="bg-white shadow-md overflow-hidden">

            {/* Image */}
            <div className="relative w-full h-[320px]">
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Orange Bar */}
            <div className="bg-[#F05A00] text-white flex items-center justify-between px-6 py-5 font-jost">

              <div>
                <h3 className="text-[20px] tracking-wide">
                  {venue.name}
                </h3>
                <p className="text-[15px] opacity-90">
                  {venue.location}
                </p>
              </div>

              <Link
                href={venue.link}
                className="border border-white px-4 py-2 text-[13px] tracking-widest hover:bg-white hover:text-[#F05A00] transition"
              >
                LEARN MORE
              </Link>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}