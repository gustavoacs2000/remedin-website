'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

const NAV = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'A Marca' },
  { href: '/produtos', label: 'Os Rótulos' },
  { href: '/receitas', label: 'Receitas' },
  { href: '/blog', label: 'Blog' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname() || '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#15110C]/90 backdrop-blur-md border-b border-primary/25' : 'bg-gradient-to-b from-[#15110C]/85 via-[#15110C]/40 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="group flex flex-col leading-none" style={{ textShadow: scrolled ? 'none' : '0 1px 6px rgba(0,0,0,0.85)' }}>
          <span className="font-label text-lg font-bold tracking-[0.3em] text-foreground">REMEDIN</span>
          <span className="font-label mt-0.5 text-[0.46rem] tracking-[0.4em] text-[#D7AC52]">EST. CERRADO · BRASÍLIA</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-label text-xs uppercase tracking-[0.1em] transition-colors ${
                  active ? 'text-accent' : 'text-muted-foreground hover:text-accent'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/gerador-de-rotulos"
            className="font-label inline-flex items-center gap-2 rounded-sm bg-secondary px-4 py-2 text-xs uppercase tracking-[0.12em] text-secondary-foreground transition hover:brightness-110"
          >
            <Sparkles className="h-3.5 w-3.5" /> Gerador de Rótulos
          </Link>
        </nav>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-primary/20 bg-[#15110C]/97 px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-label text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/gerador-de-rotulos"
              className="font-label mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-secondary px-4 py-3 text-xs uppercase tracking-[0.12em] text-secondary-foreground"
            >
              <Sparkles className="h-3.5 w-3.5" /> Gerador de Rótulos
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
