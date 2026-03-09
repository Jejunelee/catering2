// app/blog/admin/categories/DeleteButton.tsx
'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteCategory } from './actions'

interface DeleteButtonProps {
  categoryId: string
  categoryName: string
  className?: string
}

export default function DeleteButton({ categoryId, categoryName, className = '' }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete the category "${categoryName}"? Posts in this category will be preserved but unlinked.`)) {
      try {
        await deleteCategory(categoryId)
        router.refresh()
      } catch (error) {
        console.error('Failed to delete category:', error)
        alert('Failed to delete category. Please try again.')
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className={`p-2 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 ${className}`}
      title="Delete category"
    >
      <Trash2 size={18} />
    </button>
  )
}