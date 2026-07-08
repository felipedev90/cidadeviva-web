'use client'

import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type DeletePostButtonProps = {
  slug: string
  postTitle: string
}

export function DeletePostButton({ slug, postTitle }: DeletePostButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir o post "${postTitle}"?`)) {
      try {
        await fetch(`/api/posts/${slug}`, { method: 'DELETE' })
        router.refresh()
      } catch (error) {
        console.error('Erro ao excluir o post:', error)
        alert('Ocorreu um erro ao excluir o post. Por favor, tente novamente.')
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="font-sans text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer"
      aria-label={`Excluir post ${postTitle}`}
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  )
}
