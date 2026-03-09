// app/blog/admin/posts/[id]/edit/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import { Save, ArrowLeft, Eye, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import type { Database } from '@/app/lib/supabase/types'

type Author = Database['public']['tables']['blog_authors']['Row']
type Category = Database['public']['tables']['blog_categories']['Row']
type PostUpdate = Database['public']['tables']['blog_posts']['Update']

interface Props {
  params: Promise<{
    id: string
  }>
}

export default function EditPostPage({ params }: Props) {
  // Unwrap params with React.use() for client components
  const { id } = React.use(params)
  
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [authors, setAuthors] = useState<Author[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [imageError, setImageError] = useState(false)
  
  const [formData, setFormData] = useState<PostUpdate>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_id: '',
    category_id: '',
    read_time: 5,
    published: false
  })

  // Fetch post data, authors, and categories
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true)
      
      const [postResult, authorsResult, categoriesResult] = await Promise.all([
        supabase.from('blog_posts').select('*').eq('id', id).single(),
        supabase.from('blog_authors').select('*').order('name'),
        supabase.from('blog_categories').select('*').order('name')
      ])
      
      // Add type assertions
      const typedPostResult = postResult as { data: any, error: any }
      const typedAuthorsResult = authorsResult as { data: any[], error: any }
      const typedCategoriesResult = categoriesResult as { data: any[], error: any }
      
      if (typedPostResult.data) {
        setFormData(typedPostResult.data)
        setImageError(false)
      } else {
        // Post not found, redirect to posts list
        router.push('/blog/admin/posts')
      }
      
      if (typedAuthorsResult.data) setAuthors(typedAuthorsResult.data)
      if (typedCategoriesResult.data) setCategories(typedCategoriesResult.data)
      
      setFetching(false)
    }
    
    fetchData()
  }, [id, supabase, router])

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.author_id || !formData.category_id) {
        throw new Error('Please select both an author and a category')
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(formData)
        .eq('id', id)

      if (error) throw error

      router.push('/blog/admin/posts')
      router.refresh()
    } catch (error: any) {
      console.error('Error updating post:', error)
      alert(error.message || 'Error updating post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="px-4 sm:px-0">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#F28C28] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/blog/admin/posts"
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Go back to posts"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="font-brisa text-2xl md:text-3xl text-gray-900">Edit Post</h1>
          <p className="text-gray-600 mt-1">Update your blog content</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Post Title <span className="text-[#F28C28]">*</span>
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title || ''}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400 text-lg"
                placeholder="e.g., 10 Tips for Better Home Cooking"
              />
              
              {/* Slug Preview */}
              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700 mb-1 block">URL Slug</label>
                <div className="flex items-center">
                  <span className="text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-sm">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900"
                    placeholder="10-tips-better-cooking"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Content <span className="text-[#F28C28]">*</span>
              </label>
              <textarea
                id="content"
                required
                rows={15}
                value={formData.content || ''}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400 font-mono text-sm"
                placeholder="<h2>Introduction</h2>
<p>Your content here...</p>"
              />
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium">HTML supported:</span> h1-h6, p, strong, em, ul, ol, li, blockquote, img, a
              </p>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2">
                Excerpt <span className="text-[#F28C28]">*</span>
              </label>
              <textarea
                id="excerpt"
                required
                rows={3}
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400"
                placeholder="Brief summary of your post (appears in blog listings)"
              />
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Publish Settings</h3>
              
              {/* Status */}
              <div className="mb-4">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={formData.published || false}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="h-4 w-4 text-[#F28C28] focus:ring-[#F28C28] border-gray-300 rounded"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Published</span>
                    <p className="text-xs text-gray-500">Post is visible to visitors</p>
                  </div>
                </label>
              </div>

              {/* Read Time */}
              <div>
                <label htmlFor="read_time" className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time (minutes)
                </label>
                <input
                  type="number"
                  id="read_time"
                  min="1"
                  value={formData.read_time || 5}
                  onChange={(e) => setFormData({...formData, read_time: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900"
                />
              </div>
            </div>

            {/* Author & Category */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Attribution</h3>
              
              {/* Author */}
              <div className="mb-4">
                <label htmlFor="author_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Author <span className="text-[#F28C28]">*</span>
                </label>
                <select
                  id="author_id"
                  required
                  value={formData.author_id || ''}
                  onChange={(e) => setFormData({...formData, author_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900"
                >
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>{author.name}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-[#F28C28]">*</span>
                </label>
                <select
                  id="category_id"
                  required
                  value={formData.category_id || ''}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Featured Image</h3>
              
              <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL <span className="text-[#F28C28]">*</span>
              </label>
              <input
                type="url"
                id="featured_image"
                required
                value={formData.featured_image || ''}
                onChange={(e) => {
                  setFormData({...formData, featured_image: e.target.value})
                  setImageError(false)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900"
                placeholder="https://example.com/image.jpg"
              />
              
              {/* Image Preview */}
              {formData.featured_image && !imageError && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <img 
                      src={formData.featured_image} 
                      alt="Featured image preview" 
                      className="object-cover w-full h-full"
                      onError={() => setImageError(true)}
                    />
                  </div>
                </div>
              )}
              
              {imageError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <ImageIcon size={16} />
                    Unable to load image. Please check the URL.
                  </p>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F28C28] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#D97C1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base"
              >
                <Save size={20} />
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
              
              <Link
                href="/blog/admin/posts"
                className="w-full px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}