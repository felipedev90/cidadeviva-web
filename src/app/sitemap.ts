import type { MetadataRoute } from 'next'

import { getPosts } from '@/lib/api/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const postPages = posts.items.map((post) => ({
    url: `https://cidadeviva-web.vercel.app/posts/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://cidadeviva-web.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...postPages,
  ]
}
