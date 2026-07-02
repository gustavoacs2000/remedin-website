'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Wand2, Loader2, Download, RefreshCw, Upload, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BottleAnimation from './bottle-animation'

const STYLES = [
  { id: 'vintage', label: 'Vintage' },
  { id: 'moderno', label: 'Moderno' },
  { id: 'rustico', label: 'Rústico' },
  { id: 'minimalista', label: 'Minimalista' },
]

type Form = {
  cachacaName: string
  cachacaType: string
  year: string
  origin: string
  volume: string
  abv: string
  style: string
  description: string
}

export default function LabelGenerator() {
  const [form, setForm] = useState<Form>({
    cachacaName: '',
    cachacaType: 'Cachaça Artesanal',
    year: '',
    origin: 'Brasília, DF',
    volume: '700ml',
    abv: '40%',
    style: 'vintage',
    description: '',
  })
  const [refPreview, setRefPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...(f ?? {}), [key]: value }))
  }

  function onRefChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.target?.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setRefPreview(typeof reader.result === 'string' ? reader.result : null)
    reader.readAsDataURL(file)
  }

  async function generate() {
    if (!form.cachacaName?.trim()) {
      setError('Informe o nome da cachaça para gerar o rótulo.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, reference: refPreview }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? 'Falha ao gerar')
      }
      setResult(data.url)
    } catch (e: any) {
      setError('Não foi possível gerar o rótulo agora. Tente novamente em instantes.')
    } finally {
      setLoading(false)
    }
  }

  async function download() {
    if (!result) return
    try {
      const res = await fetch(result)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `rotulo-remedin-${(form.cachacaName || 'label').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      window.open(result, '_blank')
    }
  }

  const inputCls =
    'w-full rounded-[6px] bg-[#0f0c08] border border-[#3a2f1f] px-4 py-3 font-body text-[#E8DEC7] placeholder:text-[#6b6253] focus:outline-none focus:border-[#B68A3C] transition'
  const labelCls = 'font-label uppercase tracking-[0.12em] text-[11px] text-[#9b8f74] mb-1.5 block'

  return (
    <div className="grid gap-8 lg:grid-cols-2 items-start">
      {/* FORM */}
      <div className="rounded-[10px] bg-[#1b150e] p-6 md:p-8 shadow-lg">
        <h2 className="font-display text-2xl text-[#E8DEC7] mb-6">Personalize seu rótulo</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Nome da cachaça *</label>
            <input className={inputCls} value={form.cachacaName} onChange={(e) => update('cachacaName', e.target.value)} placeholder="Ex.: Remedin Reserva" />
          </div>
          <div>
            <label className={labelCls}>Tipo</label>
            <input className={inputCls} value={form.cachacaType} onChange={(e) => update('cachacaType', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Ano / Safra</label>
            <input className={inputCls} value={form.year} onChange={(e) => update('year', e.target.value)} placeholder="2024" />
          </div>
          <div>
            <label className={labelCls}>Origem</label>
            <input className={inputCls} value={form.origin} onChange={(e) => update('origin', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Volume</label>
            <input className={inputCls} value={form.volume} onChange={(e) => update('volume', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Teor alcoólico</label>
            <input className={inputCls} value={form.abv} onChange={(e) => update('abv', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Estilo visual</label>
            <select className={inputCls} value={form.style} onChange={(e) => update('style', e.target.value)}>
              {STYLES.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0f0c08]">{s.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Descrição do rótulo</label>
            <textarea className={inputCls + ' min-h-[90px] resize-y'} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Descreva cores, elementos, símbolos, sensações desejadas..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Imagem de referência (opcional)</label>
            {refPreview ? (
              <div className="relative inline-block">
                <div className="relative h-28 w-28 rounded-[6px] overflow-hidden bg-[#0f0c08]">
                  <Image src={refPreview} alt="Referência" fill className="object-cover" />
                </div>
                <button onClick={() => setRefPreview(null)} className="absolute -top-2 -right-2 rounded-full bg-[#7A3320] p-1 text-[#E8DEC7]"><X className="h-3.5 w-3.5" /></button>
              </div>
            ) : (
              <label className="flex cursor-pointer items-center gap-3 rounded-[6px] border border-dashed border-[#3a2f1f] px-4 py-4 text-[#9b8f74] hover:border-[#B68A3C] transition">
                <Upload className="h-5 w-5" />
                <span className="font-body text-sm">Enviar imagem de inspiração</span>
                <input type="file" accept="image/*" className="hidden" onChange={onRefChange} />
              </label>
            )}
          </div>
        </div>

        {error && <p className="mt-4 font-body text-[#cf8b6e]">{error}</p>}

        <button onClick={generate} disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#B68A3C] px-6 py-4 font-label uppercase tracking-[0.15em] text-sm text-[#15110C] transition hover:bg-[#D7AC52] disabled:opacity-60">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5" />}
          {loading ? 'Criando seu rótulo…' : 'Gerar rótulo com IA'}
        </button>
      </div>

      {/* PREVIEW */}
      <div className="space-y-6">
        <BottleAnimation labelSrc={result} />

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-[10px] bg-[#1b150e] p-6 shadow-lg">
              <h3 className="font-label uppercase tracking-[0.18em] text-sm text-[#E8DEC7] mb-4">Rótulo gerado</h3>
              <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] rounded-[6px] overflow-hidden bg-[#0f0c08]">
                <Image src={result} alt="Rótulo gerado" fill className="object-contain" unoptimized />
              </div>
              <div className="flex flex-wrap gap-3 mt-5 justify-center">
                <button onClick={download} className="inline-flex items-center gap-2 rounded-[6px] bg-[#B68A3C] px-5 py-2.5 font-label uppercase tracking-[0.12em] text-xs text-[#15110C] transition hover:bg-[#D7AC52]">
                  <Download className="h-4 w-4" /> Baixar PNG
                </button>
                <button onClick={generate} disabled={loading} className="inline-flex items-center gap-2 rounded-[6px] border border-[#B68A3C]/50 px-5 py-2.5 font-label uppercase tracking-[0.12em] text-xs text-[#D7AC52] transition hover:bg-[#0f0c08] disabled:opacity-60">
                  <RefreshCw className="h-4 w-4" /> Gerar novamente
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
