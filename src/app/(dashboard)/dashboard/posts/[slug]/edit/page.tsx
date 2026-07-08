import { getMyPostBySlug } from '@/lib/api/posts'

import UpdatePostPage from './UpdatePostPage'

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getMyPostBySlug(slug)
  return <UpdatePostPage post={post} slug={slug} />
}
