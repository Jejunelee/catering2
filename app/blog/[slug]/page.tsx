// app/blog/[slug]/page.tsx
import { createClient } from '@/app/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/app/lib/utils'
import type { BlogPostWithRelations } from '@/app/lib/supabase/types'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  
  const supabase = await createClient()
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_authors (*),
      blog_categories (*)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) {
    notFound()
  }

  const typedPost = post as unknown as BlogPostWithRelations

  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_authors (*),
      blog_categories (*)
    `)
    .eq('published', true)
    .eq('category_id', typedPost.category_id)
    .neq('id', typedPost.id)
    .limit(3)
    .order('created_at', { ascending: false })

  const typedRelatedPosts = (relatedPosts || []) as unknown as BlogPostWithRelations[]

  return (
    <main className="bg-white">
      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1 text-[#F28C28] hover:text-[#D97C1A] font-medium transition-colors"
        >
          <ArrowLeft size={18} className="text-[#F28C28] group-hover:text-[#D97C1A]" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Category */}
        {typedPost.blog_categories && (
          <span className="inline-block bg-[#F28C28] text-white text-sm px-3 py-1 rounded-full mb-4 font-medium">
            {typedPost.blog_categories.name}
          </span>
        )}

        {/* Title */}
        <h1 className="font-jost text-3xl md:text-5xl text-gray-900 mb-4 leading-tight">
          {typedPost.title}
        </h1>

        {/* Meta Info - Darker colors for light background */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          {typedPost.blog_authors && (
            <span className="flex items-center gap-2 text-gray-700">
              <User size={18} className="text-gray-600" />
              <span className="font-medium">{typedPost.blog_authors.name}</span>
            </span>
          )}
          <span className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} className="text-gray-500" />
            {formatDate(typedPost.created_at)}
          </span>
          <span className="flex items-center gap-2 text-gray-600">
            <Clock size={18} className="text-gray-500" />
            {typedPost.read_time} min read
          </span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={typedPost.featured_image}
            alt={typedPost.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Author Bio - Darker background for contrast */}
      {typedPost.blog_authors && (
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="flex items-center gap-4 p-5 bg-gray-100 rounded-xl border border-gray-200">
            {typedPost.blog_authors.avatar && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                <Image
                  src={typedPost.blog_authors.avatar}
                  alt={typedPost.blog_authors.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900 text-lg">{typedPost.blog_authors.name}</p>
              {typedPost.blog_authors.role && (
                <p className="text-sm text-[#7B3F00] font-medium mb-1">{typedPost.blog_authors.role}</p>
              )}
              {typedPost.blog_authors.bio && (
                <p className="text-sm text-gray-700 leading-relaxed">{typedPost.blog_authors.bio}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <article 
          className="prose prose-lg max-w-none
            prose-headings:font-brisa prose-headings:text-gray-900 prose-headings:font-semibold
            prose-p:font-jost prose-p:text-gray-800 prose-p:leading-relaxed
            prose-strong:text-[#7B3F00] prose-strong:font-semibold
            prose-a:text-[#F28C28] prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#D97C1A] prose-a:font-medium
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:border-l-4 prose-blockquote:border-l-[#F28C28] prose-blockquote:bg-gray-50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-800 prose-blockquote:font-jost prose-blockquote:italic
            prose-li:font-jost prose-li:text-gray-800
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6"
          dangerouslySetInnerHTML={{ __html: typedPost.content }}
        />
      </div>

      {/* Related Posts */}
      {typedRelatedPosts.length > 0 && (
        <section className="mt-16 py-12 bg-gray-100 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-brisa text-2xl md:text-3xl text-gray-900 text-center mb-3">
              More Articles You Might Like
            </h2>
            <p className="text-center text-gray-600 mb-8 font-jost">
              Continue reading from the same category
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {typedRelatedPosts.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={related.featured_image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    {related.blog_categories && (
                      <span className="text-[#F28C28] text-xs font-semibold uppercase tracking-wider">
                        {related.blog_categories.name}
                      </span>
                    )}
                    <h3 className="font-jost font-semibold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-[#F28C28] transition-colors text-lg">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{formatDate(related.created_at)}</span>
                      <span>•</span>
                      <span>{related.read_time} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-[#F28C28] hover:text-[#D97C1A] font-medium transition-colors"
              >
                View all articles
                <ArrowLeft size={16} className="rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}