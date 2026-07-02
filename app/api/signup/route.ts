export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const email = (body?.email ?? '').toString().trim().toLowerCase()
    const password = (body?.password ?? '').toString()
    const name = (body?.name ?? '').toString().trim()

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'A senha deve ter ao menos 6 caracteres.' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Este e-mail já está cadastrado.' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: { email, password: hashed, name: name || null, role: 'user' },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Não foi possível concluir o cadastro.' }, { status: 500 })
  }
}
