import Image from 'next/image'
import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import { prisma } from '@/lib/db'
import { Reveal } from '@/components/reveal'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog | Remedin',
  description: 'Histórias, guias e novidades do universo da cachaça Remedin.',
}

function fmtDate(d?: Date | null) {
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(d))
  } catch {
    return ''
  }
}

export default async function BlogPage() {
  let posts: any[] = []
  try {
    posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } })
  } catch {
    posts = []
  }

  const featured = posts?.[0]
  const rest = (posts ?? []).slice(1)

  return (
    <div className="bg-[#15110C] min-h-screen">
      <div className="mx-auto max-w-[1200px] px-5 pt-28 pb-20">
        <Reveal>
          <p className="eyebrow center">Diário do Cerrado</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#E8DEC7] text-center mt-2">Blog Remedin</h1>
          <p className="font-body text-lg text-[#C9BEA5] text-center max-w-2xl mx-auto mt-4">
            Histórias de família, guias de madeiras e a cultura da cachaça artesanal brasileira.
          </p>
        </Reveal>

        {featured && (
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block mt-12">
              <article className="grid gap-0 md:grid-cols-2 rounded-[10px] overflow-hidden bg-[#1b150e] shadow-lg transition hover:shadow-2xl">
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px] bg-[#0f0c08]">
                  <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="font-label uppercase tracking-[0.15em] text-xs text-[#D7AC52]">Em destaque</span>
                  <h2 className="font-display text-3xl text-[#E8DEC7] mt-3 group-hover:text-[#D7AC52] transition">{featured.title}</h2>
                  <p className="font-body text-[#C9BEA5] mt-3 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 mt-5 text-[#9b8f74] font-label uppercase tracking-[0.1em] text-[11px]">
                    <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {featured.author}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readMinutes} min</span>
                    <span>{fmtDate(featured.publishedAt)}</span>
                  </div>
                </div>
              </article>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 mt-8">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.08}>
                <Link href={`/blog/${p.slug}`} className="group block h-full">
                  <article className="rounded-[10px] overflow-hidden bg-[#1b150e] shadow-lg transition hover:shadow-2xl hover:-translate-y-1 duration-300 h-full">
                    <div className="relative aspect-[16/10] bg-[#0f0c08]">
                      <Image src={p.coverImage} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="p-6">
                      <h2 className="font-display text-2xl text-[#E8DEC7] group-hover:text-[#D7AC52] transition">{p.title}</h2>
                      <p className="font-body text-[#C9BEA5] mt-2">{p.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4 text-[#9b8f74] font-label uppercase tracking-[0.1em] text-[11px]">
                        <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {p.author}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.readMinutes} min</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
