'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/products'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/produtos/${product?.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-sm bg-[#1b150e] p-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-26px_rgba(0,0,0,0.85)]"
      >
        <div className="pointer-events-none absolute inset-[7px] z-10 border border-primary/20" />
        <div className="relative flex h-72 items-end justify-center rounded-sm bg-gradient-to-b from-[#241b11] to-[#150f09] p-4">
          <div className="relative h-64 w-44">
            <Image
              src={product?.image ?? ''}
              alt={product?.name ?? 'Cachaça Remedin'}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
          <div className="font-label text-[0.58rem] uppercase tracking-[0.18em] text-accent">{product?.tier}</div>
          <h3 className="mt-1.5 font-display text-xl text-[#f1e6d2]">{product?.name?.replace('Remedin ', '')}</h3>
          <p className="mt-2 flex-1 font-body text-sm text-muted-foreground">{product?.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(product?.chips ?? []).map((c) => (
              <span
                key={c}
                className="font-label rounded-sm border border-primary/25 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.1em] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
          <span className="mt-4 inline-flex items-center gap-1 font-label text-[0.62rem] uppercase tracking-[0.14em] text-primary transition group-hover:text-accent">
            Conhecer <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
