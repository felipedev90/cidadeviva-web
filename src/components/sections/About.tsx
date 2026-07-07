import Image from 'next/image'
import Link from 'next/link'

import { ABOUT } from '@/data/about'

export function About() {
  return (
    <section className="bg-bg py-16 md:py-24 px-4 sm:px-6 lg:px-8 w-full flex justify-center items-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center">
        {/* Lado Esquerdo: Imagem */}
        <div className="w-full lg:w-7/12 relative h-87.5 sm:h-112.5 lg:h-137.5 shadow-lg">
          <Image
            src="/images/about/about_2.webp"
            alt="Igreja matriz"
            fill
            className="object-[70%_center] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Lado Direito: Card de Texto Sobreposto */}
        <div className="w-11/12 sm:w-full lg:w-6/12 bg-surface p-8 sm:p-12 lg:p-16 shadow-2xl z-10 mt-12.5 lg:mt-0 lg:-ml-24">
          <p className="text-accent font-display text-xs uppercase tracking-[0.2em] mb-3">
            Quem faz o Cidade Viva
          </p>
          <h2 className="text-ink font-display text-[2.3rem] lg:text-5xl font-extrabold uppercase tracking-wide leading-tight mb-6">
            {ABOUT.title}
          </h2>
          <div className="flex flex-col gap-5 text-body font-sans text-md sm:text-base leading-relaxed">
            <p>{ABOUT.intro}</p>
            <p>{ABOUT.body}</p>
          </div>
          <div className="mt-8 lg:mx-0 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start text-center">
            <Link
              href="/auth/register"
              className="inline-block bg-accent hover:bg-accent-hover text-ink font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.15em] px-8 py-4 transition-colors duration-300"
            >
              Escreva com a gente
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
