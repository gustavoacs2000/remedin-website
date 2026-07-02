import Image from 'next/image'
import Link from 'next/link'
import { GlassWater, Clock, ChefHat } from 'lucide-react'
import { RECIPES } from '@/lib/recipes'
import { Reveal } from '@/components/reveal'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Receitas de Drinks | Remedin',
  description: 'Coquetéis autorais que valorizam cada perfil das cachaças Remedin.',
}

export default function ReceitasPage() {
  return (
    <div className="bg-[#15110C] min-h-screen">
      <div className="mx-auto max-w-[1200px] px-5 pt-28 pb-20">
        <Reveal>
          <p className="eyebrow center">Mixologia Remedin</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#E8DEC7] text-center mt-2">
            Receitas de Drinks
          </h1>
          <p className="font-body text-lg text-[#C9BEA5] text-center max-w-2xl mx-auto mt-4">
            Da caipirinha clássica à alta coquetelaria: cada drink foi pensado para revelar o
            melhor de uma cachaça do nosso portfólio.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 mt-12">
          {(RECIPES ?? []).map((r, i) => (
            <Reveal key={r.slug} delay={(i % 2) * 0.08}>
              <article className="rounded-[10px] bg-[#1b150e] overflow-hidden shadow-lg transition hover:shadow-2xl hover:-translate-y-1 duration-300 h-full">
                <div className="relative aspect-[16/10] bg-[#0f0c08]">
                  <Image
                    src={r.image}
                    alt={`Drink ${r.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[#15110C] px-3 py-1 font-label uppercase tracking-[0.12em] text-[10px] text-[#D7AC52] shadow-lg ring-1 ring-[#B68A3C]/40">
                    {r.pairing}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl text-[#E8DEC7]">{r.name}</h2>
                  <p className="font-body text-[#C9BEA5] mt-2">{r.description}</p>

                  <div className="flex flex-wrap gap-4 mt-4 text-[#9b8f74]">
                    <span className="inline-flex items-center gap-1.5 font-label uppercase tracking-[0.1em] text-[11px]"><ChefHat className="h-3.5 w-3.5" /> {r.difficulty}</span>
                    <span className="inline-flex items-center gap-1.5 font-label uppercase tracking-[0.1em] text-[11px]"><Clock className="h-3.5 w-3.5" /> {r.time}</span>
                    <span className="inline-flex items-center gap-1.5 font-label uppercase tracking-[0.1em] text-[11px]"><GlassWater className="h-3.5 w-3.5" /> {r.glass}</span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 mt-6">
                    <div>
                      <h3 className="font-label uppercase tracking-[0.15em] text-xs text-[#D7AC52] mb-2">Ingredientes</h3>
                      <ul className="space-y-1">
                        {(r.ingredients ?? []).map((ing) => (
                          <li key={ing} className="font-body text-sm text-[#C9BEA5] flex gap-2"><span className="text-[#B68A3C]">•</span>{ing}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-label uppercase tracking-[0.15em] text-xs text-[#D7AC52] mb-2">Preparo</h3>
                      <ol className="space-y-1">
                        {(r.steps ?? []).map((step, si) => (
                          <li key={si} className="font-body text-sm text-[#C9BEA5] flex gap-2"><span className="text-[#B68A3C] font-label">{si + 1}.</span>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <Link
                    href={`/produtos/${r.productSlug}`}
                    className="inline-block mt-6 font-label uppercase tracking-[0.15em] text-xs text-[#D7AC52] hover:text-[#E8DEC7] transition"
                  >
                    Conheça a {r.productName} →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="text-center font-body text-sm text-[#9b8f74] mt-12">Aprecie com moderação. Venda proibida para menores de 18 anos.</p>
      </div>
    </div>
  )
}
