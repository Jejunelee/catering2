// app/blog/admin/authors/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import { Save, X, User } from 'lucide-react'
import Link from 'next/link'
import type { Database } from '@/app/lib/supabase/types'

// Use the specific type from your database
type AuthorInsert = Database['public']['tables']['blog_authors']['Insert']

export default function NewAuthorPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  
  // Initialize with proper types
  const [formData, setFormData] = useState<Partial<AuthorInsert>>({
    name: '',
    avatar: null,
    role: null,
    bio: null
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create a clean object with only the fields we want to insert
      const insertData: AuthorInsert = {
        name: formData.name!, // name is required, and we know it exists because of form validation
        ...(formData.avatar !== undefined ? { avatar: formData.avatar } : {}),
        ...(formData.role !== undefined ? { role: formData.role } : {}),
        ...(formData.bio !== undefined ? { bio: formData.bio } : {})
      }

      // Use type assertion to help TypeScript
      const { error } = await supabase
        .from('blog_authors')
        .insert([insertData] as any) // Temporary workaround

      if (error) throw error

      router.push('/blog/admin/authors')
      router.refresh()
    } catch (error: any) {
      console.error('Error creating author:', error)
      alert(error.message || 'Error creating author. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData({ ...formData, avatar: url || null })
    setAvatarPreview(url || null)
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, role: value || null })
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setFormData({ ...formData, bio: value || null })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/blog/admin/authors"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Cancel and go back"
          >
            <X size={24} />
          </Link>
          <h1 className="font-brisa text-2xl md:text-3xl text-gray-900">Add New Author</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-[#F28C28]">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400"
              placeholder="e.g., John Doe"
            />
          </div>

          {/* Role/Title */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
              Role / Title
            </label>
            <input
              type="text"
              id="role"
              value={formData.role || ''}
              onChange={handleRoleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400"
              placeholder="e.g., Head Chef, Food Writer, Event Coordinator"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label htmlFor="avatar" className="block text-sm font-semibold text-gray-700 mb-2">
              Avatar URL
            </label>
            <input
              type="url"
              id="avatar"
              value={formData.avatar || ''}
              onChange={handleAvatarChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400"
              placeholder="https://example.com/avatar.jpg"
            />
            
            {/* Avatar Preview */}
            {avatarPreview && (
              <div className="mt-3 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Preview</span>
                  <p className="text-xs text-gray-500">Avatar will appear like this</p>
                </div>
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
              Biography
            </label>
            <textarea
              id="bio"
              rows={5}
              value={formData.bio || ''}
              onChange={handleBioChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]/20 focus:border-[#F28C28] text-gray-900 placeholder:text-gray-400"
              placeholder="Write a short biography about the author..."
            />
            <p className="mt-2 text-xs text-gray-500">
              HTML tags allowed: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">&lt;strong&gt;</code>,{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">&lt;em&gt;</code>,{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">&lt;br&gt;</code>
            </p>
          </div>

          {/* Preview Card */}
          {(formData.name || formData.role || formData.bio) && (
            <div className="mt-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Live Preview</h3>
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white border-2 border-gray-200 flex-shrink-0 shadow-sm">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt={formData.name || 'Author'} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F28C28] flex items-center justify-center text-white text-xl font-bold">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : <User size={24} />}
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {formData.name || 'Author Name'}
                  </h4>
                  {formData.role && (
                    <p className="text-sm font-medium text-[#7B3F00] mt-0.5">{formData.role}</p>
                  )}
                  {formData.bio && (
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3 leading-relaxed">
                      {formData.bio.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <Link
              href="/blog/admin/authors"
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
              {loading ? 'Creating...' : 'Create Author'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}