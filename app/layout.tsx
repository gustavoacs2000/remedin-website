export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Oswald, Spectral, Zilla_Slab } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { Providers } from '@/components/providers'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AgeGate } from '@/components/age-gate'

const zilla = Zilla_Slab({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' })
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-label' })
const spectral = Spectral({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal', 'italic'], variable: '--font-body' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Cachaça Remedin · A nova geração da cachaça de Brasília',
  description:
    'Cachaça premium de Brasília que explora as madeiras nativas do Cerrado. Do jatobá à amburana, do carvalho francês à primeira cachaça defumada do Brasil.',
  keywords: ['cachaça', 'Remedin', 'Brasília', 'cachaça premium', 'jatobá', 'amburana', 'Cerrado'],
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'Cachaça Remedin · A nova geração da cachaça de Brasília',
    description: 'Cachaça premium de Brasília que explora as madeiras nativas do Cerrado.',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async></script>
      </head>
      <body className={`${zilla.variable} ${oswald.variable} ${spectral.variable} font-body antialiased`}>
        <Providers>
          <AgeGate />
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <Toaster />
          <ChunkLoadErrorHandler />
        </Providers>
      </body>
    </html>
  )
}
