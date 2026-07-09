'use client'

import { useQuery } from '@tanstack/react-query'

import { getComments } from '@/lib/actions/comments'
import type { Comment, Paginated } from '@/types/blog'

export function useComments(postId: string, initialData: Paginated<Comment>) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    initialData,
  })
}
