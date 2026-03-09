// app/blog/admin/categories/page.tsx
import { createAdminClient } from '@/app/lib/supabase/admin'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import DeleteButton from './DeleteButton'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export default async function AdminCategoriesPage() {
  const supabase = await createAdminClient()
  
  const { data: categories } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name')

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-brisa text-2xl md:text-3xl text-gray-900">Categories</h1>
        <Link
          href="/blog/admin/categories/new"
          className="bg-[#F28C28] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#D97C1A] transition-colors text-sm md:text-base"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">New Category</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* Categories Grid - Mobile */}
      <div className="sm:hidden space-y-3">
        {categories && categories.length > 0 ? (
          categories.map((category: Category) => (
            <div key={category.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">/{category.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/blog/admin/categories/${category.id}/edit`}
                    className="p-2 text-gray-500 hover:text-[#F28C28] transition-colors rounded-lg hover:bg-gray-100"
                    title="Edit category"
                  >
                    <Pencil size={18} />
                  </Link>
                  <DeleteButton 
                    categoryId={category.id} 
                    categoryName={category.name} 
                  />
                </div>
              </div>
              {category.description && (
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">{category.description}</p>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500 mb-3">No categories yet</p>
            <Link
              href="/blog/admin/categories/new"
              className="inline-flex items-center gap-2 text-[#F28C28] hover:text-[#D97C1A] font-medium"
            >
              <Plus size={18} />
              Create your first category
            </Link>
          </div>
        )}
      </div>

      {/* Categories Table - Desktop */}
      <div className="hidden sm:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories && categories.length > 0 ? (
              categories.map((category: Category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      /{category.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 line-clamp-2">
                      {category.description || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/admin/categories/${category.id}/edit`}
                        className="p-2 text-gray-500 hover:text-[#F28C28] transition-colors rounded-lg hover:bg-gray-100"
                        title="Edit category"
                      >
                        <Pencil size={18} />
                      </Link>
                      <DeleteButton 
                        categoryId={category.id} 
                        categoryName={category.name} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <p className="text-gray-500 mb-3">No categories yet</p>
                  <Link
                    href="/blog/admin/categories/new"
                    className="inline-flex items-center gap-2 text-[#F28C28] hover:text-[#D97C1A] font-medium"
                  >
                    <Plus size={18} />
                    Create your first category
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}