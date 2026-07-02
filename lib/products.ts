export type Product = {
  slug: string
  name: string
  tier: string
  tagline: string
  description: string
  image: string
  liquid: 'clear' | 'light' | 'amber' | 'dark'
  storage: string
  abv: string
  aroma: string
  flavor: string
  occasion: string
  awards: string[]
  volumes: string[]
  chips: string[]
  harmonizePrompt: string
  featured?: boolean
}

export const PRODUCTS: Product[] = [
  {
    slug: 'prata',
    name: 'Remedin Prata',
    tier: 'Clássica',
    tagline: 'A essência pura do alambique.',
    description:
      'A expressão mais pura, leve e versátil da nossa cachaça. Sem passagem por madeira, preserva o frescor da cana-de-açúcar e entrega uma experiência limpa, equilibrada e essencialmente brasileira.',
    image: '/products/prata.jpeg',
    liquid: 'clear',
    storage: 'Inox / recipiente neutro, sem passagem por madeira',
    abv: '38% v/v',
    aroma: 'Notas frescas de cana-de-açúcar, caldo de cana, leve vegetal e álcool bem integrado.',
    flavor: 'Leve, seco, limpo e macio, com boa presença de cana e final suave.',
    occasion: 'Caipirinhas, drinks, churrascos, festas e consumo casual.',
    awards: ['1º Lugar · Prêmio CNA/Sebrae Brasil Artesanal 2022', '3º Lugar · Festival Mundial da Cachaça de Salinas 2025'],
    volumes: ['500mL', '200mL', '50mL'],
    chips: ['500 mL', '38%', 'Prata'],
    harmonizePrompt:
      'Produto: Remedin Prata. Tipo: Cachaça Prata. Armazenamento: Inox, sem madeira. Aroma: cana fresca, caldo de cana, frutado leve. Sabor: leve, seco, limpo, macio, final suave. 38% v/v.',
    featured: true,
  },
  {
    slug: 'ouro',
    name: 'Remedin Ouro',
    tier: 'Premium',
    tagline: 'Maciez e madeira em equilíbrio.',
    description:
      'Uma cachaça macia, equilibrada e levemente amadeirada — a amiga do dia a dia. Combina a presença da madeira com notas suaves da cana, agradável tanto para degustação quanto para drinks encorpados.',
    image: '/products/ouro.jpeg',
    liquid: 'light',
    storage: 'Madeira / carvalho europeu ex-malte',
    abv: '38% v/v',
    aroma: 'Mel, baunilha, cana madura, especiarias leves e dulçor discreto.',
    flavor: 'Macio, equilibrado e levemente adocicado, com madeira presente sem perder o frescor.',
    occasion: 'Churrascos, encontros entre amigos, drinks clássicos e comida mineira.',
    awards: ['Cúpula da Cachaça — Entre as 150 melhores do Brasil'],
    volumes: ['500mL', '200mL', '50mL'],
    chips: ['500 mL', '38%', 'Carvalho'],
    harmonizePrompt:
      'Produto: Remedin Ouro. Tipo: Cachaça Ouro. Armazenamento: Madeira / carvalho. Aroma: mel, baunilha, cana madura, especiarias leves. Sabor: macio, equilibrado, levemente adocicado. 38% v/v.',
    featured: true,
  },
  {
    slug: 'jequitiba-rosa',
    name: 'Remedin Jequitibá-Rosa',
    tier: 'Premium',
    tagline: 'A madeira que respeita a alma da cachaça.',
    description:
      'Elegante, leve e muito equilibrada. O jequitibá é uma madeira brasileira que preserva a identidade da cana, oferecendo suavidade sem mascarar o sabor original. Refinada, delicada e fácil de degustar.',
    image: 'https://cdn.abacus.ai/images/c35ca0de-922b-46f5-9a7b-0bcd2deb6c69.png',
    liquid: 'light',
    storage: 'Madeira brasileira Jequitibá-Rosa',
    abv: '38% v/v',
    aroma: 'Cana fresca, notas herbais leves, madeira delicada e toque floral.',
    flavor: 'Leve, elegante e equilibrado, com madeira sutil e final suave.',
    occasion: 'Degustação leve, presentes, almoços especiais e drinks premium.',
    awards: ['1º Lugar · Concurso Areia Mostra Cachaça 2024'],
    volumes: ['750mL', '50mL'],
    chips: ['750 mL', '38%', 'Jequitibá'],
    harmonizePrompt:
      'Produto: Remedin Jequitibá-Rosa. Tipo: Cachaça em madeira brasileira. Armazenamento: Jequitibá-Rosa. Aroma: cana fresca, herbais leves, madeira delicada, floral. Sabor: leve, elegante, equilibrado, final suave. 38% v/v.',
  },
  {
    slug: 'amburana',
    name: 'Remedin Amburana',
    tier: 'Premium',
    tagline: 'Especiarias doces e brasilidade.',
    description:
      'Aromática, envolvente e cheia de brasilidade. Armazenada em amburana, entrega notas marcantes de especiarias doces, baunilha e canela. Macia, perfumada e perfeita para quem gosta de personalidade e final adocicado.',
    image: '/products/amburana.jpeg',
    liquid: 'light',
    storage: 'Madeira brasileira Amburana',
    abv: '38% v/v',
    aroma: 'Canela, baunilha, especiarias doces, madeira aromática e leve castanha.',
    flavor: 'Macio, levemente adocicado, especiado e persistente, com final envolvente.',
    occasion: 'Presentear, degustar pura, sobremesas, queijos e carne de porco.',
    awards: [],
    volumes: ['750mL', '50mL'],
    chips: ['750 mL', '38%', 'Amburana'],
    harmonizePrompt:
      'Produto: Remedin Amburana. Tipo: Cachaça em madeira brasileira. Armazenamento: Amburana. Aroma: canela, baunilha, especiarias doces, castanha. Sabor: macio, adocicado, especiado, persistente. 38% v/v.',
    featured: true,
  },
  {
    slug: 'jatoba-do-cerrado',
    name: 'Remedin Jatobá-do-Cerrado',
    tier: 'Extra Premium',
    tagline: 'A melhor cachaça do Centro-Oeste.',
    description:
      'Intensa, brasileira e cheia de identidade. Armazenada em jatobá-do-cerrado, madeira nativa de grande personalidade, apresenta corpo, força e complexidade. Para quem busca uma experiência inovadora, marcante e conectada ao Cerrado.',
    image: '/products/jatoba.jpeg',
    liquid: 'amber',
    storage: 'Madeira brasileira Jatobá-do-Cerrado',
    abv: '38% v/v',
    aroma: 'Madeira intensa, chocolate-amargo, frutas vermelhas, especiarias e leve tostado.',
    flavor: 'Encorpado, aveludado, marcante e persistente, com final seco e personalidade robusta.',
    occasion: 'Churrascos, carnes vermelhas, queijos maturados e charutos.',
    awards: [
      '4º Lugar Madeiras Brasileiras — 50 Melhores do Brasil, Cúpula da Cachaça 2026',
      '1º Lugar Ouro · Areia Mostra Cachaça 2024',
      '1º Lugar Grande Ouro · Mió de Goiás 2025 e 2026',
      '1º Lugar Ouro · New Spirits 2026',
    ],
    volumes: ['750mL', '50mL'],
    chips: ['750 mL', '38%', 'Jatobá'],
    harmonizePrompt:
      'Produto: Remedin Jatobá-do-Cerrado. Tipo: Cachaça em madeira brasileira. Armazenamento: Jatobá. Aroma: madeira intensa, especiarias, terroso, castanhas, tostado. Sabor: encorpado, marcante, persistente, final seco. 38% v/v.',
    featured: true,
  },
  {
    slug: 'defumada',
    name: 'Remedin Defumada',
    tier: 'Extra Premium',
    tagline: 'A primeira cachaça defumada do Brasil.',
    description:
      'Intensa, gastronômica e fora do comum. A primeira cachaça com processo voltado para adicionar notas defumadas à bebida. Perfil defumado, notas tostadas e personalidade marcante — para uma experiência sensorial profunda.',
    image: 'https://cdn.abacus.ai/images/a0949cb6-15ff-40f9-bbba-897c65379c24.png',
    liquid: 'dark',
    storage: 'Madeira / blend de carvalho com jatobá, perfil defumado',
    abv: '38% v/v',
    aroma: 'Defumado, madeira tostada, molho barbecue, especiarias e caramelo leve.',
    flavor: 'Marcante, seco, intenso e persistente, com final defumado e presença gastronômica.',
    occasion: 'Churrascos, carnes de fogo, charutos, hambúrguer artesanal e costela.',
    awards: ['2º Lugar · Areia Mostra Cachaça 2025', '3º Lugar · Mió de Goiás 2026'],
    volumes: ['750mL', '200mL', '50mL'],
    chips: ['750 mL', '38%', 'Defumada'],
    harmonizePrompt:
      'Produto: Remedin Defumada. Tipo: Cachaça especial defumada. Armazenamento: madeira com perfil defumado. Aroma: defumado, madeira tostada, especiarias, caramelo. Sabor: marcante, seco, intenso, final defumado. 38% v/v.',
  },
  {
    slug: 'extra-premium',
    name: 'Remedin Extra Premium',
    tier: 'Extra Premium',
    tagline: 'Quatro anos em carvalho francês.',
    description:
      'Sofisticada, complexa e feita para momentos especiais. Envelhecida 4 anos em barril de carvalho europeu ex-malte, apresenta perfil nobre, elegante e persistente — ideal para degustação pura e presentes premium.',
    image: '/products/extra-premium.jpeg',
    liquid: 'amber',
    storage: 'Carvalho Francês ex-malte, envelhecimento prolongado',
    abv: '38% v/v',
    aroma: 'Madeira elegante, baunilha, mel, especiarias, frutas secas e notas tostadas.',
    flavor: 'Complexo, macio e persistente, com madeira integrada, final longo e sensação aveludada.',
    occasion: 'Presentes sofisticados, celebrações e consumo contemplativo.',
    awards: ['2º Lugar · Expocachaça 2021', '1º Lugar · Mió de Goiás 2025'],
    volumes: ['750mL'],
    chips: ['750 mL', '38%', '4 anos'],
    harmonizePrompt:
      'Produto: Remedin Extra Premium. Tipo: Cachaça Extra Premium. Armazenamento: carvalho francês, 4 anos. Aroma: madeira elegante, baunilha, especiarias, frutas secas, tostado. Sabor: complexo, macio, persistente, final longo. 38% v/v.',
    featured: true,
  },
  {
    slug: 'organica-prata',
    name: 'Remedin Orgânica Prata',
    tier: 'Orgânica',
    tagline: 'Pureza, origem e brasilidade.',
    description:
      'Limpa, pura e responsável, criada no sítio do vovô Mandelli em parceria com a Remedin. Exclusivamente de cana caiana e sem passagem por madeira, preserva o frescor da cana e entrega uma experiência leve e sofisticada.',
    image: 'https://cdn.abacus.ai/images/432fb44a-e506-4c66-be85-6b535b9cecad.png',
    liquid: 'clear',
    storage: 'Inox / recipiente neutro, sem passagem por madeira',
    abv: '38% v/v',
    aroma: 'Cana fresca, notas vegetais delicadas e leve dulçor natural.',
    flavor: 'Leve, limpo, seco e equilibrado, com final suave e excelente versatilidade.',
    occasion: 'Drinks premium, caipirinhas especiais e harmonizações com pratos frescos.',
    awards: [],
    volumes: ['500mL'],
    chips: ['500 mL', '38%', 'Orgânica'],
    harmonizePrompt:
      'Produto: Remedin Orgânica Prata. Tipo: Cachaça Prata Orgânica. Armazenamento: Inox, sem madeira. Aroma: cana fresca, vegetal delicado, dulçor natural. Sabor: leve, limpo, seco, equilibrado. 38% v/v.',
  },
  {
    slug: 'organica-jatoba',
    name: 'Remedin Orgânica Jatobá',
    tier: 'Orgânica',
    tagline: 'A força do Cerrado, orgânica.',
    description:
      'Une a pureza da produção orgânica com a força de uma madeira brasileira intensa. Armazenada em jatobá, entrega corpo, complexidade e uma experiência sensorial profunda, conectada ao Cerrado.',
    image: 'https://cdn.abacus.ai/images/e6579ad3-b74c-45c4-9d38-d3e4ba8f10b8.png',
    liquid: 'amber',
    storage: 'Madeira brasileira Jatobá',
    abv: '38% v/v',
    aroma: 'Madeira nativa, especiarias, notas terrosas, castanhas e cana madura.',
    flavor: 'Encorpado, complexo e persistente, com madeira presente e final seco.',
    occasion: 'Presentes premium, churrascos, carnes vermelhas e queijos maturados.',
    awards: [],
    volumes: ['500mL'],
    chips: ['500 mL', '38%', 'Orgânica'],
    harmonizePrompt:
      'Produto: Remedin Orgânica Jatobá. Tipo: Cachaça Orgânica em madeira brasileira. Armazenamento: Jatobá. Aroma: madeira nativa, especiarias, terroso, castanhas. Sabor: encorpado, complexo, persistente, final seco. 38% v/v.',
  },
  {
    slug: 'da-onca',
    name: 'Remedin Da Onça',
    tier: 'Raiz',
    tagline: 'Cachaça raiz para todo momento.',
    description:
      'Direta, popular e cheia de presença. Criada para homenagear a onça-pintada preta e seu filhote que passaram pelo alambique em 2025. Ideal para confraternização, boteco e churrasco — brasileira, intensa e acessível.',
    image: 'https://cdn.abacus.ai/images/da9eb715-3964-4e7d-bb7c-5eb21533e27c.png',
    liquid: 'clear',
    storage: 'Inox / recipiente neutro, sem passagem por madeira',
    abv: '38% v/v',
    aroma: 'Cana-de-açúcar, notas vegetais, frescor alcoólico e rusticidade leve.',
    flavor: 'Seco, intenso e tradicional, com boa presença de cana e final direto.',
    occasion: 'Churrascos, rodas de amigos, festas, feijoada e comida de boteco.',
    awards: [],
    volumes: ['600mL'],
    chips: ['600 mL', '38%', 'Raiz'],
    harmonizePrompt:
      'Produto: Remedin Da Onça. Tipo: Cachaça Prata. Armazenamento: Inox, sem madeira. Aroma: cana, vegetal, frescor, rusticidade. Sabor: seco, intenso, tradicional, final direto. 38% v/v.',
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p?.slug === slug)
}

export const LIQUID_COLORS: Record<Product['liquid'], string> = {
  clear: 'rgba(245,242,230,0.35)',
  light: 'rgba(214,176,92,0.55)',
  amber: 'rgba(176,118,40,0.78)',
  dark: 'rgba(120,70,28,0.85)',
}
