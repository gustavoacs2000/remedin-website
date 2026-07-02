'use client'

import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Harmonize({ slug, name }: { slug?: string; name?: string }) {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  async function run() {
    setLoading(true)
    setError('')
    setText('')
    try {
      const res = await fetch('/api/harmonize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      if (!res.ok || !res.body) throw new Error('Falha ao gerar harmonização')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setText((prev) => prev + decoder.decode(value))
      }
    } catch (e: any) {
      setError('Não foi possível gerar a sugestão agora. Tente novamente em instantes.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-[10px] bg-[#1b150e] p-6 md:p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <Sparkles className="h-5 w-5 text-[#D7AC52]" />
        <h3 className="font-label uppercase tracking-[0.18em] text-sm text-[#E8DEC7]">
          Harmonização inteligente
        </h3>
      </div>
      <p className="font-body text-[#C9BEA5] mb-5">
        Deixe nosso sommelier digital sugerir pratos, drinks e momentos ideais para a {name ?? 'Remedin'}.
      </p>
      <button
        onClick={run}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-[6px] bg-[#B68A3C] px-6 py-3 font-label uppercase tracking-[0.15em] text-sm text-[#15110C] transition hover:bg-[#D7AC52] disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? 'Harmonizando…' : 'Harmonizar com IA'}
      </button>
      {error && <p className="mt-4 font-body text-[#cf8b6e]">{error}</p>}
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 whitespace-pre-wrap font-body text-lg leading-relaxed text-[#D8CEB8] border-t border-[#3a2f1f] pt-6"
        >
          {text}
        </motion.div>
      )}
    </div>
  )
}
