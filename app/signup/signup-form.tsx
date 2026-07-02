'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, Lock, Mail, User } from 'lucide-react'

export default function SignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.error ?? 'Não foi possível criar a conta.')
        return
      }
      const login = await signIn('credentials', { email, password, redirect: false })
      if (login?.error) {
        router.replace('/login')
      } else {
        router.replace('/gerador-de-rotulos')
      }
    } catch {
      setError('Não foi possível criar a conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full rounded-[6px] bg-[#0f0c08] border border-[#3a2f1f] pl-11 pr-4 py-3 font-body text-[#E8DEC7] placeholder:text-[#6b6253] focus:outline-none focus:border-[#B68A3C] transition'

  return (
    <div className="bg-[#15110C] min-h-screen flex items-center justify-center px-5 pt-28 pb-20">
      <div className="w-full max-w-md rounded-[10px] bg-[#1b150e] p-8 shadow-2xl">
        <p className="eyebrow center">Junte-se</p>
        <h1 className="font-display text-3xl text-[#E8DEC7] text-center mt-2">Criar conta</h1>
        <p className="font-body text-[#C9BEA5] text-center mt-2">Crie e guarde seus rótulos personalizados.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9b8f74]" />
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className={inputCls} />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9b8f74]" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className={inputCls} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9b8f74]" />
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha (mínimo 6 caracteres)" className={inputCls} />
          </div>
          {error && <p className="font-body text-[#cf8b6e] text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#B68A3C] px-6 py-3.5 font-label uppercase tracking-[0.15em] text-sm text-[#15110C] transition hover:bg-[#D7AC52] disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Criar conta
          </button>
        </form>
        <p className="font-body text-center text-[#C9BEA5] mt-6">
          Já tem conta? <Link href="/login" className="text-[#D7AC52] hover:text-[#E8DEC7] transition">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
