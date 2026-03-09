// app/blog/admin/categories/actions.ts
'use server'

import { createAdminClient } from '@/app/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function deleteCategory(id: string) {
  if (!id) {
    throw new Error('Category ID is required')
  }

  const supabase = await createAdminClient()
  
  try {
    // First, check if the category exists
    const { data: category } = await supabase
      .from('blog_categories')
      .select('id, name')
      .eq('id', id)
      .single()

    if (!category) {
      throw new Error('Category not found')
    }

    // Delete the category
    // Since the foreign key has ON DELETE SET NULL,
    // any posts in this category will have category_id set to NULL
    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting category:', error)
      throw new Error('Failed to delete category')
    }

    // Revalidate the categories page to show the updated list
    revalidatePath('/blog/admin/categories')
    
  } catch (error) {
    console.error('Error in deleteCategory:', error)
    throw error
  }
}