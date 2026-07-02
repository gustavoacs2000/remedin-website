import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/db'
import { Markdown } from '@/lib/markdown'
import { Reveal } from '@/components/reveal'

export const dynamic = 'force-dynamic'

function fmtDate(d?: Date | null) {
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(d))
  } catch {
    return ''
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post: any = null
  try {
    post = await prisma.blogPost.findUnique({ where: { slug: params?.slug } })
  } catch {
    post = null
  }
  if (!post) return notFound()

  return (
    <div className="bg-[#15110C] min-h-screen">
      <div className="relative h-[42vh] min-h-[320px] w-full">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15110C] via-[#15110C]/60 to-[#15110C]/30" />
      </div>
      <div className="mx-auto max-w-[760px] px-5 -mt-32 relative pb-20">
        <Link href="/blog" className="inline-flex items-center gap-2 font-label uppercase tracking-[0.15em] text-xs text-[#C9BEA5] hover:text-[#D7AC52] transition mb-6">
          <ArrowLeft className="h-4 w-4" /> Todos os artigos
        </Link>
        <p className="eyebrow" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>Blog Remedin</p>
        <h1 className="font-display text-3xl md:text-5xl text-[#E8DEC7] mt-2 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-5 text-[#9b8f74] font-label uppercase tracking-[0.1em] text-[11px]">
          <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {post.author}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readMinutes} min de leitura</span>
          <span>{fmtDate(post.publishedAt)}</span>
        </div>
        <div className="h-px bg-[#3a2f1f] my-8" />
        <Reveal>
          <Markdown content={post.content} />
        </Reveal>
      </div>
    </div>
  )
}
