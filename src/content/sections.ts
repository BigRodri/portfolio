export const aboutContent = {
  title: 'Sobre mim',
  /** Tudo no mesmo corpo de texto (um tamanho só): não usar `lead` no SectionHeading. */
  paragraphs: [
    'Minha trajetória começou no desenvolvimento de jogos, um campo que me ensinou antes de qualquer coisa que design é sobre como as pessoas se sentem ao interagir com algo, não sobre como algo parece. Essa base, combinada com um MBA em UX Design e User Research, moldou uma forma de trabalhar que começa sempre pela pergunta certa antes de chegar à tela certa.',
    'Atuo no design de produtos digitais, ferramentas internas e sites, com foco em criar experiências que equilibram função, estética e usabilidade. Cada projeto começa com entendimento profundo do contexto: quem são as pessoas que vão usar, quais são as dores reais da operação, o que o negócio precisa entregar, para só então transformar tudo isso em interfaces claras, hierárquicas e navegáveis.',
    'Acredito que bom design não é o que impressiona em apresentação. É o que funciona sem que ninguém precise perceber que foi pensado.',
  ],
  /** Retrato acima, paisagem abaixo (sobreposição tratada em `App.tsx`). */
  photos: [
    {
      src: '/about/portrait-02.png?v=20260504',
      alt: 'Rodigo Fagundes, retrato ao pôr do sol',
    },
    {
      src: '/about/portrait-01.png?v=20260504',
      alt: 'Rodigo Fagundes, retrato ao ar livre',
    },
  ],
  /** Mesmo padrão dos `scope` nos cards: pares com &, rótulos curtos (cf. Summit / Slimpass). */
  chips: [
    'UX Design & UI Design',
    'Design Thinking',
    'Lean UX',
    'Atomic Design',
    'Design System',
    'User Research',
    'Figma',
    'MCP',
    'AI',
  ],
}

export type ApproachIconId = 'signpost' | 'target' | 'rocket' | 'users-round'

export const approachItems: {
  icon: ApproachIconId
  title: string
  text: string
}[] = [
  {
    icon: 'signpost',
    title: 'Clareza gera confiança',
    text: 'Quando a interface explica o próximo passo, o usuário relaxa e a conversão sobe com menos “truques”.',
  },
  {
    icon: 'target',
    title: 'Estratégia antes do pixel',
    text: 'Desenho a partir de hipóteses mensuráveis: o que mudamos, por quê, e como vamos saber se funcionou.',
  },
  {
    icon: 'rocket',
    title: 'Feito > perfeito',
    text: 'Prefiro entregar ciclos curtos com aprendizado real a esperar o layout “ideal” no vácuo.',
  },
  {
    icon: 'users-round',
    title: 'Design em time',
    text: 'Envolvimento com engenharia e negócios cedo evita retrabalho e mantém o que foi desenhado vivo em produção.',
  },
]

export type ProcessIconId = 'search' | 'waypoints' | 'package-check'

export const processSteps: {
  icon: ProcessIconId
  title: string
  text: string
}[] = [
  {
    icon: 'search',
    title: 'Entender e alinhar',
    text: 'Mapeio contexto, restrições e métricas. Saímos com um norte claro: problema, público, sucesso e riscos.',
  },
  {
    icon: 'waypoints',
    title: 'Explorar e definir',
    text: 'Fluxos, jornadas e protótipos navegáveis para testar suposições com rapidez, sem perder rigor.',
  },
  {
    icon: 'package-check',
    title: 'Refinar e entregar',
    text: 'UI com tokens, estados e microcópia. Handoff com specs e acompanhamento pós-release quando faz sentido.',
  },
]
