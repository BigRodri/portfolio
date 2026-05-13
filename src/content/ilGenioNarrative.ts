import type { ProjectModalProductScreen } from './projects'

/**
 * Estrutura narrativa (estilo case study longo, inspirado em layouts editoriais
 * de portfólios de produto). Case de plataforma interna: textos genéricos.
 */
export const ilGenioNarrative = {
  /** Linha de contexto acima do título, estilo “tipo · ano”. */
  eyebrow: 'Plataforma interna B2B · 2026',
  /** Título principal da página (mais descritivo que o nome curto do produto). */
  longTitle: 'Uma jornada visível, da venda à operação',
  leadParagraphs: [
    'Trata-se de uma plataforma web de gestão interna, desenhada para centralizar a jornada de entrega, do primeiro contato comercial ao encerramento da operação, com papéis, estados e SLAs explícitos.',
    'O contexto era operação intensa em múltiplas fases (Kick Off, Onboarding, Implementação, Execução e Encerramento) e várias áreas em paralelo. Sem um sistema unificando a jornada, o andamento real era opaco, o alinhamento “vendido x entregue” dependia de repasses manuais e a gestão tinha pouca previsibilidade.',
  ],
  /** Parágrafo de resultado em destaque: síntese do `result` do projeto. */
  resultHighlight:
    'O efeito prático, um fluxo rastreável, mensurável e controlado, com SLAs acompanhados, histórico por fase e projeto e sinalização de riscos, em vez de informação espalhada em ferramentas soltas.',
  note:
    'Indicadores de ROI e adoção em produção dependem de rollout e definição de KPIs com o negócio; o desenho prioriza a base para medir a partir do go-live.',
  meta: [
    { label: 'Papel', value: 'UX Design · UI Design · Research' },
    { label: 'Contexto', value: 'Produto interno, multiárea' },
    { label: 'Stakeholders', value: 'Comercial, Relacionamento, DEV, Operação, PM, Qualidade' },
    { label: 'Cobertura', value: 'Do comercial à operação, com visão única de gestão' },
  ] as { label: string; value: string }[],
  startingPoint: {
    kicker: 'O ponto de partida',
    title: 'Quando a operação cresce, o “sistema” não pode ser o e-mail',
    body:
      'O desafio era dar visibilidade a quem lidera carteiras e a quem executa, sem duplicar planilhas ou reuniões de alinhamento para cada fase. O desenho partiu de mergulho com os times, mapeamento de handoffs e definição de requisitos fase a fase antes de abrir o Figma em telas “bonitas”. A UI tinha de refletir a operação, critérios de conclusão e regras de gating, não o contrário.',
  },
  sections: [
    {
      kicker: 'Processo',
      title: 'Requisitos com dono, antes de componente com sombra',
      body: [
        'Foram conduzidas sessões de levantamento com Comercial, Relacionamento, TEC, Operação, Planejamento, Qualidade e demais times envolvidos no ciclo de vida. A partir dali, a jornada existente virou mapa: onde a informação se perdia, quem precisava ver o quê em cada fase, e o que de fato barra o avanço de etapa (pré-requisitos, acordos, SLAs).',
        'A arquitetura de informação separa o uso diário (relação e operação) da leitura estratégica (gestão) sem espalhar o mesmo dado em quatro ferramentas.',
      ],
    },
    { type: 'screen' as const, screenIndex: 0, intro: 'A home reúne resumo, jornada por fase e sinais que respondem, em um piscar, “onde estamos e o que puxa risco”.' },
    {
      title: 'No mesmo produto, dois modos de leitura',
      body: [
        'Gestores e operações não negociam a mesma pergunta o tempo todo: umas pessoas precisam de previsão e controle de carteira; outras, de tarefa clara e trilha fase a fase. O desenho evita forçar um único dashboard genérico e organiza o ecossistema em visões alinhadas a perfis (admin, gerente de carteira, operacional).',
      ],
      twoColumn: {
        a: {
          title: 'Foco em carteira e previsão',
          text:
            'Leitura de pipeline, risco, SLA e status de projeto sem abrir cinco canais.\nÚtil para liderança e áreas de relacionamento que precisam de visão de carteira e priorização.',
        },
        b: {
          title: 'Foco em execução fase a fase',
          text: 'Kanban e listas com dependências, kick off interno com formulário completo e tudo o que a operação precisa para tocar a entrega sem reunião de “repasse” toda semana.',
        },
      },
    },
    { type: 'screen' as const, screenIndex: 1, intro: 'A jornada em colunas expõe o avanço por fase, com a mesma linguagem de negócio usada no kick off e com os times.' },
    {
      kicker: 'Escala e consulta',
      title: 'Listas que acompanham o real tamanho da operação',
      body: [
        'À medida que a base de projetos cresce, a lista vira a ferramenta de triagem. Filtros por SLA, risco e status, além de agrupamentos, reduzem carga cognitiva e apoiam decisões de prioridade sem perder a linha do tempo nem o escopo acordado.',
        'Foi cuidada a consistência entre kanban, lista e detalhe: o mesmo dado, com caminhos curtos, para não forçar o usuário a re-aprender a cada tela.',
      ],
    },
    { type: 'screen' as const, screenIndex: 2, intro: 'Listagem densa, mas selecionável: filtros e tabela falam a mesma língua que o restante do fluxo.' },
    {
      title: 'Oportunidade e etapas com contexto',
      body: [
        'O detalhe de oportunidade reúne etapas, requisitos e trilha do que ainda bloqueia avanço, alinhado à ideia de “vendido x entregue” visível, em um só painel, para reduzir desalinhamento entre comercial e operação.',
      ],
    },
    { type: 'screen' as const, screenIndex: 3, intro: 'Painel de oportunidade: etapas, dependências e visão de governança em um contexto fixo.' },
    {
      kicker: 'Entregas',
      title: 'O que deixou de ser ambíguo na mão de quem executa',
      bullets: [
        'Jornada mapeada em estados, gating, SLAs, alertas e rastreabilidade por projeto, fase e área responsável.',
        'Interfaces: home, jornada (kanban), listagem e Kick Off interno, campo a campo, para a operação não depender de interpretação tácita.',
        'Diretrizes de consulta, filtros e agrupamentos coerentes com os perfis de acesso.',
      ],
    },
  ],
  impact: {
    kicker: 'Impacto e governança',
    title: 'Métricas de produto e de operação, na mesma base',
    outcomes: [
      { label: 'Jornada', value: 'Rastreável' },
      { label: 'Governança', value: 'Por fase' },
      { label: 'Operação', value: 'Mensurável' },
    ],
    closing:
      'A plataforma concentra avanço condicionado a pré-requisitos, acompanhamento de SLA, histórico e visão de performance, com menos fragmentação e mais previsibilidade na operação.',
  },
}

export type CaseStudyNarrative = typeof ilGenioNarrative

export function getIlGenioScreen(
  screens: ProjectModalProductScreen[] | undefined,
  index: number,
): ProjectModalProductScreen | undefined {
  if (!screens?.length) return undefined
  return screens[index]
}
