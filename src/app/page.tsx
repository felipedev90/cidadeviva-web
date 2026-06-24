import { Hero } from '@/components/sections/Hero'
import { PostList } from '@/components/sections/PostList'

import { getPosts } from '@/lib/api/posts'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const params = await searchParams
  const posts = await getPosts(params)

  return (
    <main>
      <Hero />
      <PostList posts={posts} />
    </main>
  )
}
