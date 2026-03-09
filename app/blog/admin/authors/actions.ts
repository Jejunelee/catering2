// app/blog/admin/authors/actions.ts
'use server'

import { createAdminClient } from '@/app/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function deleteAuthor(id: string) {
  if (!id) {
    throw new Error('Author ID is required')
  }

  const supabase = await createAdminClient()
  
  try {
    // First, check if the author exists
    const { data: author } = await supabase
      .from('blog_authors')
      .select('id, name')
      .eq('id', id)
      .single()

    if (!author) {
      throw new Error('Author not found')
    }

    // Delete the author
    const { error } = await supabase
      .from('blog_authors')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting author:', error)
      throw new Error('Failed to delete author')
    }

    // Revalidate the authors page to show the updated list
    revalidatePath('/blog/admin/authors')
    
  } catch (error) {
    console.error('Error in deleteAuthor:', error)
    throw error
  }
}