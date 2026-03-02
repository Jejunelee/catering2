import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#E9D8C9] px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            cravings
          </span>
          <span className="text-lg font-medium text-gray-800 tracking-wide">
            Catering
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
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
        <div>
          <Link
            href="#"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </header>
  );
}