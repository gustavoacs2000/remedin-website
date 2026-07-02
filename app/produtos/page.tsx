import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { PRODUCTS } from '@/lib/products'

export const metadata = {
  title: 'Os Rótulos · Cachaça Remedin',
  description: 'Conheça toda a linha Remedin: Prata, Ouro, Amburana, Jatobá-do-Cerrado, Extra Premium e mais.',
}

export default function ProdutosPage() {
  return (
    <div className="pt-[74px]">
      <section className="border-b border-primary/15 bg-[#17120c] py-20">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <span className="eyebrow center">Os Rótulos</span>
          <h1 className="mt-4 font-display text-4xl text-[#f1e6d2] md:text-5xl">Uma garrafa para cada madeira.</h1>
          <p className="mx-auto mt-5 max-w-2xl font-body text-muted-foreground">
            Da branca orgânica às reservas envelhecidas em madeiras nativas. Todas a 38% e
            engarrafadas à mão em Brasília-DF.
          </p>
        </div>
      </section>

      <section className="bg-[#15110C] py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal className="mx-auto mb-12 max-w-3xl rounded-sm border border-primary/20 bg-[#1b150e] p-6 text-center">
            <p className="font-body text-sm text-muted-foreground">
              <span className="text-accent">Para empresas:</span> bares, restaurantes, empórios e
              distribuidoras contam com condições especiais. Consulte também nosso programa de marca
              própria (white label).
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p?.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
