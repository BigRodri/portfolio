import type { CaseStudyNarrative } from './ilGenioNarrative'

/**
 * Case longo (mesmo molde que `ilGenioNarrative`): landing Summit Stoneworks, Fort Myers.
 * Uma única captura full-page na narrativa (demais blocos são texto).
 */
export const summitStoneworksNarrative = {
  eyebrow: 'Landing page · Summit Stoneworks',
  longTitle: 'Uma vitrine digital à altura do acabamento',
  leadParagraphs: [
    'A Summit Stoneworks é uma empresa de reformas de alto padrão com pedras naturais e engineered stone, atendendo construtores e proprietários na região de Fort Myers, Flórida.\nA landing page é o catálogo digital da empresa, comunica a qualidade do serviço, apresenta os materiais e converte visitantes em contatos qualificados.',
    'Num mercado em que a decisão começa pela percepção de qualidade, a ausência de uma presença online profissional era barreira direta a novos negócios. A Summit não tinha uma vitrine que refletisse o nível de execução das obras. A landing page nasceu para fechar essa lacuna e alinhar a imagem digital ao padrão do trabalho entregue.',
  ],
  resultHighlight:
    'Uma presença que comunica autoridade e sofisticação, hero que qualifica o visitante, galeria que prova a transformação na prática, catálogo que educa sobre materiais antes do contato comercial e formulário com baixa fricção para que a visita vire oportunidade de negócio.',
  note:
    'Métricas de conversão e tráfego dependem de instrumentação e período em produção; o desenho prioriza clareza de proposta, confiança visual e caminho explícito até o contato.',
  meta: [
    { label: 'Papel', value: 'UX Design · UI Design' },
    { label: 'Contexto', value: 'Landing page, alto padrão, B2B e proprietários' },
    { label: 'Stakeholders', value: 'Summit Stoneworks, mercado da Flórida' },
    { label: 'Cobertura', value: 'Pesquisa, Design Thinking, Research, UI e conversão' },
  ] as { label: string; value: string }[],
  startingPoint: {
    kicker: 'O ponto de partida',
    title: 'Sem vitrine digital, a qualidade do trabalho não era óbvia antes do contato',
    body:
      'Em reformas de alto valor, o cliente decide em grande parte pela confiança transmitida online. Sem uma landing page que sustentasse esse discurso, a empresa competia desvantajada na primeira impressão. O projeto começou por entender o mercado e o posicionamento desejado, antes de cor ou estilo de botão: primeiro o que precisava ser dito, em que ordem e para quem.',
  },
  sections: [
    {
      kicker: 'Processo',
      title: 'Pesquisa de campo antes do primeiro wireframe',
      body: [
        'Foi feito um mapeamento de empresas do setor de pedras naturais e reformas de alto padrão na Flórida e em outros mercados americanos: como se apresentam, o que comunicam como diferencial, como organizam serviços e como conduzem o visitante até o contato. Essa análise definiu padrões do segmento e abriu espaço para diferenciação da Summit.',
        'Com o benchmarking consolidado, avançou-se para a arquitetura de conteúdo: quais seções existem, em que ordem e com qual peso narrativo, guiando o visitante da proposta de valor à prova visual, aos serviços, ao catálogo de materiais e à conversão. Cada bloco com função clara na jornada de decisão.',
      ],
    },
    {
      title: 'Padrão de mercado e caminho próprio',
      body: [
        'O benchmarking mostrou convenções do setor e também onde a Summit podia soar mais clara ou mais premium. A estrutura da página não copia um template genérico: combina o que o mercado espera ver com o que só a Summit pode provar (processo, materiais, território).',
      ],
      twoColumn: {
        a: {
          title: 'O que o setor costuma fazer',
          text:
            'Listagem de serviços, galerias genéricas e CTAs dispersos.\nÚtil como linha de base, mas insuficiente quando a decisão é por confiança e detalhe.',
        },
        b: {
          title: 'O que a Summit precisava comunicar',
          text:
            'Autoridade na execução, variedade de materiais e um fluxo que educa antes de vender, para o contato chegar já qualificado.',
        },
      },
    },
    {
      title: 'Wireframes antes do pixel',
      body: [
        'Os wireframes definiram layout por seção, hierarquia da informação, ritmo das imagens e navegação, tudo validado antes de decisões visuais de cor, textura ou estilo fotográfico.',
      ],
    },
    {
      kicker: 'Marca e ritmo',
      title: 'Da estrutura ao visual: identidade aplicada com consistência',
      body: [
        'Somente com wireframes fechados avançou-se ao design visual: identidade da marca (tons dourados, referências à textura de pedra e estética de alto padrão) aplicada de forma consistente em hero, galeria, serviços e catálogo.',
        'A galeria de transformações funciona como prova social material: o visitante vê resultado real antes de pedir orçamento. O catálogo de coleções educa sobre materiais e reduz perguntas repetitivas no primeiro contato comercial.',
      ],
    },
    {
      title: 'Conversão com o mínimo de fricção',
      body: [
        'O formulário de contato foi pensado para reduzir atrito: campos alinhados ao que a equipe precisa qualificar o lead, sem transformar a página em um questionário. O objetivo é transformar visita em conversa comercial com contexto, não apenas volume de cliques.',
      ],
    },
    {
      type: 'screen' as const,
      screenIndex: 0,
      intro:
        'A landing completa em uma única vista: hero com cozinha e navegação, seção “Summit Difference”, galeria de transformações, serviços com imagens de pedras e instalação, carrossel de coleções (Granite e afins), formulário “Get in Touch” e rodapé, com paleta dourado, creme e cinza, serifados nos títulos e motivos de montanha alinhados à marca Summit.',
    },
    {
      kicker: 'Entregas',
      title: 'O que saiu do processo para produção',
      bullets: [
        'Benchmarking de players do setor e síntese de oportunidades de diferenciação.',
        'Arquitetura de conteúdo e wireframes de todas as seções, com hierarquia e navegação validadas.',
        'Design visual completo da landing: identidade Summit (dourado, pedra, alto padrão) e preparação para implementação.',
      ],
    },
  ],
  impact: {
    kicker: 'Impacto no negócio',
    title: 'Presença, confiança e contatos qualificados',
    outcomes: [
      { label: 'Marca', value: 'Alinhada' },
      { label: 'Prova', value: 'Visual' },
      { label: 'Contato', value: 'Qualificado' },
    ],
    closing:
      'A landing posiciona a Summit no mesmo patamar visual das obras que executa: autoridade para quem decide por reforma de alto valor em Fort Myers, com caminho claro da primeira impressão ao primeiro contato e base para medir evolução em produção.',
  },
} satisfies CaseStudyNarrative
