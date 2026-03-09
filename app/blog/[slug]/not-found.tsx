// app/blog/[slug]/not-found.tsx
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BlogNotFound() {
  return (
    <main className="w-full bg-white min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-brisa text-6xl md:text-8xl text-[#7B3F00] mb-4">404</h1>
        <h2 className="font-jost text-2xl md:text-3xl text-gray-900 mb-3">
          Article Not Found
        </h2>
        <p className="font-jost text-gray-600 mb-6 max-w-md mx-auto">
          Sorry, the blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 bg-[#F28C28] text-white px-6 py-3 rounded-lg font-jost font-medium hover:bg-[#E07B17] transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>
      </div>
    </main>
  )
}