export default function PresselPage() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-black">
        <img src="/images/img3.jpg" alt="Mulher dirigindo" className="h-full w-full object-cover opacity-70" />
      </div>

      <nav className="relative z-10 flex items-center justify-center gap-8 px-6 py-8 text-sm">
        <a href="#o-que-e" className="text-lime-400 transition-colors hover:text-lime-300">
          O que é o Pedágio Digital?
        </a>
        <span className="text-white/40">|</span>
        <a href="#como-usar" className="text-lime-400 transition-colors hover:text-lime-300">
          Como Usar
        </a>
        <span className="text-white/40">|</span>
        <a href="#beneficios" className="text-lime-400 transition-colors hover:text-lime-300">
          Benefícios
        </a>
      </nav>

      <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-between gap-8 px-12 lg:px-24">
        <div className="max-w-4xl">
          <h1 className="font-sans text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            DESFRUTE DE TODA A COMODIDADE DO <span className="text-lime-400">PEDÁGIO ELETRÔNICO</span>
          </h1>
        </div>

        <a
          href="/"
          className="flex-shrink-0 rounded-2xl border-4 border-white bg-transparent px-10 py-6 text-center text-xl font-bold leading-tight text-lime-400 transition-all hover:bg-white/10 md:px-12 md:py-8 md:text-2xl"
        >
          Realizar
          <br />
          Consulta
        </a>
      </div>
    </div>
  )
}
