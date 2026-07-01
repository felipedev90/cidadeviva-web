import { About } from '@/components/sections/About'
import { Explore } from '@/components/sections/Explore'
import { Hero } from '@/components/sections/Hero'
import { PostList } from '@/components/sections/PostList'
import { SerraHighlight } from '@/components/sections/SerraHighlight'
import { WeeklyHighlight } from '@/components/sections/WeeklyHighlight'
import { getPosts } from '@/lib/api/posts'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const params = await searchParams
  const [{ items: posts, totalPages }, { items: weeklyPosts }] = await Promise.all([
    getPosts(params),
    getPosts(),
  ])

  return (
    <main>
      <Hero />
      <PostList
        posts={posts}
        activeCategory={params.category}
        totalPages={totalPages}
        currentPage={Number(params.page) || 1}
      />
      <SerraHighlight />
      <WeeklyHighlight posts={weeklyPosts} />
      <Explore />
      <About />
    </main>
  )
}
