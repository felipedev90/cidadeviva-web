'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createComment } from '@/lib/actions/comments'

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}
