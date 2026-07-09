import { apiFetch } from './client'

export async function getUser(): Promise<{ id: string; name: string; email: string }> {
  const {
    data: {
      user: { _id: id, name, email },
    },
  } = await apiFetch<{ data: { user: { _id: string; name: string; email: string } } }>(
    '/api/v1/auth/me',
  )
  return { id, name, email }
}
