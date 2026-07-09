import Image from 'next/image'
import Link from 'next/link'

import { formattedDate } from '@/lib/formattedDate/formattedDate'
import type { Post } from '@/types/blog'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group block w-full max-w-md bg-surface border border-border transition-all hover:shadow-md"
    >
      <div className="relative w-full h-64">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        {post.category && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-accent text-ink font-sans text-xs font-bold uppercase tracking-wider">
            {post.category}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="text-[#6e6a60] font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span>{formattedDate(post.createdAt)}</span>
        </div>

        <h2 className="text-ink font-display text-2xl font-bold uppercase leading-tight">
          {post.title}
        </h2>
        <p className="text-body font-sans text-base leading-relaxed">{post.excerpt}</p>

        <hr className="border-border my-2" />

        {post.author && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-ink font-sans font-bold text-sm">{post.author.name}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
