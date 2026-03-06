import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-[#FFEFE0] px-8 py-6">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Cravings Catering Logo"
            width={220} // adjust based on your logo size
            height={83}
            priority
            className="object-contain"
          />
        </Link>

        {/* Right Side (Navigation + Contact) */}
        <div className="flex items-center gap-8">
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-md font-medium text-black">
            <Link href="#" className="hover:text-orange-500 transition">
              Events & Catering
            </Link>
            <Link href="#" className="hover:text-orange-500 transition">
              Food Trays
            </Link>
            <Link href="#" className="hover:text-orange-500 transition">
              Gifts
            </Link>
            <Link href="#" className="hover:text-orange-500 transition">
              Venues
            </Link>
            <Link href="#" className="hover:text-orange-500 transition">
              Blogs & Articles
            </Link>
          </nav>

          {/* Contact Button */}
          <Link
            href="#"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
          >
            Contact Us
          </Link>

        </div>
      </div>
    </header>
  );
}