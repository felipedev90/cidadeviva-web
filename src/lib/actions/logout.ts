'use server'

import { clearAuthAndRedirect } from '@/lib/api/auth'

export async function logout() {
  await clearAuthAndRedirect()
}
