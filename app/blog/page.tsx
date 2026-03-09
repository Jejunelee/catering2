// app/blog/page.tsx
import { createClient } from '@/app/lib/supabase/server'
import BlogHeader from './components/BlogHeader'
import BlogGrid from './components/BlogGrid'
import BlogCategories from './components/BlogCategories'
import BlogNewsletter from './components/BlogNewsletter'

export default async function BlogPage() {
  const supabase = await createClient()
  
  // Fetch blog posts with author and category
  const { data: posts } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_authors (*),
      blog_categories (*)
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })

  // Fetch categories
  const { data: categories } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name')

  return (
    <main className="w-full bg-white">
      <BlogHeader />
      <BlogCategories categories={categories || []} />
      <BlogGrid posts={posts || []} />
    </main>
  )
}