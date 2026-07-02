import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadBuffer, getFileUrl } from '@/lib/s3'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const STYLE_HINTS: Record<string, string> = {
  vintage: 'estilo vintage clássico, ornamentos dourados, tipografia serifada antiga, fundo escuro envelhecido',
  moderno: 'estilo moderno e minimalista de luxo, linhas limpas, contraste elegante, tipografia contemporânea',
  rustico: 'estilo rústico artesanal, textura de papel kraft, traços à mão, ar de alambique tradicional',
  minimalista: 'estilo minimalista premium, muito espaço em branco, poucos elementos, sofisticação discreta',
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json().catch(() => ({}))
    const {
      cachacaName = 'Remedin',
      cachacaType = 'Cachaça Artesanal',
      year = '',
      origin = 'Brasília, DF',
      volume = '700ml',
      abv = '40%',
      style = 'vintage',
      description = '',
    } = body ?? {}

    const styleHint = STYLE_HINTS?.[style] ?? STYLE_HINTS.vintage
    const prompt = `Crie um rótulo de garrafa de cachaça premium brasileira, formato retangular vertical, alta resolução, pronto para impressão. ${styleHint}.\n\nNome da cachaça em destaque: "${cachacaName}". Tipo: ${cachacaType}. Origem: ${origin}. Volume: ${volume}. Teor alcoólico: ${abv}.${year ? ` Ano/Safra: ${year}.` : ''}\n\nDetalhes adicionais do cliente: ${description || 'paleta em preto e dourado, molduras ornamentais, ar sofisticado e artesanal.'}\n\nO rótulo deve conter molduras decorativas, hierarquia tipográfica clara, e parecer um rótulo de bebida destilada real e elegante. Apenas o rótulo, centralizado, sem a garrafa.`

    const apiRes = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.1',
        messages: [{ role: 'user', content: prompt }],
        modalities: ['image'],
        image_config: { aspect_ratio: '2:3', num_images: 1 },
      }),
    })

    if (!apiRes.ok) {
      const t = await apiRes.text().catch(() => '')
      return new Response(JSON.stringify({ error: 'Falha na geração de imagem', detail: t?.slice(0, 200) }), { status: 502 })
    }

    const data = await apiRes.json().catch(() => null)
    const images = data?.choices?.[0]?.message?.images ?? []
    const dataUrl: string | undefined = images?.[0]?.image_url?.url
    if (!dataUrl || !dataUrl.startsWith('data:')) {
      return new Response(JSON.stringify({ error: 'Nenhuma imagem retornada pelo serviço' }), { status: 502 })
    }

    // Decode and store in S3
    const base64 = dataUrl.split(',')[1] ?? ''
    const buffer = Buffer.from(base64, 'base64')
    let publicUrl = dataUrl
    let cloudStoragePath = ''
    try {
      const fileName = `rotulo-${cachacaName?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'remedin'}-${Date.now()}.png`
      const up = await uploadBuffer(buffer, fileName, 'image/png', true)
      cloudStoragePath = up?.cloud_storage_path ?? ''
      publicUrl = cloudStoragePath ? await getFileUrl(cloudStoragePath, 'image/png', true) : dataUrl
    } catch {
      // fall back to data URL
    }

    try {
      await prisma.generatedLabel.create({
        data: {
          userId: (session?.user as any)?.id ?? null,
          cachacaName: String(cachacaName),
          cachacaType: String(cachacaType),
          year: String(year ?? ''),
          origin: String(origin),
          volume: String(volume),
          abv: String(abv),
          style: String(style),
          prompt,
          cloudStoragePath: cloudStoragePath || publicUrl,
        },
      })
    } catch {
      // non-blocking
    }

    return new Response(JSON.stringify({ url: publicUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Erro interno ao gerar o rótulo' }), { status: 500 })
  }
}
