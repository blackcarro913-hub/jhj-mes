export function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Central de atendimento</h3>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">Motiva</p>
              <a
                href="https://www.motiva.com.br/contatos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors underline"
              >
                www.motiva.com.br/contatos
              </a>
            </div>

            <div>
              <p className="font-medium mb-1">Eco Rodovias</p>
              <a
                href="https://freeflow.econoroeste.com.br/fale-conosco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors underline"
              >
                freeflow.econoroeste.com.br/fale-conosco
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Pedágio Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
