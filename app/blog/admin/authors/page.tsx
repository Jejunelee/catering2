// app/blog/admin/authors/page.tsx
import { createAdminClient } from '@/app/lib/supabase/admin'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import Image from 'next/image'
import DeleteButton from './DeleteButton'

interface Author {
  id: string
  name: string
  role: string | null
  bio: string | null
  avatar: string | null
  created_at: string
}

export default async function AdminAuthorsPage() {
  const supabase = await createAdminClient()
  
  const { data: authors } = await supabase
    .from('blog_authors')
    .select('*')
    .order('name')

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-brisa text-2xl md:text-3xl text-gray-900">Authors</h1>
        <Link
          href="/blog/admin/authors/new"
          className="bg-[#F28C28] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#D97C1A] transition-colors text-sm md:text-base"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">New Author</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {/* Authors Grid - Mobile */}
      <div className="sm:hidden space-y-3">
        {authors && authors.length > 0 ? (
          authors.map((author: Author) => (
            <div key={author.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F28C28]/10 flex items-center justify-center text-[#F28C28] font-medium">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900">{author.name}</h3>
                  {author.role && (
                    <p className="text-sm text-[#7B3F00] mt-0.5">{author.role}</p>
                  )}
                  {author.bio && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{author.bio}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/blog/admin/authors/${author.id}/edit`}
                    className="p-2 text-gray-500 hover:text-[#F28C28] transition-colors"
                  >
                    <Pencil size={18} />
                  </Link>
                  <DeleteButton authorId={author.id} authorName={author.name} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500 mb-3">No authors yet</p>
            <Link
              href="/blog/admin/authors/new"
              className="inline-flex items-center gap-2 text-[#F28C28] hover:text-[#D97C1A] font-medium"
            >
              <Plus size={18} />
              Create your first author
            </Link>
          </div>
        )}
      </div>

      {/* Authors Table - Desktop */}
      <div className="hidden sm:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bio
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {authors && authors.length > 0 ? (
              authors.map((author: Author) => (
                <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        {author.avatar ? (
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#F28C28]/10 flex items-center justify-center text-[#F28C28] font-medium">
                            {author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {author.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {author.role || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 line-clamp-2">
                      {author.bio || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/admin/authors/${author.id}/edit`}
                        className="p-2 text-gray-500 hover:text-[#F28C28] transition-colors rounded-lg hover:bg-gray-100"
                        title="Edit author"
                      >
                        <Pencil size={18} />
                      </Link>
                      <DeleteButton authorId={author.id} authorName={author.name} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <p className="text-gray-500 mb-3">No authors yet</p>
                  <Link
                    href="/blog/admin/authors/new"
                    className="inline-flex items-center gap-2 text-[#F28C28] hover:text-[#D97C1A] font-medium"
                  >
                    <Plus size={18} />
                    Create your first author
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