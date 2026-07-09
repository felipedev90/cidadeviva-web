'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteComment } from '@/lib/actions/comments'

export function useDeleteComment(postId: string, commentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}
