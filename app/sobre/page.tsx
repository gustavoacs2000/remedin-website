import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export const metadata = {
  title: 'A Marca · Cachaça Remedin',
  description: 'A história da Remedin: da receita de família ao alambique de cobre no Cerrado de Brasília.',
}

const TIMELINE = [
  { era: 'O começo', title: 'A receita de família', text: 'Passada de mão em mão no sítio, a cachaça nasce da cana do cerrado.' },
  { era: 'O alambique', title: 'Nasce o Alambique Amana', text: 'Em Sobradinho, no coração do Cerrado, a tradição ganha casa própria e alambique de cobre.' },
  { era: 'A pioneira', title: 'Orgânica de Brasília', text: 'A Remedin se torna uma das primeiras cachaças orgânicas e agroecológicas da capital.' },
  { era: 'O reconhecimento', title: 'Selos & prêmios', text: 'Qualidade reconhecida pela ANPAQ e premiada em concursos nacionais.' },
  { era: 'As madeiras', title: 'A linha cresce', text: 'Carvalho, jatobá, amburana, jequitibá — e a primeira cachaça defumada do Brasil.' },
  { era: 'Hoje', title: 'Tradição que inova', text: 'Feita à mão, lote a lote, com a paciência que a boa cachaça pede.' },
]

export default function SobrePage() {
  return (
    <div className="pt-[74px]">
      {/* Hero */}
      <section className="relative overflow-hidden py-28">
        <Image
          src="https://cdn.abacus.ai/images/07bccb74-861e-48c8-9d25-45677e4fd230.png"
          alt="Alambique de cobre"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.34) saturate(0.9)' }}
        />
        <div className="absolute inset-0 bg-[#15110C]/70" />
        <div className="relative mx-auto max-w-[1200px] px-6 text-center">
          <span className="eyebrow center">A Marca</span>
          <h1 className="mt-4 font-display text-4xl text-[#f3e8d4] md:text-5xl">No tempo do Cerrado.</h1>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg italic text-[#d8c9b1]">
            Da receita do vovô Mandelli ao alambique de cobre. Cada gota carrega a história de quem
            faz cachaça de verdade em Brasília-DF.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#17120c] py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Nossa Casa</span>
            <h2 className="mt-4 font-display text-3xl text-[#f1e6d2]">Tudo começou com uma receita de família.</h2>
            <p className="mt-5 font-body text-lg italic text-[#d8c9b1]">
              “Cachaça boa não tem pressa. É cana madura, fogo no cobre e madeira que sabe esperar.”
            </p>
            <p className="mt-5 font-body text-muted-foreground">
              No Alambique Amana, em Sobradinho, a receita de família virou uma das pioneiras da
              cachaça orgânica de Brasília — agroecológica, certificada e premiada. Sem atalho, sem
              aditivo. Só Cerrado no copo. Mas a Remedin não parou na tradição: transformou as
              madeiras nativas em protagonistas e ampliou as fronteiras do que a cachaça pode ser.
            </p>
            <div className="font-display mt-6 text-xl text-secondary-foreground">— Família Remedin</div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="https://cdn.abacus.ai/images/fe4b610f-878b-4181-a5d2-9a5041566e7a.png"
                alt="Barris de envelhecimento no Cerrado"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-3 border border-primary/30" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#15110C] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="mb-16 text-center">
            <span className="eyebrow center">Linha do tempo</span>
            <h2 className="mt-4 font-display text-3xl text-[#f1e6d2] md:text-4xl">De geração em geração.</h2>
          </Reveal>
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="h-3.5 w-3.5 rotate-45 border-2 border-primary bg-[#15110C]" />
                    {i < TIMELINE.length - 1 && <div className="mt-1 w-px flex-1 bg-gradient-to-b from-primary/70 to-primary/10" />}
                  </div>
                  <div className="pb-2">
                    <div className="font-label text-[0.62rem] uppercase tracking-[0.2em] text-accent">{t.era}</div>
                    <h3 className="mt-1 font-display text-xl text-[#f1e6d2]">{t.title}</h3>
                    <p className="mt-1.5 font-body text-muted-foreground">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/produtos"
              className="font-label inline-flex items-center gap-2 rounded-sm bg-secondary px-7 py-3.5 text-xs uppercase tracking-[0.12em] text-secondary-foreground transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Conheça os rótulos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
