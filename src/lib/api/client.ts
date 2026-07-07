import { cookies } from 'next/headers'

export class UnauthorizedError extends Error {}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${process.env.API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  })

  if (response.status === 401) {
    throw new UnauthorizedError()
  }

  if (!response.ok) {
    throw new Error(`Erro ${response.status} em ${endpoint}`)
  }

  const json = await response.json()
  return json
}
