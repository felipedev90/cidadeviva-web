import { apiFetch } from './client'

export async function getUser(): Promise<{ name: string; email: string }> {
  const {
    data: {
      user: { name, email },
    },
  } = await apiFetch<{ data: { user: { name: string; email: string } } }>('/api/v1/auth/me')
  return { name, email }
}
