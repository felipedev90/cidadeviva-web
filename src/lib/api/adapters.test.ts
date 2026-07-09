import { describe, expect, it } from 'vitest'

import type { RawAuthor, RawComment, RawPost } from './adapters'
import { toAuthor, toComment, toPost } from './adapters'

describe('toAuthor', () => {
  it('converte _id para id e mantém os demais campos', () => {
    const raw: RawAuthor = {
      _id: 'author-1',
      name: 'Maria',
      email: 'maria@example.com',
    }

    expect(toAuthor(raw)).toEqual({
      id: 'author-1',
      name: 'Maria',
      email: 'maria@example.com',
    })
  })
})

describe('toComment', () => {
  it('converte _id para id e converte o author aninhado', () => {
    const raw: RawComment = {
      _id: 'comment-1',
      author: {
        _id: 'author-1',
        name: 'Maria',
        email: 'maria@example.com',
      },
      content: 'Ótimo post!',
      post: 'post-1',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    }

    expect(toComment(raw)).toEqual({
      id: 'comment-1',
      author: {
        id: 'author-1',
        name: 'Maria',
        email: 'maria@example.com',
      },
      content: 'Ótimo post!',
      post: 'post-1',
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    })
  })
})

describe('toPost', () => {
  const baseRaw: RawPost = {
    _id: 'post-1',
    author: {
      _id: 'author-1',
      name: 'Maria',
      email: 'maria@example.com',
    },
    title: 'Título',
    slug: 'titulo',
    content: 'Conteúdo',
    excerpt: 'Resumo',
    category: 'cultura',
    published: true,
    coverImage: undefined,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }

  it('converte _id para id e converte o author aninhado', () => {
    expect(toPost(baseRaw)).toEqual({
      id: 'post-1',
      author: {
        id: 'author-1',
        name: 'Maria',
        email: 'maria@example.com',
      },
      title: 'Título',
      slug: 'titulo',
      content: 'Conteúdo',
      excerpt: 'Resumo',
      category: 'cultura',
      published: true,
      coverImage: undefined,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    })
  })

  it('mantém author como null quando o post não tem autor', () => {
    const raw: RawPost = { ...baseRaw, author: null }

    expect(toPost(raw).author).toBeNull()
  })
})
