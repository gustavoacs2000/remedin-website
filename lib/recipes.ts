export type Recipe = {
  slug: string
  name: string
  pairing: string
  productSlug: string
  productName: string
  difficulty: string
  time: string
  glass: string
  image: string
  description: string
  ingredients: string[]
  steps: string[]
}

export const RECIPES: Recipe[] = [
  {
    slug: 'caipirinha-classica',
    name: 'Caipirinha Clássica',
    pairing: 'Remedin Prata',
    productSlug: 'prata',
    productName: 'Prata',
    difficulty: 'Fácil',
    time: '5 min',
    glass: 'Copo baixo (old fashioned)',
    image: 'https://cdn.abacus.ai/images/806cf194-0272-4b0d-9558-b98960d2edc4.png',
    description:
      'O clássico imbatível. A pureza da Remedin Prata realça o frescor do limão e o dulçor do açúcar.',
    ingredients: ['1 limão tahiti cortado em cubos', '2 colheres de açúcar', '60 ml de Remedin Prata', 'Gelo a gosto'],
    steps: [
      'Corte o limão em cubos, retirando a parte branca central.',
      'Adicione o açúcar e macere levemente, sem amargar.',
      'Complete com gelo e a Remedin Prata.',
      'Misture bem e sirva imediatamente.',
    ],
  },
  {
    slug: 'rabo-de-galo',
    name: 'Rabo de Galo',
    pairing: 'Remedin Ouro',
    productSlug: 'ouro',
    productName: 'Ouro',
    difficulty: 'Fácil',
    time: '4 min',
    glass: 'Copo baixo',
    image: 'https://cdn.abacus.ai/images/4e36f07a-aab0-4ccb-a998-b0b512fc8298.png',
    description:
      'O coquetel brasileiro por excelência. A maciez amadeirada da Remedin Ouro casa com o vermúte em perfeito equilíbrio.',
    ingredients: ['50 ml de Remedin Ouro', '30 ml de vermúte tinto', 'Casca de laranja', 'Gelo'],
    steps: [
      'Gele um copo baixo com gelo.',
      'Adicione a Remedin Ouro e o vermúte tinto sobre o gelo.',
      'Mexa por 15 segundos com colher bailarina.',
      'Finalize torcendo a casca de laranja sobre a bebida.',
    ],
  },
  {
    slug: 'old-fashioned-brasileiro',
    name: 'Old Fashioned Brasileiro',
    pairing: 'Remedin Jatobá-do-Cerrado',
    productSlug: 'jatoba-do-cerrado',
    productName: 'Jatobá-do-Cerrado',
    difficulty: 'Médio',
    time: '6 min',
    glass: 'Copo baixo com gelo único',
    image: 'https://cdn.abacus.ai/images/ae6a2c4c-ca6e-4698-bbdc-19a3f9d7f51f.png',
    description:
      'A intensidade do jatobá substitui o whisky com brilho. Corpo, especiarias e final seco para um clássico reinventado.',
    ingredients: ['60 ml de Remedin Jatobá-do-Cerrado', '1 colher de açúcar (ou xarope)', '2 dashes de angostura', 'Casca de laranja', 'Gelo único grande'],
    steps: [
      'Dissolva o açúcar com a angostura e algumas gotas de água no copo.',
      'Adicione a Remedin Jatobá e o gelo grande.',
      'Mexa lentamente até gelar e diluir levemente.',
      'Finalize com a casca de laranja torcida.',
    ],
  },
  {
    slug: 'manhattan-brasileiro',
    name: 'Manhattan Brasileiro',
    pairing: 'Remedin Extra Premium',
    productSlug: 'extra-premium',
    productName: 'Extra Premium',
    difficulty: 'Médio',
    time: '6 min',
    glass: 'Taça coupe',
    image: 'https://cdn.abacus.ai/images/31b5bfa6-cb13-41f1-92bb-9a55521db446.png',
    description:
      'A nobreza dos 4 anos em carvalho francês brilha num Manhattan aveludado, complexo e elegante.',
    ingredients: ['60 ml de Remedin Extra Premium', '30 ml de vermúte tinto', '2 dashes de angostura', 'Cereja para finalizar', 'Gelo'],
    steps: [
      'Em um mixing glass com gelo, una a Remedin Extra Premium, o vermúte e a angostura.',
      'Mexa por 20 a 30 segundos.',
      'Coe para uma taça coupe previamente gelada.',
      'Finalize com uma cereja.',
    ],
  },
  {
    slug: 'amburana-mel-siciliano',
    name: 'Amburana, Mel & Limão Siciliano',
    pairing: 'Remedin Amburana',
    productSlug: 'amburana',
    productName: 'Amburana',
    difficulty: 'Fácil',
    time: '5 min',
    glass: 'Copo baixo',
    image: 'https://cdn.abacus.ai/images/4656349e-e6ab-4983-92ec-d3eba8371a62.png',
    description:
      'As especiarias doces da amburana encontram o mel e a acidez do limão siciliano. Perfumado e envolvente.',
    ingredients: ['50 ml de Remedin Amburana', '20 ml de mel', '25 ml de suco de limão siciliano', 'Gelo'],
    steps: [
      'Dissolva o mel no suco de limão siciliano.',
      'Adicione a Remedin Amburana e gelo na coqueteleira.',
      'Bata por 10 segundos e coe para o copo com gelo novo.',
      'Decore com uma rodela fina de limão siciliano.',
    ],
  },
  {
    slug: 'rabo-de-galo-defumado',
    name: 'Rabo de Galo Defumado',
    pairing: 'Remedin Defumada',
    productSlug: 'defumada',
    productName: 'Defumada',
    difficulty: 'Médio',
    time: '7 min',
    glass: 'Copo baixo',
    image: 'https://cdn.abacus.ai/images/7625085e-746a-4671-b9d0-67da5929fc66.png',
    description:
      'O clássico ganha alma de churrasco. As notas defumadas trazem profundidade e intensidade gastronômica.',
    ingredients: ['50 ml de Remedin Defumada', '30 ml de vermúte tinto', 'Casca de laranja tostada', 'Gelo'],
    steps: [
      'Toste levemente a casca de laranja com um maçarico (opcional).',
      'Una a Remedin Defumada e o vermúte sobre gelo no copo.',
      'Mexa por 15 segundos.',
      'Finalize com a casca de laranja tostada.',
    ],
  },
]