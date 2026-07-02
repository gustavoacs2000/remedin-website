'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function AgeGate() {
  const [open, setOpen] = useState(false)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    try {
      const ok = localStorage.getItem('remedin_age_ok')
      if (ok !== '1') setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const confirm = () => {
    try {
      localStorage.setItem('remedin_age_ok', '1')
    } catch {}
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c0906]/97 px-6"
        >
          <div className="relative max-w-md text-center">
            <div className="ornament-frame" />
            <div className="p-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/60 font-display text-2xl text-primary">
                R
              </div>
              {!denied ? (
                <>
                  <h2 className="font-display text-2xl text-[#f1e6d2]">Você tem 18 anos ou mais?</h2>
                  <p className="font-body mt-3 text-sm text-muted-foreground">
                    Este site apresenta bebida alcoólica. Confirme sua idade para entrar.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                      onClick={confirm}
                      className="font-label rounded-sm bg-secondary px-6 py-3 text-xs uppercase tracking-[0.14em] text-secondary-foreground transition hover:brightness-110"
                    >
                      Tenho 18 anos ou mais
                    </button>
                    <button
                      onClick={() => setDenied(true)}
                      className="font-label rounded-sm border border-primary/50 bg-[#15110C] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#E8DEC7] transition hover:border-primary"
                    >
                      Ainda não
                    </button>
                  </div>
                  <p className="font-label mt-6 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Beba com moderação
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-display text-2xl text-[#f1e6d2]">Volte quando completar 18 anos.</h2>
                  <p className="font-body mt-3 text-sm text-muted-foreground">
                    O conteúdo deste site é destinado a maiores de idade.
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
