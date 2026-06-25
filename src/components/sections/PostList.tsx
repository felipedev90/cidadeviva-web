import { PostCard } from '@/components/ui/PostCard'
import type { Post } from '@/types/blog'
import { HERO_LINKS } from '@/data/hero'
import Link from 'next/link'

type PostListProps = {
  posts: Post[]
  activeCategory?: string | undefined
}

const ALL_LINKS = [{ label: 'Todos', href: '/', category: undefined }, ...HERO_LINKS]

export function PostList({ posts, activeCategory }: PostListProps) {
  return (
    <section id="posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="font-display uppercase flex items-center justify-between gap-4">
        <div>
          <p className="text-accent-hover/90">Atualizado toda semana</p>
          <h2 className="text-ink text-5xl font-bold leading-relaxed tracking-wide">
            Últimas de Jundiaí
          </h2>
        </div>
        <div className="flex gap-8 mt-6">
          {ALL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                activeCategory === link.category
                  ? 'border-b-4 border-accent-hover text-ink font-bold'
                  : 'bg-surface/10'
              } font-sans font-bold text-sm tracking-wider uppercase hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-1">
        <span className="text-ink/80 font-sans text-sm tracking-wide text-end">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} encontrados
        </span>
      </div>
      <div className="mt-6">
        <p className="text-on-dark/80 font-sans text-sm tracking-wide">
          {posts.length === 0 && 'Nenhum post encontrado para esta categoria.'}
        </p>
      </div>
      <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 border-t border-border pt-10 mt-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
