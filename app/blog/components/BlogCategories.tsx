// app/blog/components/BlogCategories.tsx
"use client";

import { useState } from "react";
import { ChevronRight, LayoutGrid } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

interface Props {
  categories: Category[];
}

export default function BlogCategories({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <section className="w-full py-4 md:py-2 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Mobile */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <h2 className="font-jost font-medium text-gray-900">Browse Categories</h2>
        </div>

        {/* Mobile Category Selector */}
        <div className="md:hidden">
          <label htmlFor="category" className="sr-only">Select category</label>
          <div className="relative">
            <select
              id="category"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full appearance-none px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 font-jost text-base focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28]"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
            <ChevronRight size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" />
          </div>
        </div>

        {/* Desktop Categories */}
        <div className="hidden md:flex md:flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F28C28]/10 rounded-lg">
              <LayoutGrid size={18} className="text-[#F28C28]" />
              <span className="text-sm font-medium text-gray-700">Categories</span>
            </div>
            <span className="text-sm text-gray-500">
              {categories.length} topics
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap flex-1 justify-start lg:justify-center">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-lg font-jost text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-[#F28C28] text-white shadow-sm"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-5 py-2 rounded-lg font-jost text-sm font-medium transition-all ${
                  activeCategory === cat.slug
                    ? "bg-[#F28C28] text-white shadow-sm"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="hidden lg:block text-sm text-gray-500">
            {activeCategory === "all" 
              ? "Showing all articles" 
              : `Showing ${categories.find(c => c.slug === activeCategory)?.name} articles`}
          </div>
        </div>

        {/* Category Description - Desktop */}
        {activeCategory !== "all" && categories.find(c => c.slug === activeCategory)?.description && (
          <div className="hidden md:block mt-4 text-center">
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              {categories.find(c => c.slug === activeCategory)?.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}