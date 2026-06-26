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
