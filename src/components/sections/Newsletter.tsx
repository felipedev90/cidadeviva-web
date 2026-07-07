export function Newsletter() {
  return (
    <section className="bg-primary py-16 md:py-24 px-4 w-full flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl w-full flex flex-col items-center">
        <p className="text-accent font-display text-xs font-bold uppercase tracking-[0.2em] mb-3">
          Newsletter Semanal
        </p>
        <h2 className="text-on-dark font-display text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
          Receba Jundiaí no seu e-mail
        </h2>
        <p className="text-on-dark/80 font-sans text-sm md:text-base mb-10">
          Toda sexta, as melhores matérias e a agenda da cidade. Sem spam.
        </p>

        <div className="flex flex-col sm:flex-row w-full max-w-xl gap-4 sm:gap-4 justify-center">
          <input
            type="email"
            placeholder="seu@email.com"
            required
            className="flex-1 w-full bg-muted/10 border border-surface/30 text-on-dark placeholder-on-dark/40 px-5 py-3 sm:py-4 focus:outline-none focus:border-surface focus:ring-1 focus:ring-white transition-all"
          />
          <button
            type="button"
            className="bg-accent text-ink font-sans text-sm font-bold uppercase tracking-widest px-10 py-3 sm:py-4 hover:bg-accent-hover transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Assinar
          </button>
        </div>
      </div>
    </section>
  )
}
