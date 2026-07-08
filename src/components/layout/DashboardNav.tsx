import { LogOut } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type DashboardNavProps = {
  userName: string
}

async function logout() {
  'use server'
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
  redirect('/auth/login')
}

export function DashboardNav({ userName }: DashboardNavProps) {
  const initials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="fixed top-0 z-50 w-full bg-primary p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-display text-xl text-on-dark uppercase tracking-wider">
          Cidade <span className="text-accent">Viva</span>
        </Link>
        <span className="text-on-dark/40">|</span>
        <span className="font-display text-sm text-on-dark/70 uppercase tracking-widest">
          Painel do Autor
        </span>
      </div>

      <div className="flex items-center justify-between gap-6 w-full lg:w-auto">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-sans text-sm text-on-dark/70 hover:text-on-dark transition-colors hidden lg:block mr-8"
          >
            Ver site
          </Link>
          <Link
            href="/dashboard"
            className="font-sans text-sm text-on-dark/70 hover:text-on-dark transition-colors hidden lg:block mr-8"
          >
            Dashboard
          </Link>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="font-display text-xs font-bold text-ink">{initials}</span>
          </div>
          <span className="font-sans text-sm text-on-dark">{userName}</span>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="font-sans text-sm text-on-dark/70 hover:text-on-dark transition-colors flex items-center "
          >
            <LogOut className="w-6 h-6" />
          </button>
        </form>
      </div>
    </header>
  )
}
