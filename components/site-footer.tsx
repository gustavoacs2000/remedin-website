import Link from 'next/link'
import { MapPin, Instagram } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/20 bg-[#100c08]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-label text-lg font-bold tracking-[0.3em] text-foreground">REMEDIN</div>
            <div className="font-label mt-1 text-[0.55rem] tracking-[0.4em] text-primary">CACHAÇA · CERRADO</div>
            <p className="font-body mt-5 max-w-xs text-sm italic text-muted-foreground">
              Da receita de família ao seu copo. Feita à mão em Brasília-DF, lote a lote, explorando as
              madeiras do Cerrado.
            </p>
          </div>

          <div>
            <div className="font-label text-[0.6rem] uppercase tracking-[0.22em] text-primary">Navegue</div>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: '/sobre', label: 'A Marca' },
                { href: '/produtos', label: 'Os Rótulos' },
                { href: '/receitas', label: 'Receitas' },
                { href: '/blog', label: 'Blog' },
                { href: '/gerador-de-rotulos', label: 'Gerador de Rótulos' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-muted-foreground transition hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-label text-[0.6rem] uppercase tracking-[0.22em] text-primary">Alambique</div>
            <p className="font-body mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Alambique Amana do Brasil · Sobradinho, Brasília-DF
            </p>
            <a
              href="https://instagram.com/remedincachaca"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-accent"
            >
              <Instagram className="h-4 w-4 text-primary" /> @remedincachaca
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-primary/15 pt-6 text-center">
          <p className="font-label text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
            Aprecie com moderação · Venda proibida para menores de 18 anos
          </p>
          <p className="font-body mt-2 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Cachaça Remedin · Brasília-DF
          </p>
        </div>
      </div>
    </footer>
  )
}
