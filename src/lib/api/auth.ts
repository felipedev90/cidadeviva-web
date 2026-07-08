import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function clearAuthAndRedirect(): Promise<never> {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
  redirect('/auth/login')
}
