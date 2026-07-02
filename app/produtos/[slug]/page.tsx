import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Wine, Sparkles, Clock, ArrowLeft } from 'lucide-react'
import { PRODUCTS, getProduct, LIQUID_COLORS } from '@/lib/products'
import { Reveal } from '@/components/reveal'
import Harmonize from '@/components/product/harmonize'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return (PRODUCTS ?? []).map((p) => ({ slug: p.slug }))
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = getProduct(params?.slug)
  if (!product) return notFound()

  return (
    <div className="bg-[#15110C] min-h-screen">
      <div className="mx-auto max-w-[1200px] px-5 pt-28 pb-20">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 font-label uppercase tracking-[0.15em] text-xs text-[#C9BEA5] hover:text-[#D7AC52] transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao portfólio
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <Reveal>
            <div
              className="relative aspect-[3/4] rounded-[10px] overflow-hidden shadow-2xl"
              style={{
                background: `radial-gradient(circle at 50% 35%, ${LIQUID_COLORS?.[product.liquid] ?? 'rgba(214,176,92,0.4)'}, #15110C 72%)`,
              }}
            >
              <Image
                src={product.image}
                alt={`Garrafa da cachaça Remedin ${product.name}`}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow">{product.tier}</p>
            <h1 className="font-display text-4xl md:text-5xl text-[#E8DEC7] mt-2">{product.name}</h1>
            <p className="font-body italic text-xl text-[#D7AC52] mt-3">{product.tagline}</p>
            <p className="font-body text-lg leading-relaxed text-[#C9BEA5] mt-6">{product.description}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {(product.chips ?? []).map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-[#1b150e] px-4 py-1.5 font-label uppercase tracking-[0.12em] text-xs text-[#D7AC52]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Spec icon={<Wine className="h-4 w-4" />} label="Teor alcoólico" value={product.abv} />
              <Spec icon={<Sparkles className="h-4 w-4" />} label="Repouso" value={product.storage} />
              <Spec icon={<Clock className="h-4 w-4" />} label="Volumes" value={(product.volumes ?? []).join(' · ')} />
              <Spec icon={<Award className="h-4 w-4" />} label="Ocasião" value={product.occasion} />
            </div>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-12">
          <Reveal>
            <div className="rounded-[10px] bg-[#1b150e] p-6 md:p-8 shadow-lg h-full">
              <h3 className="font-label uppercase tracking-[0.18em] text-sm text-[#E8DEC7] mb-3">Aroma</h3>
              <p className="font-body text-[#C9BEA5] leading-relaxed">{product.aroma}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[10px] bg-[#1b150e] p-6 md:p-8 shadow-lg h-full">
              <h3 className="font-label uppercase tracking-[0.18em] text-sm text-[#E8DEC7] mb-3">Sabor</h3>
              <p className="font-body text-[#C9BEA5] leading-relaxed">{product.flavor}</p>
            </div>
          </Reveal>
        </div>

        {(product.awards ?? []).length > 0 && (
          <Reveal>
            <div className="rounded-[10px] bg-gradient-to-br from-[#1b150e] to-[#17120c] p-6 md:p-8 shadow-lg mt-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-[#D7AC52]" />
                <h3 className="font-label uppercase tracking-[0.18em] text-sm text-[#E8DEC7]">Reconhecimentos</h3>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {(product.awards ?? []).map((a) => (
                  <li key={a} className="font-body text-[#C9BEA5] flex items-start gap-2">
                    <span className="text-[#B68A3C] mt-1">✦</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <div className="mt-6">
          <Harmonize slug={product.slug} name={product.name} />
        </div>
      </div>
    </div>
  )
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[8px] bg-[#1b150e] px-4 py-3">
      <div className="flex items-center gap-2 text-[#B68A3C] mb-1">{icon}
        <span className="font-label uppercase tracking-[0.12em] text-[10px] text-[#9b8f74]">{label}</span>
      </div>
      <p className="font-body text-[#E8DEC7]">{value}</p>
    </div>
  )
}
