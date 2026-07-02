'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'

const FEATURED = PRODUCTS.filter((p) => p?.featured)
const HERO_BG = 'https://cdn.abacus.ai/images/b4770caa-7d73-490c-8eb7-5ce5bc11554b.png'

export function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FEATURED.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const current = FEATURED[index] ?? FEATURED[0]

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_BG}
          alt="Alambique de cobre e barris no Cerrado"
          fill
          priority
          className="object-cover"
          style={{ filter: 'sepia(0.25) contrast(1.05) brightness(0.5) saturate(0.95)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15110C]/95 via-[#15110C]/75 to-[#7A3320]/30" />
      </div>
      <div className="ornament-frame z-20" />

      <div className="relative z-30 mx-auto grid w-full max-w-[1200px] items-center gap-10 px-6 pt-[74px] md:grid-cols-2">
        {/* Text */}
        <div className="max-w-xl">
          <span className="eyebrow">Est. no Cerrado · Brasília-DF</span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.04] text-[#f3e8d4] sm:text-5xl md:text-6xl">
            A nova geração da <span className="gold-text">cachaça</span> de Brasília.
          </h1>
          <p className="mt-5 max-w-md font-body text-lg italic text-[#d8c9b1]">
            Madeiras nativas do Cerrado, alambique de cobre e técnica moderna. Cada gota carrega a
            história de quem faz cachaça de verdade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/produtos"
              className="font-label inline-flex items-center gap-2 rounded-sm bg-secondary px-6 py-3.5 text-xs uppercase tracking-[0.12em] text-secondary-foreground transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Ver os rótulos <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/gerador-de-rotulos"
              className="font-label inline-flex items-center gap-2 rounded-sm border border-primary/60 px-6 py-3.5 text-xs uppercase tracking-[0.12em] text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Sparkles className="h-4 w-4" /> Criar meu rótulo com IA
            </Link>
          </div>
        </div>

        {/* Auto carousel of featured bottles */}
        <div className="relative hidden h-[480px] items-end justify-center md:flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.slug}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="relative h-[420px] w-[300px]">
                <Image
                  src={current?.image ?? ''}
                  alt={current?.name ?? 'Garrafa Remedin'}
                  fill
                  className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="font-label text-[0.6rem] uppercase tracking-[0.2em] text-accent">{current?.tier}</div>
                <div className="font-display text-2xl text-[#f1e6d2]">{current?.name?.replace('Remedin ', '')}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-2 flex gap-2">
            {FEATURED.map((p, i) => (
              <button
                key={p?.slug}
                aria-label={`Ver ${p?.name}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-accent' : 'w-1.5 bg-primary/40 hover:bg-primary/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
