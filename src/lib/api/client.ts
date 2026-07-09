import { cookies } from 'next/headers'

import { clearAuthAndRedirect } from './auth'

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
    await clearAuthAndRedirect()
  }

  if (!response.ok) {
    throw new Error(`Erro ${response.status} em ${endpoint}`)
  }

  if (response.status === 204) {
    return undefined as unknown as T
  }
  const json = await response.json()
  return json
}
