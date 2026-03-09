// app/blog/admin/posts/page.tsx
import { createAdminClient } from '@/app/lib/supabase/admin'
import Link from 'next/link'
import { Plus, Pencil, Eye, Calendar, User, BookOpen } from 'lucide-react'
import DeleteButton from './DeleteButton'

interface Post {
  id: string
  title: string
  slug: string
  published: boolean
  created_at: string
  blog_authors: { name: string } | null
  blog_categories: { name: string } | null
}

export default async function AdminPostsPage() {
  const supabase = await createAdminClient()
  
  const { data: posts } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_authors (name),
      blog_categories (name)
    `)
    .order('created_at', { ascending: false })

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="font-brisa text-2xl md:text-3xl text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog content</p>
        </div>
        <Link
          href="/blog/admin/posts/new"
          className="bg-[#F28C28] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#D97C1A] transition-colors text-sm md:text-base self-start sm:self-auto"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">New Post</span>
          <span className="sm:hidden">Create</span>
        </Link>
      </div>

      {/* Posts Grid - Mobile */}
      <div className="sm:hidden space-y-3">
        {posts && posts.length > 0 ? (
          posts.map((post: Post) => (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 line-clamp-2 flex-1 pr-2">
                  {post.title}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                  post.published 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              
              <div className="space-y-1.5 mb-3">
                {post.blog_authors?.name && (
                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <User size={12} className="text-gray-400" />
                    {post.blog_authors.name}
                  </p>
                )}
                {post.blog_categories?.name && (
                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <BookOpen size={12} className="text-gray-400" />
                    {post.blog_categories.name}
                  </p>
                )}
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Calendar size={12} className="text-gray-400" />
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="p-2 text-gray-500 hover:text-[#F28C28] rounded-lg hover:bg-gray-100 transition-colors"
                  title="View post"
                >
                  <Eye size={18} />
                </Link>
                <Link
                  href={`/blog/admin/posts/${post.id}/edit`}
                  className="p-2 text-gray-500 hover:text-[#F28C28] rounded-lg hover:bg-gray-100 transition-colors"
                  title="Edit post"
                >
                  <Pencil size={18} />
                </Link>
                <DeleteButton 
                  postId={post.id} 
                  postTitle={post.title} 
                />
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-3">No posts yet</p>
            <Link
              href="/blog/admin/posts/new"
              className="inline-flex items-center gap-2 text-[#F28C28] hover:text-[#D97C1A] font-medium"
            >
              <Plus size={18} />
              Create your first post
            </Link>
          </div>
        )}
      </div>

      {/* Posts Table - Desktop */}
      <div className="hidden sm:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts && posts.length > 0 ? (
              posts.map((post: Post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {post.blog_authors?.name || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {post.blog_categories?.name || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      post.published 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-gray-500 hover:text-[#F28C28] rounded-lg hover:bg-gray-100 transition-colors"
                        title="View post"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/blog/admin/posts/${post.id}/edit`}
                        className="p-2 text-gray-500 hover:text-[#F28C28] rounded-lg hover:bg-gray-100 transition-colors"
                        title="Edit post"
                      >
                        <Pencil size={18} />
                      </Link>
                      <DeleteButton 
                        postId={post.id} 
                        postTitle={post.title} 
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-3">No posts yet</p>
                  <Link
                    href="/blog/admin/posts/new"
                    className="inline-flex items-center gap-2 text-[#F28C28] hover:text-[#D97C1A] font-medium"
                  >
                    <Plus size={18} />
                    Create your first post
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