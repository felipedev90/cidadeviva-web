import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const formData = await request.formData()
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category = formData.get('category') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const published = formData.get('published') === 'true'
  const coverImage = formData.get('coverImage') as File

  const apiFormData = new FormData()
  apiFormData.append('title', title)
  apiFormData.append('slug', slug)
  apiFormData.append('category', category)
  apiFormData.append('excerpt', excerpt)
  apiFormData.append('content', content)
  apiFormData.append('published', String(published))
  apiFormData.append('coverImage', coverImage)

  const response = await fetch(`${process.env.API_URL}/api/v1/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: apiFormData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    return NextResponse.json({ error: errorData.message }, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json({ success: true, slug: data.data.post.slug })
}
