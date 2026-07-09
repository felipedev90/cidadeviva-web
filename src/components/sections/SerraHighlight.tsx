import Image from 'next/image'
import Link from 'next/link'

import { SERRA_DATA } from '@/data/serraHighlight'

export function SerraHighlight() {
  return (
    <div className="bg-border min-h-[70vh] flex items-center justify-center p-6 md:p-10">
      <div className="bg-surface shadow-2xl overflow-hidden max-w-7xl w-full flex flex-col md:flex-row">
        <div className="bg-primary p-10 md:p-16 flex flex-col gap-8 md:w-1/2">
          <p className="text-sm md:text-base uppercase font-display tracking-widest text-[#cfae80] text-center md:text-left">
            Categoria em foco
          </p>
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wide text-on-dark text-center md:text-left">
            Ciclismo na <br /> serra do japi
          </h2>

          <p className="font-sans text-on-dark/80 font-extralight text-md md:text-base leading-relaxed max-w-md text-center md:text-left">
            A maior reserva de mata atlântica perto de São Paulo é o quintal dos ciclistas de
            Jundiaí. Roteiros, mirantes e onde tomar um café depois da subida.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            {SERRA_DATA.map((item) => (
              <div key={item.id} className="flex flex-col text-center lg:text-left">
                <span className="text-4xl font-display font-bold text-accent">{item.value}</span>
                <span className="font-sans text-on-dark/80 font-extralight text-md md:text-base leading-relaxed">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center lg:text-left">
            <Link
              href="/?category=ciclismo"
              className="font-sans font-medium text-md lg:text-lg text-ink tracking-wider uppercase bg-accent px-5 py-4 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
            >
              Ver mais
            </Link>
          </div>
        </div>

        <div className="relative h-80 md:h-auto md:flex-1">
          <Image
            src="/images/serra-highlight/serra_highlight.webp"
            alt="Cachoeira na Serra do Japi"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className=" object-cover"
          />
        </div>
      </div>
    </div>
  )
}
