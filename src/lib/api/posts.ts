import { apiFetch } from './client'
import { toPost } from './adapters'
import type { RawPost } from './adapters'
import type { Post } from '@/types/blog'

export async function getPosts(params?: { category?: string; page?: string }): Promise<Post[]> {
  const query = new URLSearchParams()
  if (params?.category) {
    query.set('category', params.category)
  }
  if (params?.page) {
    query.set('page', params.page)
  }

  const { posts } = await apiFetch<{ posts: RawPost[] }>(`/api/v1/posts?${query.toString()}`)

  return posts.map(toPost)
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { post } = await apiFetch<{ post: RawPost }>(`/api/v1/posts/${slug}`)

  return toPost(post)
}
