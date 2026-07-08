import { getMyPosts } from '@/lib/api/posts'
import { getUser } from '@/lib/api/user'

export default async function DashboardPage() {
  const [{ items: posts, totalPages }, user] = await Promise.all([getMyPosts(), getUser()])
  console.log('user:', user)
  console.log('posts:', posts)

  return (
    <main>
      <h1>Olá, {user.name}</h1>
      <p>{posts.length} posts</p>
    </main>
  )
}
