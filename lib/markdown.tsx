import React from 'react'

// Lightweight markdown renderer for blog content (headings, quotes, bold, italic, paragraphs)
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const safe = text ?? ''
  const tokens = safe.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return tokens.map((tok, i) => {
    if (tok?.startsWith('**') && tok?.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-b-${i}`} className="text-[#E8DEC7] font-semibold">
          {tok.slice(2, -2)}
        </strong>
      )
    }
    if (tok?.startsWith('*') && tok?.endsWith('*')) {
      return (
        <em key={`${keyPrefix}-i-${i}`} className="text-[#D7AC52]/90 italic font-body">
          {tok.slice(1, -1)}
        </em>
      )
    }
    return <React.Fragment key={`${keyPrefix}-t-${i}`}>{tok}</React.Fragment>
  })
}

export function Markdown({ content }: { content?: string }) {
  const blocks = (content ?? '').split(/\n\n+/)
  return (
    <div className="space-y-6">
      {blocks?.map((block, idx) => {
        const b = block?.trim() ?? ''
        if (!b) return null
        if (b.startsWith('## ')) {
          return (
            <h2 key={idx} className="font-display text-2xl md:text-3xl text-[#E8DEC7] mt-10 mb-2">
              {renderInline(b.slice(3), `h-${idx}`)}
            </h2>
          )
        }
        if (b.startsWith('> ')) {
          return (
            <blockquote
              key={idx}
              className="border-l-2 border-[#B68A3C] pl-6 py-2 my-8 font-body italic text-xl text-[#D7AC52]"
            >
              {renderInline(b.slice(2), `q-${idx}`)}
            </blockquote>
          )
        }
        return (
          <p key={idx} className="font-body text-lg leading-relaxed text-[#C9BEA5]">
            {renderInline(b, `p-${idx}`)}
          </p>
        )
      })}
    </div>
  )
}
