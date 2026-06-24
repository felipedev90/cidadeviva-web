export class UnauthorizedError extends Error {}

export async function apiFetch<T>(endpoint: string): Promise<T> {
  console.log('API_URL:', process.env.API_URL)
  const response = await fetch(`${process.env.API_URL}${endpoint}`)

  if (response.status === 401) {
    throw new UnauthorizedError()
  }

  if (!response.ok) {
    throw new Error(`Erro ${response.status} em ${endpoint}`)
  }

  const json = await response.json()
  return json
}
