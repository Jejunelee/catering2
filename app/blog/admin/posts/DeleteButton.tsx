// app/blog/admin/posts/DeleteButton.tsx
'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deletePost } from './actions'

interface DeleteButtonProps {
  postId: string
  postTitle: string
  className?: string
}

export default function DeleteButton({ postId, postTitle, className = '' }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to permanently delete "${postTitle}"? This action cannot be undone.`)) {
      try {
        await deletePost(postId)
        router.refresh()
      } catch (error) {
        console.error('Failed to delete post:', error)
        alert('Failed to delete post. Please try again.')
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className={`p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
      title="Delete post"
    >
      <Trash2 size={18} />
    </button>
  )
}