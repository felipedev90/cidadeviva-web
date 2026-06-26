import type { Post } from '@/types/blog'
import type { Paginated } from '@/types/blog'

import type { RawPost } from './adapters'
import { toPost } from './adapters'
import { apiFetch } from './client'

export async function getPosts(params?: {
  category?: string
  page?: string
}): Promise<Paginated<Post>> {
  const query = new URLSearchParams()
  if (params?.category) {
    query.set('category', params.category)
  }
  if (params?.page) {
    query.set('page', params.page)
  }

  const {
    data: { posts },
    pagination,
  } = await apiFetch<{
    data: { posts: RawPost[] }
    pagination: { total: number; page: number; limit: number; totalPages: number }
  }>(`/api/v1/posts?${query.toString()}`)

  return {
    items: posts.map(toPost),
    ...pagination,
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const {
    data: { post },
  } = await apiFetch<{ data: { post: RawPost } }>(`/api/v1/posts/${slug}`)

  return toPost(post)
}
