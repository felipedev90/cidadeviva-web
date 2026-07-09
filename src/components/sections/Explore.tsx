import Image from 'next/image'
import Link from 'next/link'

import { HERO_LINKS } from '@/data/hero'

export function Explore() {
  return (
    <section className="bg-accent/90 py-16 md:py-24 px-4 sm:px-8 w-full min-h-screen flex flex-col justify-center">
      {/* Título da Seção */}
      <h2 className="text-center text-ink text-3xl md:text-5xl font-display font-bold uppercase tracking-wide mb-12">
        Explore Jundiaí
      </h2>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-center">
        {/* Lado Esquerdo: Grid de Imagens */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-125 md:h-150 w-full">
          <div className="row-span-2 relative w-full h-full border-4 border-on-dark shadow-lg overflow-hidden">
            <Image
              src="/images/explore/explore_01.webp"
              alt="Vinicola em Jundiaí"
              fill
              sizes="(min-width: 1024px) 380px, 45vw"
              className="object-cover"
            />
          </div>

          <div className="relative w-full h-full border-4 border-on-dark shadow-lg overflow-hidden">
            <Image
              src="/images/explore/explore_02.webp"
              alt="Avenida Nove de Julho em Jundiaí"
              fill
              sizes="(min-width: 1024px) 380px, 45vw"
              className="object-cover"
            />
          </div>

          <div className="relative w-full h-full border-4 border-on-dark shadow-lg overflow-hidden">
            <Image
              src="/images/explore/explore_03.webp"
              alt="Festa da Uva de Jundiaí"
              fill
              sizes="(min-width: 1024px) 380px, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Lado Direito: Menu de Navegação */}
        <div className="flex flex-col justify-center w-full max-w-sm mx-auto lg:mx-0">
          <ul className="flex flex-col w-full mb-10">
            {HERO_LINKS.map((link) => (
              <li key={link.href} className="border-b border-primary/20">
                <Link
                  href={link.href}
                  className="block text-center lg:text-start py-4 text-primary font-display text-xl font-bold uppercase tracking-wide hover:text-on-dark transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="bg-primary text-on-dark font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] py-4 px-8 self-center lg:self-start hover:bg-primary-hover transition-colors duration-300"
          >
            Ver todos os posts
          </Link>
        </div>
      </div>
    </section>
  )
}
