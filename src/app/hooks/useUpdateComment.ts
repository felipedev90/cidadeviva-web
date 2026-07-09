'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateComment } from '@/lib/actions/comments'

export function useUpdateComment(postId: string, commentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newContent: string) => updateComment(postId, commentId, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })
}
