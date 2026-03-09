// app/blog/admin/page.tsx
import { createAdminClient } from '@/app/lib/supabase/admin'
import { FileText, Users, BookOpen, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface RecentPost {
  id: string
  title: string
  published: boolean
  created_at: string
  blog_authors: { name: string } | null
  blog_categories: { name: string } | null
}

export default async function AdminDashboard() {
  const supabase = await createAdminClient()

  // Get stats with proper typing
  const postsCountResult = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
  
  const authorsCountResult = await supabase
    .from('blog_authors')
    .select('*', { count: 'exact', head: true })
  
  const categoriesCountResult = await supabase
    .from('blog_categories')
    .select('*', { count: 'exact', head: true })

  const postsCount = postsCountResult.count || 0
  const authorsCount = authorsCountResult.count || 0
  const categoriesCount = categoriesCountResult.count || 0

  // Get recent posts with proper typing
  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_authors (
        name
      ),
      blog_categories (
        name
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { 
      name: 'Total Posts', 
      value: postsCount, 
      icon: FileText, 
      href: '/blog/admin/posts', 
      color: 'bg-[#F28C28]',
      bgLight: 'bg-[#F28C28]/10',
      textColor: 'text-[#D97C1A]'
    },
    { 
      name: 'Authors', 
      value: authorsCount, 
      icon: Users, 
      href: '/blog/admin/authors', 
      color: 'bg-green-600',
      bgLight: 'bg-green-50',
      textColor: 'text-green-700'
    },
    { 
      name: 'Categories', 
      value: categoriesCount, 
      icon: BookOpen, 
      href: '/blog/admin/categories', 
      color: 'bg-purple-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-jost text-2xl md:text-3xl text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your blog content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-[#F28C28]/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-400 group-hover:text-[#F28C28] mt-2 transition-colors">
                    View all <ArrowRight size={14} />
                  </span>
                </div>
                <div className={`${stat.bgLight} p-3.5 rounded-xl`}>
                  <Icon className={stat.textColor} size={24} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <h2 className="font-jost font-semibold text-gray-900">Recent Posts</h2>
            <Link
              href="/blog/admin/posts"
              className="text-sm text-[#F28C28] hover:text-[#D97C1A] font-medium flex items-center gap-1"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentPosts && recentPosts.length > 0 ? (
            recentPosts.map((post: RecentPost) => (
              <div key={post.id} className="px-6 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      {post.blog_authors?.name && (
                        <>
                          <span className="text-gray-600">By {post.blog_authors.name}</span>
                          <span className="text-gray-300">•</span>
                        </>
                      )}
                      {post.blog_categories?.name && (
                        <>
                          <span className="text-gray-600">{post.blog_categories.name}</span>
                          <span className="text-gray-300">•</span>
                        </>
                      )}
                      <span className="text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      post.published 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <Link
                      href={`/blog/admin/posts/${post.id}`}
                      className="p-2 text-gray-400 hover:text-[#F28C28] rounded-lg hover:bg-gray-100 transition-colors"
                      title="Edit post"
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p className="text-gray-600 mb-3">No posts yet</p>
              <Link
                href="/blog/admin/posts/new"
                className="inline-flex items-center gap-2 text-[#F28C28] hover:text-[#D97C1A] font-medium"
              >
                Create your first post <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/blog/admin/posts/new"
          className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-[#F28C28]/30 hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-[#F28C28]"
        >
          <FileText size={18} />
          Create New Post
        </Link>
        <Link
          href="/blog/admin/authors/new"
          className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-[#F28C28]/30 hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-[#F28C28]"
        >
          <Users size={18} />
          Create New Author
        </Link>
        <Link
          href="/blog/admin/categories/new"
          className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-[#F28C28]/30 hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-[#F28C28]"
        >
          <BookOpen size={18} />
          Create New Category
        </Link>
        <Link
          href="/blog"
          className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-[#F28C28]/30 hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-[#F28C28]"
          target="_blank"
        >
          <Eye size={18} />
          View Blog
        </Link>
      </div>
    </div>
  )
}