import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Wine, TreePine, Award } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { PRODUCTS } from '@/lib/products'
import { RECIPES } from '@/lib/recipes'

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p?.featured)
  const drinks = RECIPES.slice(0, 3)

  return (
    <>
      <Hero />

      {/* Brand intro + stats */}
      <section className="border-y border-primary/15 bg-[#17120c] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <span className="eyebrow">A Marca</span>
              <h2 className="mt-4 font-display text-3xl text-[#f1e6d2] md:text-4xl">
                Cachaça de raíz, com sotaque do Cerrado.
              </h2>
              <p className="mt-5 font-body text-muted-foreground">
                A Remedin nasceu de uma receita de família e cresceu no Alambique Amana, em Sobradinho,
                Brasília. Fomos uma das pioneiras da cachaça orgânica do Distrito Federal — e levamos
                essa ousadia até o descanso: cada rótulo repousa em uma madeira diferente, do carvalho
                francês às nativas como o jatobá e a amburana.
              </p>
              <Link
                href="/sobre"
                className="font-label mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-primary transition hover:text-accent"
              >
                Nossa história <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="https://cdn.abacus.ai/images/07bccb74-861e-48c8-9d25-45677e4fd230.png"
                  alt="Alambique de cobre artesanal"
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-3 border border-primary/30" />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-primary/20 bg-primary/10 md:grid-cols-4">
            {[
              { icon: TreePine, b: '7+', s: 'Rótulos & madeiras' },
              { icon: Wine, b: '38%', s: 'Teor alcoólico' },
              { icon: Award, b: '15+', s: 'Prêmios nacionais' },
              { icon: Sparkles, b: '1ª', s: 'Defumada do Brasil' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.s} className="bg-[#17120c] px-6 py-8 text-center">
                  <Icon className="mx-auto h-6 w-6 text-primary" />
                  <div className="mt-3 font-display text-3xl text-accent">{stat.b}</div>
                  <div className="font-label mt-1 text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.s}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#15110C] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal className="mx-auto mb-14 max-w-xl text-center">
            <span className="eyebrow">Os Rótulos</span>
            <h2 className="mt-4 font-display text-3xl text-[#f1e6d2] md:text-4xl">Uma garrafa para cada madeira.</h2>
            <p className="mt-4 font-body text-muted-foreground">
              Da branca pura às reservas envelhecidas. Todas a 38% e engarrafadas em Brasília.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p?.slug} product={p} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/produtos"
              className="font-label inline-flex items-center gap-2 rounded-sm border border-primary/60 px-7 py-3.5 text-xs uppercase tracking-[0.12em] text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              Ver toda a linha <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Label generator CTA */}
      <section className="relative overflow-hidden border-y border-primary/20 py-24">
        <Image
          src="https://cdn.abacus.ai/images/fe4b610f-878b-4181-a5d2-9a5041566e7a.png"
          alt="Barris de envelhecimento"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.32) saturate(0.9)' }}
        />
        <div className="absolute inset-0 bg-[#15110C]/70" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <span className="eyebrow center">Experiência Exclusiva</span>
            <h2 className="mt-4 font-display text-3xl text-[#f3e8d4] md:text-4xl">
              Crie o rótulo da sua própria cachaça com IA.
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-[#d8c9b1]">
              Descreva o estilo, escolha a madeira e veja a inteligência artificial desenhar um rótulo
              vintage exclusivo. Personalize nome, origem, volume e teor — e baixe em alta resolução.
            </p>
            <Link
              href="/gerador-de-rotulos"
              className="font-label mt-8 inline-flex items-center gap-2 rounded-sm bg-secondary px-8 py-4 text-xs uppercase tracking-[0.12em] text-secondary-foreground transition hover:-translate-y-0.5 hover:brightness-110"
            >
              <Sparkles className="h-4 w-4" /> Abrir o gerador de rótulos
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Mixology teaser */}
      <section className="bg-[#17120c] py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal className="mx-auto mb-14 max-w-xl text-center">
            <span className="eyebrow">Mixologia</span>
            <h2 className="mt-4 font-display text-3xl text-[#f1e6d2] md:text-4xl">Do jeito que sempre se bebeu.</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {drinks.map((r, i) => (
              <Reveal key={r?.slug} delay={i * 0.08}>
                <Link
                  href="/receitas"
                  className="group block overflow-hidden rounded-sm bg-[#1b150e] transition hover:-translate-y-1.5"
                >
                  <div className="relative aspect-square">
                    <Image src={r?.image ?? ''} alt={r?.name ?? ''} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="font-label text-[0.58rem] uppercase tracking-[0.18em] text-accent">{r?.pairing}</div>
                    <h3 className="mt-1.5 font-display text-xl text-[#f1e6d2]">{r?.name}</h3>
                    <p className="mt-2 font-body text-sm text-muted-foreground line-clamp-2">{r?.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/receitas"
              className="font-label inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-primary transition hover:text-accent"
            >
              Todas as receitas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
