// app/blog/admin/authors/DeleteButton.tsx
'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteAuthor } from './actions'

interface DeleteButtonProps {
  authorId: string
  authorName: string
  className?: string
}

export default function DeleteButton({ authorId, authorName, className = '' }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${authorName}? Their posts will be preserved but unlinked.`)) {
      try {
        await deleteAuthor(authorId)
        router.refresh()
      } catch (error) {
        console.error('Failed to delete author:', error)
        alert('Failed to delete author. Please try again.')
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className={`p-2 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 ${className}`}
      title="Delete author"
    >
      <Trash2 size={18} />
    </button>
  )
}