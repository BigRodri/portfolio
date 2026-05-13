import type { CaseStudyNarrative } from './ilGenioNarrative'

/**
 * Case longo com a mesma estrutura editorial que `ilGenioNarrative`:
 * cabeçalho, meta, ponto de partida, blocos + telas + duas colunas + impacto.
 */
export const plataformaGestaoNarrative = {
  eyebrow: 'Plataforma interna clínica · 2025',
  longTitle: 'Uma operação visível, do cadastro ao convênio',
  leadParagraphs: [
    'Trata-se de uma plataforma web de gestão clínica e operacional, desenhada para centralizar cadastro de pacientes, prontuário, checkpoints multidisciplinares, agendamentos e a leitura por convênio, com papéis, estados e histórico explícitos.',
    'O contexto era operação intensa: muitos pacientes em etapas diferentes, times clínico e administrativo em paralelo, ciclos de checkpoint e risco alto quando falta ou dado se perde (glosa, ruptura de tratamento). A ferramenta já existia; o trabalho foi o redesign completo da interface, respeitando regras de negócio e compliance.',
  ],
  resultHighlight:
    'Operação, clínica e gestão passam a ler o mesmo sistema com menos fricção: informação centralizada, hierarquia clara e rastreabilidade entre o que foi contratado com cada operadora e o que foi efetivamente realizado.',
  note:
    'Indicadores quantitativos em produção dependem de definição de KPIs com o negócio e rollout; o desenho prioriza a base para medir a partir do go-live, em linha com restrições de compliance.',
  meta: [
    { label: 'Papel', value: 'UX Design · UI Design' },
    { label: 'Contexto', value: 'Produto existente, redesign' },
    { label: 'Stakeholders', value: 'Gestão, equipe clínica, operação, convênios' },
    { label: 'Cobertura', value: 'Do cadastro ao prontuário, agenda e visão por operadora' },
  ] as { label: string; value: string }[],
  startingPoint: {
    kicker: 'O ponto de partida',
    title: 'Quando a escala sobe, o “sistema” não pode ser o repasse verbal',
    body:
      'O desafio era dar visibilidade a quem decide por carteira e convênio e a quem executa no consultório e na agenda, sem dispersar dados clínicos em canais paralelos. O desenho partiu de imersão com os times, mapeamento de checkpoints e agendamentos e alinhamento ao que o compliance permite alterar na UI antes de abrir telas “bonitas”. A interface tinha de refletir a operação real e o que não pode ser escondido no fluxo regulado.',
  },
  sections: [
    {
      kicker: 'Processo',
      title: 'Operação mapeada, antes de componente com sombra',
      body: [
        'Foram conduzidas sessões com gestão, operação e áreas ligadas a convênios, além de leitura dos fluxos já modelados no produto. A operação existente virou mapa: onde a informação se perdia, quem precisa ver o quê antes de uma consulta ou de um ciclo de checkpoint, e o que barra continuidade quando falta ou dado incompleto.',
        'A arquitetura da informação separa o uso diário (agenda, prontuário, execução) da leitura estratégica (dashboard, metas por operadora, adesão e churn) sem multiplicar fontes de verdade.',
      ],
    },
    {
      type: 'screen' as const,
      screenIndex: 0,
      intro:
        'O dashboard reúne visão macro da operação: pacientes, metas por mês e por operadora, tratamentos, adesão, checkpoints e NPS por especialidade, para responder, em um piscar, “onde estamos e o que puxa risco”.',
    },
    {
      title: 'No mesmo produto, dois modos de leitura',
      body: [
        'Gestão e equipe clínica não perguntam o mesmo tempo todo: umas pessoas precisam de previsão contratual e performance por convênio; outras, de prontuário, histórico e agenda sem saltar entre sistemas. O desenho evita um único painel genérico e organiza visões alinhadas a perfis, mantendo o mesmo paciente e o mesmo tratamento como eixo.',
      ],
      twoColumn: {
        a: {
          title: 'Foco em gestão e convênio',
          text:
            'Planejamento de atendimentos, metas por operadora e leitura de adesão, churn e indicadores de programa.\nÚtil para liderança que precisa cruzar o executado com o contratado e priorizar onde há glosa ou ruptura de continuidade.',
        },
        b: {
          title: 'Foco em execução clínica',
          text:
            'Prontuário unificado com cadastro, tratamentos, agenda, consultas, histórico e medidas; checkpoints e agendamentos com status e modalidade, para o time tocar o cuidado sem reunião de “repasse” a cada paciente.',
        },
      },
    },
    {
      type: 'screen' as const,
      screenIndex: 1,
      intro:
        'A base de pacientes com filtros por convênio, etapa e status expõe escala e triagem: a mesma linguagem de negócio usada no cadastro e no acompanhamento ao longo do programa.',
    },
    {
      kicker: 'Escala e consulta',
      title: 'Listas e prontuário que acompanham o tamanho real da operação',
      body: [
        'À medida que a base cresce, a lista vira ferramenta de triagem; o prontuário individual concentra evolução clínica, plano alimentar, atividade física e histórico de checkpoints, legível de relance e sem forçar o profissional a remontar a história em várias telas.',
        'Foi cuidada a consistência entre dashboard, listagem e detalhe do paciente: o mesmo dado, com caminhos curtos, para não re-aprender a cada módulo.',
      ],
    },
    {
      title: 'Cadastro e continuidade com contexto',
      body: [
        'A entrada estruturada (peso, altura, IMC, comorbidades) e o vínculo de formulários ao agendamento reduzem surpresa na primeira consulta e alimentam o histórico com o que o compliance exige visível, em um fluxo contínuo entre operação e clínica.',
      ],
    },
    {
      type: 'screen' as const,
      screenIndex: 2,
      intro:
        'No prontuário, dados cadastrais, métricas de evolução e abas de tratamento e agenda ficam no mesmo contexto do paciente, sem sistemas paralelos para remontar a história.',
    },
    {
      type: 'screen' as const,
      screenIndex: 3,
      intro:
        'A agenda consolida tratamentos, etapas, canal e datas de agendamento com status visível, ligando execução ao que foi planejado por convênio e programa.',
    },
    {
      type: 'screen' as const,
      screenIndex: 4,
      intro:
        'O histórico reúne timeline de etapas e formulários médicos com triagem e respostas clínicas, base para decisão e continuidade ao longo do programa.',
    },
    {
      kicker: 'Entregas',
      title: 'O que deixou de ser ambíguo na mão de quem executa',
      bullets: [
        'Fluxos de cadastro, prontuário, checkpoints e agendamentos mapeados na interface com hierarquia por tarefa e foco em rastreabilidade.',
        'Interfaces dos módulos principais (gestão, pacientes, prontuário, tratamentos) alinhadas às regras já existentes no produto, com protótipos e especificação para desenvolvimento.',
        'Diretrizes de consistência visual e de navegação para reduzir esforço em tarefas repetitivas e de alto risco (faltas, agenda, histórico).',
      ],
    },
  ],
  impact: {
    kicker: 'Impacto e governança',
    title: 'Operação clínica e indicadores de negócio, na mesma base',
    outcomes: [
      { label: 'Operação', value: 'Centralizada' },
      { label: 'Gestão', value: 'Por convênio' },
    ],
    closing:
      'A plataforma reforça barreira contra perda de informação e falhas no ciclo de agendamento, apoia controle executado versus contratado por operadora e mantém o prontuário como centro da decisão, com menos fragmentação e mais coerência na experiência.',
  },
} satisfies CaseStudyNarrative
