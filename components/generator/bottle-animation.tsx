'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

const MODELS = [
  { id: 'classic', name: 'Clássica', body: '#1f1710', liquid: '#b07628', glass: '#2a201580' },
  { id: 'tall', name: 'Premium Alta', body: '#181109', liquid: '#7a461c', glass: '#23190f80' },
  { id: 'short', name: 'Reserva Baixa', body: '#241a10', liquid: '#d6b05c', glass: '#2e231580' },
]

export default function BottleAnimation({ labelSrc }: { labelSrc?: string | null }) {
  const [modelIndex, setModelIndex] = useState(0)
  const [disassembled, setDisassembled] = useState(false)
  const model = MODELS?.[modelIndex] ?? MODELS[0]

  function cycleModel() {
    setModelIndex((i) => (i + 1) % MODELS.length)
  }

  return (
    <div className="rounded-[10px] bg-gradient-to-b from-[#1b150e] to-[#0f0c08] p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-label uppercase tracking-[0.18em] text-sm text-[#E8DEC7]">Pré-visualização 3D</h3>
        <span className="font-label uppercase tracking-[0.12em] text-[11px] text-[#D7AC52]">{model.name}</span>
      </div>

      <div className="relative mx-auto flex h-[420px] w-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.svg
            key={model.id}
            viewBox="0 0 200 460"
            className="h-full w-auto drop-shadow-2xl"
            initial={{ opacity: 0, rotateY: -30 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 30 }}
            transition={{ duration: 0.5 }}
          >
            {/* cork */}
            <motion.rect x="82" y="6" width="36" height="34" rx="4" fill="#3a2a18"
              animate={{ y: disassembled ? -4 : 6 }} transition={{ type: 'spring', stiffness: 120 }} />
            {/* neck */}
            <path d="M84 38 h32 v46 q0 8 8 14 l6 6 v0 h-66 l6-6 q8-6 8-14 z" fill={model.body} />
            {/* body */}
            <rect x="40" y="104" width="120" height="330" rx="22" fill={model.body} />
            {/* liquid */}
            <rect x="48" y="150" width="104" height="276" rx="16" fill={model.liquid} opacity={0.55} />
            {/* glass highlight */}
            <rect x="54" y="120" width="18" height="300" rx="9" fill={model.glass} />

            {/* label (disassembles outward) */}
            <motion.g
              animate={{ x: disassembled ? 70 : 0, opacity: disassembled ? 0.92 : 1, rotate: disassembled ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14 }}
              style={{ originX: '100px', originY: '300px' }}
            >
              {labelSrc ? (
                <image href={labelSrc} x="50" y="196" width="100" height="150" preserveAspectRatio="xMidYMid slice" />
              ) : (
                <g>
                  <rect x="54" y="200" width="92" height="150" rx="6" fill="#0f0c08" stroke="#B68A3C" strokeWidth="1.5" />
                  <rect x="62" y="208" width="76" height="134" rx="3" fill="none" stroke="#B68A3C" strokeWidth="0.6" />
                  <text x="100" y="244" textAnchor="middle" fill="#D7AC52" fontFamily="serif" fontSize="20" fontWeight="bold">R</text>
                  <text x="100" y="272" textAnchor="middle" fill="#E8DEC7" fontFamily="serif" fontSize="11" letterSpacing="2">REMEDIN</text>
                  <line x1="74" y1="284" x2="126" y2="284" stroke="#B68A3C" strokeWidth="0.6" />
                  <text x="100" y="304" textAnchor="middle" fill="#9b8f74" fontFamily="serif" fontSize="7" letterSpacing="1">CACHAÇA ARTESANAL</text>
                </g>
              )}
            </motion.g>
          </motion.svg>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <button onClick={() => setDisassembled((v) => !v)}
          className="rounded-[6px] bg-[#B68A3C] px-5 py-2.5 font-label uppercase tracking-[0.12em] text-xs text-[#15110C] transition hover:bg-[#D7AC52]">
          {disassembled ? 'Montar rótulo' : 'Desmontar rótulo'}
        </button>
        <button onClick={cycleModel}
          className="inline-flex items-center gap-2 rounded-[6px] border border-[#B68A3C]/50 px-5 py-2.5 font-label uppercase tracking-[0.12em] text-xs text-[#D7AC52] transition hover:bg-[#1b150e]">
          <RefreshCw className="h-3.5 w-3.5" /> Trocar garrafa
        </button>
      </div>
    </div>
  )
}
