import { NextRequest } from 'next/server'
import { getProduct } from '@/lib/products'
import { getOpenRouterHeaders, OPENROUTER_BASE_URL, OPENROUTER_MODELS } from '@/lib/openrouter'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const slug = body?.slug as string | undefined
    const product = slug ? getProduct(slug) : undefined
    if (!product) {
      return new Response('Produto não encontrado', { status: 404 })
    }

    const prompt = `Você é um sommelier brasileiro especialista em cachaça premium. Escreva uma sugestão de harmonização sofisticada, calorosa e objetiva (máximo 160 palavras) em português do Brasil para a cachaça "${product.name}" (${product.tier}).\n\nPerfil: ${product.harmonizePrompt}\nAroma: ${product.aroma}\nSabor: ${product.flavor}\nOcasião: ${product.occasion}\n\nInclua: 1) dois ou três pratos/petiscos ideais, 2) um momento perfeito para apreciar, 3) uma dica de serviço (temperatura/copo). Use linguagem elegante, sem listas numeradas, em parágrafos curtos. Termine com "Aprecie com moderação."`

    const apiRes = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: getOpenRouterHeaders(),
      body: JSON.stringify({
        model: OPENROUTER_MODELS.text,
        messages: [{ role: 'user', content: prompt }],
        stream: true,
        max_tokens: 600,
      }),
    })

    if (!apiRes.ok || !apiRes.body) {
      const detail = await apiRes.text().catch(() => '')
      console.error('[harmonize] OpenRouter error:', apiRes.status, detail?.slice(0, 300))
      return new Response('Erro ao contatar o serviço de IA', { status: 502 })
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = apiRes.body!.getReader()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()
        let partial = ''
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            partial += decoder.decode(value, { stream: true })
            const lines = partial.split('\n')
            partial = lines.pop() ?? ''
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim()
                if (data === '[DONE]') {
                  controller.close()
                  return
                }
                try {
                  const parsed = JSON.parse(data)
                  const chunk = parsed?.choices?.[0]?.delta?.content
                  if (chunk) controller.enqueue(encoder.encode(chunk))
                } catch {
                  // skip malformed chunks
                }
              }
            }
          }
        } catch (e) {
          controller.error(e)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (e) {
    console.error('[harmonize] Internal error:', e)
    return new Response('Erro interno', { status: 500 })
  }
}
