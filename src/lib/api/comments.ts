import type { Comment, Paginated } from '@/types/blog'

import type { RawComment } from './adapters'
import { toComment } from './adapters'
import { apiFetch } from './client'

type RawCommentsResponse = {
  data: {
    comments: RawComment[]
  }
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export async function getCommentsByPost(postId: string): Promise<Paginated<Comment>> {
  const result = await apiFetch<RawCommentsResponse>(`/api/v1/posts/${postId}/comments`)

  return {
    items: result.data.comments.map(toComment),
    ...result.pagination,
  }
}

export async function createComment(postId: string, content: string): Promise<Comment> {
  const result = await apiFetch<{ data: { comment: RawComment } }>(
    `/api/v1/posts/${postId}/comments`,
    {
      method: 'POST',
      body: JSON.stringify({ content }),
    },
  )

  return toComment(result.data.comment)
}

export async function updateComment(
  postId: string,
  commentId: string,
  content: string,
): Promise<Comment> {
  const result = await apiFetch<{ data: { comment: RawComment } }>(
    `/api/v1/posts/${postId}/comments/${commentId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    },
  )
  return toComment(result.data.comment)
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  await apiFetch(`/api/v1/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
  })
}
