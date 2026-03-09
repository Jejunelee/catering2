// app/blog/components/BlogGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/app/lib/utils";

interface Author {
  id: string;
  name: string;
  avatar: string | null;
  role: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  created_at: string;
  read_time: number;
  blog_authors: Author | null;
  blog_categories: Category | null;
}

interface Props {
  posts: Post[];
}

export default function BlogGrid({ posts }: Props) {
  if (!posts.length) {
    return (
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-brisa text-2xl text-gray-900 mb-2">No articles yet</h3>
          <p className="font-jost text-gray-600">Check back soon for new stories and recipes!</p>
        </div>
      </section>
    );
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Post - Keeping featured post larger */}
        {featuredPost && (
          <div className="mb-10 md:mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={featuredPost.featured_image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10 text-white">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    {featuredPost.blog_categories && (
                      <span className="inline-block bg-[#F28C28] text-white text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                        {featuredPost.blog_categories.name}
                      </span>
                    )}
                    <span className="text-xs md:text-sm text-gray-300">
                      Featured Article
                    </span>
                  </div>
                  
                  <h3 className="font-brisa text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 line-clamp-2 group-hover:text-[#F28C28] transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="hidden sm:block text-sm md:text-base lg:text-lg text-gray-200 mb-3 md:mb-4 line-clamp-2 max-w-3xl">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-300">
                    {featuredPost.blog_authors && (
                      <span className="flex items-center gap-1.5">
                        <User size={14} className="md:w-4 md:h-4 text-gray-400" />
                        <span className="font-medium">{featuredPost.blog_authors.name}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="md:w-4 md:h-4 text-gray-400" />
                      {formatDate(featuredPost.created_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="md:w-4 md:h-4 text-gray-400" />
                      {featuredPost.read_time} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post Grid - Reduced by 50% */}
        {remainingPosts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {remainingPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#F28C28]/30 hover:shadow-md transition-all h-full flex flex-col">
                    {/* Smaller image container */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {post.blog_categories && (
                        <span className="absolute top-2 left-2 bg-[#F28C28] text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                          {post.blog_categories.name}
                        </span>
                      )}
                    </div>

                    {/* Reduced padding and text sizes */}
                    <div className="p-3 md:p-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-jost text-sm md:text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-[#F28C28] transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Smaller metadata */}
                      <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500 border-t border-gray-100 pt-2 mt-1">
                        {post.blog_authors ? (
                          <span className="flex items-center gap-1 font-medium text-gray-700">
                            <User size={10} className="text-gray-400" />
                            {post.blog_authors.name}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-400">
                            <User size={10} />
                            Unknown
                          </span>
                        )}
                        <span className="text-gray-500">{formatDate(post.created_at)}</span>
                      </div>

                      {/* Smaller "Read more" link */}
                      <div className="flex items-center gap-1 text-[#F28C28] text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read more <ArrowRight size={12} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Load More Button - Slightly smaller */}
            <div className="text-center mt-8 md:mt-10">
              <button className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:border-[#F28C28] hover:text-[#F28C28] px-5 py-2.5 rounded-lg font-jost text-sm font-medium transition-colors">
                Load More Articles
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}