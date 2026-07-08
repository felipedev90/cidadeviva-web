'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  category: z.enum(['ciclismo', 'gastronomia', 'cultura', 'eventos']),
  published: z.boolean(),
  excerpt: z.string().min(1, 'Resumo obrigatório'),
  content: z.string().min(1, 'Conteúdo obrigatório'),
  coverImage: z.custom<FileList>().refine((f) => f && f.length > 0, 'Imagem obrigatória'),
})

type PostFormData = z.infer<typeof postSchema>

export default function NewPostPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      published: false,
      category: 'ciclismo',
    },
  })

  async function onSubmit(data: PostFormData) {
    setServerError(null)

    if (!data.coverImage[0]) {
      setServerError('Selecione uma imagem de capa')
      return
    }

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('category', data.category)
    formData.append('published', String(data.published))
    formData.append('excerpt', data.excerpt)
    formData.append('content', data.content)
    formData.append('coverImage', data.coverImage[0])

    const slug = data.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    formData.append('slug', slug)

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      setServerError(error.error)
      return
    }

    const result = await response.json()
    router.push(`/posts/${result.slug}`)
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6 lg:py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-3xl font-bold uppercase text-ink">Novo post</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label className="font-sans text-xs uppercase tracking-widest text-ink">Título</label>
          <input
            type="text"
            placeholder="Um título que dá vontade de clicar"
            {...register('title')}
            className="border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-primary"
          />
          {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-sans text-xs uppercase tracking-widest text-ink">Categoria</label>
          <select
            {...register('category')}
            className="border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-primary"
          >
            <option value="ciclismo">Ciclismo</option>
            <option value="gastronomia">Gastronomia</option>
            <option value="cultura">Cultura</option>
            <option value="eventos">Eventos</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            {...register('published')}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="published" className="font-sans text-sm text-body">
            Publicar agora
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-sans text-xs uppercase tracking-widest text-ink">
            Imagem de capa
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            {...register('coverImage')}
            className="border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-primary"
          />
          {errors.coverImage && (
            <span className="text-red-500 text-xs">{errors.coverImage.message as string}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-sans text-xs uppercase tracking-widest text-ink">Resumo</label>
          <textarea
            rows={2}
            placeholder="Uma ou duas frases que aparecem no card e na busca."
            {...register('excerpt')}
            className="border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-primary resize-none"
          />
          {errors.excerpt && <span className="text-red-500 text-xs">{errors.excerpt.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-sans text-xs uppercase tracking-widest text-ink">
            Conteúdo (Markdown)
          </label>
          <textarea
            rows={12}
            placeholder="Escreva sua matéria aqui. Suporta Markdown."
            {...register('content')}
            className="border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-primary resize-none"
          />
          {errors.content && <span className="text-red-500 text-xs">{errors.content.message}</span>}
        </div>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-on-dark font-sans font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </main>
  )
}
