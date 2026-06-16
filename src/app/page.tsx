export default function Home() {
  return (
    <main className="p-12">
      <p className="text-muted text-sm uppercase tracking-widest">Blog de Jundiaí</p>
      <h1 className="font-display text-ink text-6xl font-bold uppercase">
        A cidade está <span className="text-accent">viva</span>
      </h1>
      <p className="text-body mt-4 max-w-md">Histórias, rolês e rotas da Terra da Uva.</p>
      <button className="bg-accent hover:bg-accent-hover mt-6 px-6 py-3 font-semibold text-white uppercase">
        Escrever
      </button>
    </main>
  )
}
