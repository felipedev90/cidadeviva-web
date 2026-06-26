import { Globe, Handshake, Workflow } from 'lucide-react'
import Link from 'next/link'

import { INSTITUTIONAL_LINKS, SOCIAL_MEDIA_LINKS } from '@/data/footer'
import { NAV_BAR_DATA } from '@/data/nav'

const ICON_MAP = {
  github: Workflow,
  linkedin: Handshake,
  portfolio: Globe,
}

export function Footer() {
  return (
    <footer className="bg-primary-hover font-display">
      <div className="mx-auto grid max-w-7xl  grid-cols-1 items-start gap-24 px-4 py-16 md:grid-cols-12">
        <div className="m-auto flex flex-col items-center justify-center text-center md:col-span-4 md:items-start md:text-left">
          <h2 className="text-on-dark uppercase text-2xl font-bold tracking-wide mb-2">
            Cidade <span className="text-accent">viva</span>
          </h2>
          <p className="text-on-dark/70 mb-6 text-md max-w-xs leading-relaxed font-sans">
            Cultura urbana, ciclismo e lifestyle de Jundiaí, contados por quem vive a cidade.
          </p>

          <div className="flex flex-row gap-4 ">
            {SOCIAL_MEDIA_LINKS.map((social) => {
              const Icon = ICON_MAP[social.platform]
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-on-dark/20 p-4 rounded-full text-on-dark"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>

        <div className="grid w-full grid-cols-1 text-center md:text-start gap-8 md:col-span-8 xl:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-accent uppercase tracking-widest mb-6">Navegar</h3>
            <ul>
              {NAV_BAR_DATA.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-on-dark/70 mb-4 text-md max-w-xs leading-relaxed font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-accent uppercase tracking-widest mb-6">Institucional</h3>
            <ul>
              {INSTITUTIONAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-dark/70 mb-4 text-md max-w-xs leading-relaxed font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-accent uppercase tracking-widest mb-6">Escreva com a gente</h3>
            <p className="text-on-dark/70 text-md max-w-xs leading-relaxed font-sans mb-10">
              Mora em Jundiaí e tem uma boa história? A gente tem que ler.
            </p>
            <Link
              href="/auth/register"
              className="font-sans font-semibold  text-lg text-ink tracking-wide uppercase bg-accent px-5 py-4 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>

      <div className="text-on-dark/80  border-t border-border/20">
        <div className="flex justify-center xl:justify-between flex-col xl:flex-row items-center mx-auto px-2 py-8 font-sans text-sm max-w-7xl">
          <div className="text-center mb-4">
            {new Date().getFullYear()} Cidade Viva · Jundiaí/SP · Criado por{' '}
            <a href="https://felipeaugustodev.com.br/" target="_blank" rel="noopener noreferrer">
              Felipe Augusto
            </a>
          </div>
          <div className="flex gap-5">
            <p>Termos</p>·<p>Privacidade</p>·<p>Cookies</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
