//Author, Category, Post, Comment, Paginated<T>

export type Author = {
  id: string
  name: string
  email?: string
}

export type Category = 'ciclismo' | 'gastronomia' | 'cultura' | 'eventos'

export type Comment = {
  id: string
  author: Author
  content: string
  post: string
  createdAt: string
  updatedAt: string
}

export type Post = {
  id: string
  author: Author | null
  title: string
  slug: string
  content: string
  excerpt: string
  category: Category
  published: boolean
  coverImage?: string
  createdAt: string
  updatedAt: string
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
