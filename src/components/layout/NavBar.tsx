import Link from 'next/link'
import Image from 'next/image'
import { NAV_BAR_DATA } from '@/data/nav'
import { Search } from 'lucide-react'

export function NavBar() {
  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-between bg-primary px-6 py-4 backdrop-blur-xl">
      <div className="flex gap-4">
        <Image
          src="/images/navbar/logo.webp"
          alt="Ponte torta"
          width={100}
          height={100}
          priority
          className="rounded-full"
        />
        <div>
          <Link
            href="/"
            className="font-display text-4xl text-on-dark uppercase flex gap-2 tracking-wider"
          >
            Cidade <span className="text-accent">Viva</span>
          </Link>
          <p className="text-on-dark/60 uppercase tracking-widest font-display">Jundiaí - SP</p>
        </div>
      </div>
      <nav aria-label="Navegação principal" className="hidden items-center gap-8 font-bold lg:flex">
        {NAV_BAR_DATA.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-surface/80 font-display tracking-wide text-lg hover:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        aria-label="Buscar"
        className="text-surface rounded-full border border-surface/20 p-3 flex items-center justify-center hover:bg-surface/10 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
      >
        <Search />
      </button>
      <div className="flex items-center gap-6">
        <Link
          href="/auth/login"
          className="text-on-dark font-bold font-sans text-xl hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="font-sans font-bold text-lg text-ink tracking-wider uppercase bg-accent px-5 py-4 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
        >
          Escrever
        </Link>
      </div>
    </header>
  )
}
