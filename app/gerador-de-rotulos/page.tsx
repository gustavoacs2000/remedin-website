import { Sparkles } from 'lucide-react'
import LabelGenerator from '@/components/generator/label-generator'
import { Reveal } from '@/components/reveal'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Gerador de Rótulos AI | Remedin',
  description: 'Crie rótulos de cachaça premium com inteligência artificial e visualize em uma garrafa 3D.',
}

export default function GeneratorPage() {
  return (
    <div className="bg-[#15110C] min-h-screen">
      <div className="mx-auto max-w-[1200px] px-5 pt-28 pb-20">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow center"><Sparkles className="inline h-3.5 w-3.5 mr-1" /> Estúdio criativo</p>
            <h1 className="font-display text-4xl md:text-5xl text-[#E8DEC7] mt-2">Gerador de Rótulos AI</h1>
            <p className="font-body text-lg text-[#C9BEA5] max-w-2xl mx-auto mt-4">
              Desenhe o rótulo da sua própria cachaça com inteligência artificial. Descreva sua
              visão, escolha o estilo e veja o resultado em uma garrafa interativa.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <LabelGenerator />
        </div>
      </div>
    </div>
  )
}
