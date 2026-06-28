import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/types/blog'

export function WeeklyCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col w-full h-125 sm:h-162.5 bg-primary transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
    >
      <div className="relative w-full h-[60%] sm:h-[60%] shrink-0">
        {post.coverImage && (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        )}
      </div>

      <div className="p-6 sm:p-8 flex flex-col h-[40%] sm:h-[40%]">
        <div className="inline-flex px-3 py-1 bg-accent text-ink font-sans text-xs font-bold uppercase tracking-widest mb-2 self-start">
          {post.category}
        </div>

        <h2 className="text-on-dark font-display text-2xl font-bold uppercase leading-tight mb-3 line-clamp-2">
          {post.title}
        </h2>

        <p className="text-on-dark/80 font-sans text-sm leading-relaxed mb-6 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="mt-auto text-accent text-md font-bold uppercase tracking-widest flex items-center gap-1 group-hover:text-accent-hover transition-colors">
          Ler matéria <MoveRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
