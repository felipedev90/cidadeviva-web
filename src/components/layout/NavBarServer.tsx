import { getAuthToken } from '@/lib/api/auth'
import { getUser } from '@/lib/api/user'

import { NavBar } from './NavBar'

export async function NavBarServer() {
  // Verifica se o usuário tem um token de autenticação válido e, se sim, busca os dados do usuário. Caso contrário, retorna null.
  const authToken = await getAuthToken()
  const user = authToken ? await getUser() : null

  return <NavBar user={user} />
}
