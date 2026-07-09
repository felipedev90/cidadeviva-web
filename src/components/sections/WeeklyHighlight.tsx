import { WeeklyCard } from '@/components/ui/WeeklyCard'
import type { Post } from '@/types/blog'

type PostListProps = {
  posts: Post[]
}

export function WeeklyHighlight({ posts }: PostListProps) {
  const sortedPosts = [...posts].slice(0, 2)

  return (
    <section id="posts" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex flex-col items-center justify-center text-center mb-10 gap-2">
        <p className="text-[#776040] font-sans text-xs font-bold tracking-[0.2em] uppercase">
          As mais lidas
        </p>
        <h2 className="text-ink font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-wide">
          Em alta esta semana
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {sortedPosts.map((post) => (
          <WeeklyCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
