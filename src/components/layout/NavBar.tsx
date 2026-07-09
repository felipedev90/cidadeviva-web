'use client'

import { LogOut, Menu, NotebookPen, Search, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { NAV_BAR_DATA } from '@/data/nav'
import { logout } from '@/lib/actions/logout'
import { cn } from '@/lib/cn/cn'

type NavBarProps = {
  user: { name: string; email: string } | null
}

export function NavBar({ user }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      firstLinkRef.current?.focus()
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 z-50 w-full flex items-center justify-between bg-primary/90 px-6 py-4 backdrop-blur-xl">
      <div className="flex gap-4">
        <Image
          src="/images/navbar/logo.webp"
          alt="Ponte torta"
          width={100}
          height={100}
          priority
          className="rounded-full hidden md:block"
        />
        <div className="z-50">
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
        className="text-surface rounded-full border border-surface/20 p-3 lg:flex lg:items-center lg:justify-center hover:bg-surface/10 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors hidden"
      >
        <Search />
      </button>
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link href="/dashboard" className="text-on-dark lg:hidden z-50">
              <User size={24} />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-start flex-col">
                <span className="text-on-dark font-light font-sans uppercase tracking-widest text-md hidden lg:flex">
                  {' '}
                  Olá,{' '}
                </span>
                <span className="text-on-dark font-sans text-xl hidden lg:flex">{user.name}</span>
                <div className="flex justify-center items-center gap-4 mt-1">
                  <Link
                    href="/dashboard"
                    className="text-on-dark font-sans font-light text-md hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors hidden lg:flex items-center cursor-pointer"
                  >
                    Meu painel
                    <NotebookPen size={16} className="ml-1" />
                  </Link>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="text-on-dark font-sans font-light text-md hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors hidden lg:flex items-center cursor-pointer"
                    >
                      Sair
                      <LogOut size={16} className="ml-1" />
                    </button>
                  </form>
                </div>
              </div>
              <Link
                href="/dashboard/posts/new"
                className="font-sans font-bold text-lg text-ink tracking-wider uppercase bg-accent px-5 py-4 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors hidden lg:flex"
              >
                Escrever
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="text-on-dark font-bold font-sans text-xl hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors hidden lg:flex"
            >
              Login
            </Link>
            <Link href="/auth/login" className="text-on-dark lg:hidden z-50">
              <User size={24} />
            </Link>
            <Link
              href="/auth/register"
              className="font-sans font-bold text-lg text-ink tracking-wider uppercase bg-accent px-5 py-4 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors hidden lg:flex"
            >
              Escrever
            </Link>
          </>
        )}

        <button
          className="relative z-50 text-on-dark lg:hidden"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          aria-hidden={!isOpen}
          className={cn(
            'bg-transparent fixed inset-0 z-40 transition-transform duration-300 lg:hidden',
            isOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <nav
            aria-label="Navegação mobile"
            className="bg-primary h-screen flex flex-col items-center justify-center pt-32 gap-8"
          >
            {NAV_BAR_DATA.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={index === 0 ? firstLinkRef : null}
                className="text-on-dark font-display tracking-wide text-2xl hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
