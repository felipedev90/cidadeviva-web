import Image from 'next/image'
import Link from 'next/link'

import { HERO_IMAGE, HERO_LINKS } from '@/data/hero'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen items-center justify-center overflow-hidden pt-20 pb-16 md:pb-0"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-linear-to-l from-transparent via-ink/40 to-ink/10" />
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-20 mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <span className="font-display tracking-widest font-extrabold uppercase text-accent-hover">
            Blog de jundiaí
          </span>
          <h1 className="font-display uppercase text-on-dark text-[3rem] leading-tight mb-2 lg:text-9xl">
            A cidade <br />
            está <span className="text-accent">viva</span>
          </h1>
          <p className="text-on-dark/90 font-sans mb-10 max-w-2xl text-start text-lg leading-relaxed tracking-wide">
            Histórias, rolês e rotas da Terra da uva. Da serra do Japi ao centro histórico, com
            olhar de quem vive Jundiaí todo dia.
          </p>
          <div className="flex gap-5">
            {HERO_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-surface/90 font-sans border rounded-full border-surface/20 px-4 py-3 hover:bg-surface/10 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
