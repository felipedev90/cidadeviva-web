import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'

import { CommentsSection } from '@/components/sections/CommentSection'
import { HERO_IMAGE } from '@/data/hero'
import { getAuthToken } from '@/lib/api/auth'
import { getCommentsByPost } from '@/lib/api/comments'
import { getPostBySlug } from '@/lib/api/posts'
import { getUser } from '@/lib/api/user'
import { formattedDate } from '@/lib/formattedDate/formattedDate'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  const comments = await getCommentsByPost(post.id)

  const token = await getAuthToken()
  const user = token ? await getUser() : null

  return (
    <main className="w-full">
      <header className="relative flex min-h-[70vh] w-full flex-col justify-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-ink/50" />
          <Image
            src={post.coverImage || HERO_IMAGE.src}
            alt={post.title || HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-5xl px-6 flex flex-col items-start">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 font-sans text-sm tracking-wider text-on-dark/80 transition-colors hover:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para a home
          </Link>

          {post.category && (
            <div className="mb-4 inline-block bg-accent px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-ink">
              {post.category}
            </div>
          )}

          <h1 className="mb-8 font-display text-4xl uppercase leading-tight text-on-dark md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex flex-col text-sm">
              <span className="font-sans font-bold text-on-dark">{post.author?.name}</span>
              <div className="flex items-center gap-1.5 font-sans text-on-dark/80">
                <span>{formattedDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        {post.excerpt && (
          <p className="mb-10 text-xl font-medium leading-relaxed text-ink">{post.excerpt}</p>
        )}
        <div className="prose prose-lg max-w-none">
          <Markdown>{post.content}</Markdown>
        </div>
        <div className="mt-16 border-t border-border pt-8">
          <CommentsSection initialComments={comments} postId={post.id} user={user} />
        </div>
      </article>
    </main>
  )
}
