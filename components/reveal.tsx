'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({ value, suffix = '', className }: { value: number; suffix?: string; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {value}
      {suffix}
    </motion.span>
  )
}
