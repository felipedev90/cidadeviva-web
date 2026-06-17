import type { Author, Comment, Post } from '@/types/blog'

export type RawAuthor = Omit<Author, 'id'> & {
  _id: string
}

export type RawComment = Omit<Comment, 'id' | 'author'> & {
  _id: string
  author: RawAuthor
}

export type RawPost = Omit<Post, 'id' | 'author'> & {
  _id: string
  author: RawAuthor | null
}

export function toAuthor(raw: RawAuthor): Author {
  const { _id, name, email } = raw
  return { id: _id, name, email }
}

export function toComment(raw: RawComment): Comment {
  const { _id, author, content, post, createdAt, updatedAt } = raw
  return {
    id: _id,
    author: toAuthor(author),
    content,
    post,
    createdAt,
    updatedAt,
  }
}

export function toPost(raw: RawPost): Post {
  const {
    _id,
    author,
    title,
    slug,
    content,
    excerpt,
    category,
    published,
    coverImage,
    createdAt,
    updatedAt,
  } = raw
  return {
    id: _id,
    author: author ? toAuthor(author) : null,
    title,
    slug,
    content,
    excerpt,
    category,
    published,
    coverImage,
    createdAt,
    updatedAt,
  }
}
