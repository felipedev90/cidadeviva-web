import { Pen, Trash2 as TrashIcon } from 'lucide-react'
import Link from 'next/link'

import { getMyPosts } from '@/lib/api/posts'
import { getUser } from '@/lib/api/user'
import { formattedDate } from '@/lib/formattedDate/formattedDate'

export default async function DashboardPage() {
  const [{ items: posts }, user] = await Promise.all([getMyPosts(), getUser()])
  console.log('user:', user)
  console.log('posts:', posts)

  const published = posts.filter((p) => p.published).length
  const drafts = posts.filter((p) => !p.published).length

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 lg:py-12">
      <div className="flex flex-col lg:flex-row items-start justify-between mb-10 gap-4">
        <div className="mb-4">
          <p className="font-display text-sm uppercase tracking-widest text-muted mb-2">Painel</p>
          <h1 className="font-display text-4xl font-bold uppercase text-ink">
            Olá, {user.name.split(' ')[0]}
          </h1>
          <p className="font-sans text-sm text-ink/80 mt-1">
            Aqui estão suas matérias e o desempenho delas.
          </p>
        </div>
        <Link
          href="/dashboard/posts/new"
          className="bg-primary text-on-dark font-sans font-bold text-sm uppercase tracking-widest px-5 py-3 hover:bg-primary-hover transition-colors"
        >
          + Novo post
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="border border-border p-6">
          <p className="font-sans text-xs uppercase tracking-widest text-muted mb-2">Publicados</p>
          <p className="font-display text-4xl font-bold text-ink">{published}</p>
        </div>
        <div className="border border-border p-6">
          <p className="font-sans text-xs uppercase tracking-widest text-muted mb-2">Rascunhos</p>
          <p className="font-display text-4xl font-bold text-accent">{drafts}</p>
        </div>
      </div>

      {/* Tabela de posts */}
      <div className="border border-border">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display text-xl font-bold uppercase text-ink">Seus posts</h2>
          <span className="font-sans text-sm text-muted">{posts.length} matérias</span>
        </div>

        <div className="md:hidden">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border-b border-border px-4 py-4 flex flex-col gap-3 items-center"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-sans text-sm font-bold text-ink">{post.title}</p>
                <span
                  className={`shrink-0 font-sans text-xs font-bold uppercase px-2 py-1 ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                >
                  {post.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
              <p className="font-sans text-xs text-muted capitalize">
                {post.category} · {formattedDate(post.createdAt)}
              </p>
              <div className="flex gap-4 mt-1">
                <Link
                  href={`/dashboard/posts/${post.slug}/edit`}
                  aria-label={`Editar ${post.title}`}
                  className="text-primary hover:text-primary-hover"
                >
                  <Pen className="w-4 h-4" />
                </Link>
                <button
                  aria-label={`Excluir ${post.title}`}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <table className="hidden md:table w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="font-sans text-xs uppercase tracking-widest text-muted text-left px-6 py-3">
                Título
              </th>
              <th className="font-sans text-xs uppercase tracking-widest text-muted text-left px-6 py-3">
                Categoria
              </th>
              <th className="font-sans text-xs uppercase tracking-widest text-muted text-left px-6 py-3">
                Status
              </th>
              <th className="font-sans text-xs uppercase tracking-widest text-muted text-right px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0">
                <td className="px-6 py-4">
                  <p className="font-sans text-sm font-bold text-ink">{post.title}</p>
                  <p className="font-sans text-xs text-muted">{formattedDate(post.createdAt)}</p>
                </td>
                <td className="px-6 py-4 font-sans text-sm text-body capitalize">
                  {post.category}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`font-sans text-xs font-bold uppercase px-3 py-1 ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                  >
                    {post.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/dashboard/posts/${post.slug}/edit`}
                      className="font-sans text-sm text-primary hover:text-primary-hover transition-colors"
                      aria-label={`Editar post ${post.title}`}
                    >
                      <Pen className="w-5 h-5" />
                    </Link>
                    <button
                      className="font-sans text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                      aria-label={`Excluir post ${post.title}`}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
