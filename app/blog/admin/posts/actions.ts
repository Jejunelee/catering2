// app/blog/admin/posts/actions.ts
'use server'

import { createAdminClient } from '@/app/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function deletePost(id: string) {
  if (!id) {
    throw new Error('Post ID is required')
  }

  const supabase = await createAdminClient()
  
  try {
    // First, check if the post exists
    const { data: post } = await supabase
      .from('blog_posts')
      .select('id, title')
      .eq('id', id)
      .single()

    if (!post) {
      throw new Error('Post not found')
    }

    // Delete the post
    // This will completely remove the post from the database
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting post:', error)
      throw new Error('Failed to delete post')
    }

    // Revalidate the posts page to show the updated list
    revalidatePath('/blog/admin/posts')
    
  } catch (error) {
    console.error('Error in deletePost:', error)
    throw error
  }
}