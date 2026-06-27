import Image from 'next/image'
import Link from 'next/link'

import { SERRA_DATA } from '@/data/serraHighlight'

export function SerraHighlight() {
  return (
    <div className="bg-border min-h-[70vh] flex items-center justify-center p-6 md:p-10">
      <div className="bg-surface shadow-2xl overflow-hidden max-w-7xl w-full flex flex-col md:flex-row">
        <div className="bg-primary p-10 md:p-16 flex flex-col gap-8 md:w-1/2">
          <>
            <p className="text-sm md:text-base uppercase font-display tracking-widest text-accent opacity-90">
              Categoria em foco
            </p>
            <h2 className="text-2xl md:text-5xl font-display uppercase tracking-wide text-on-dark">
              Ciclismo na <br /> serra do japi
            </h2>
          </>
          <p className="font-sans text-on-dark/80 font-extralight text-sm md:text-base leading-relaxed max-w-md">
            A maior reserva de mata atlântica perto de São Paulo é o quintal dos ciclistas de
            Jundiaí. Roteiros, mirantes e onde tomar um café depois da subida.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            {SERRA_DATA.map((item) => (
              <div key={item.value} className="flex flex-col text-left">
                <span className="text-4xl font-display font-bold text-accent">{item.value}</span>
                <span className="font-sans text-on-dark/80 font-extralight text-sm md:text-base leading-relaxed">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-left">
            <Link
              href="/?category=ciclismo"
              className="font-sans font-medium text-lg text-ink tracking-wider uppercase bg-accent px-5 py-4 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
            >
              Ver matérias de ciclismo
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 h-80 md:h-auto">
          <Image
            src="/images/serra-highlight/serra_highlight.webp"
            alt="Serra do Japi"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
