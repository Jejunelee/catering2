// lib/supabase/types.ts
export type Database = {
  public: {
    tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image: string
          published: boolean
          created_at: string
          updated_at: string
          author_id: string
          category_id: string
          read_time: number
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image: string
          published?: boolean
          created_at?: string
          updated_at?: string
          author_id: string
          category_id: string
          read_time: number
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          featured_image?: string
          published?: boolean
          created_at?: string
          updated_at?: string
          author_id?: string
          category_id?: string
          read_time?: number
        }
      }
      blog_authors: {
        Row: {
          id: string
          name: string
          avatar: string | null
          bio: string | null
          role: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          avatar?: string | null
          bio?: string | null
          role?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar?: string | null
          bio?: string | null
          role?: string | null
          created_at?: string
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
    }
  }
}

// Custom types for joined queries
export type BlogPostWithRelations = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  published: boolean
  created_at: string
  updated_at: string
  author_id: string
  category_id: string
  read_time: number
  blog_authors: {
    id: string
    name: string
    avatar: string | null
    bio: string | null
    role: string | null
    created_at: string
  } | null
  blog_categories: {
    id: string
    name: string
    slug: string
    description: string | null
    created_at: string
  } | null
}

export type BlogAuthor = Database['public']['tables']['blog_authors']['Row']
export type BlogCategory = Database['public']['tables']['blog_categories']['Row']
export type BlogPost = Database['public']['tables']['blog_posts']['Row']