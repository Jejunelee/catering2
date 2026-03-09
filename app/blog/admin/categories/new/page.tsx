// app/blog/admin/categories/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import { Save, X } from 'lucide-react'
import Link from 'next/link'
import type { Database } from '@/app/lib/supabase/types'

type CategoryInsert = Database['public']['tables']['blog_categories']['Insert']

export default function NewCategoryPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CategoryInsert>({
    name: '',
    slug: '',
    description: ''
  })

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('blog_categories')
        .insert([formData] as any)

      if (error) throw error

      router.push('/blog/admin/categories')
      router.refresh()
    } catch (error: any) {
      console.error('Error creating category:', error)
      alert(error.message || 'Error creating category. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/blog/admin/categories"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Cancel and go back"
          >
            <X size={24} />
          </Link>
          <h1 className="font-brisa text-2xl md:text-3xl text-gray-900">New Category</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name <span className="text-[#F28C28]">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={handleNameChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400"
              placeholder="e.g., Cooking Tips"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
              URL Slug <span className="text-[#F28C28]">*</span>
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2.5 text-sm">
                /
              </span>
              <input
                type="text"
                id="slug"
                required
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400"
                placeholder="cooking-tips"
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Preview:</span> /blog/{formData.slug || 'category-name'}
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400"
              placeholder="Briefly describe what this category covers..."
            />
          </div>

          {/* Preview Card */}
          {formData.name && (
            <div className="mt-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Live Preview</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-[#F28C28] text-white text-xs px-2 py-1 rounded-full font-medium">
                    {formData.name || 'Category Name'}
                  </span>
                  <span className="text-xs text-gray-500">Category badge</span>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">URL:</span> /blog/{formData.slug || 'category-name'}
                </p>
                {formData.description && (
                  <p className="text-sm text-gray-700 mt-2 p-3 bg-white rounded-lg border border-gray-100">
                    {formData.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <Link
              href="/blog/admin/categories"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#F28C28] text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#D97C1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Save size={20} />
              {loading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}