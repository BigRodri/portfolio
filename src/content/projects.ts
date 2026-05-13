export type ProjectModalProductScreen = {
  label: string
  imageSrc: string
  imageAlt: string
  /** Largura intrínseca do PNG (px), ex. 3840. Ajuda o layout a reservar o espaço. */
  width?: number
  /** Altura intrínseca do PNG (px), ex. 2160. */
  height?: number
}

export type Project = {
  slug: string
  title: string
  coverSrc?: string
  /**
   * Card na home: texto + CTA à esquerda; mockup e métricas à direita (conforme dados).
   */
  homeCardVariant?: 'violet-panel'
  /**
   * Tom do gradiente no `violet-panel`.
   * `default`: roxo quente do case jornada (já usado no projeto).
   * `blue-violet`: roxo-acinzentado mais frio/indigo (ex.: plataforma clínica).
   * `mauve-plum`: roxo-ameixa / vinho rosado (ex.: Summit Stoneworks).
   */
  homeCardPanelPalette?: 'default' | 'blue-violet' | 'mauve-plum'
  /** Rótulo do botão em pílula (card `violet-panel`); default no UI. */
  homeCardPanelCtaLabel?: string
  /** Logótipo opcional no topo à esquerda do card `violet-panel` (`public/`). */
  homeCardPanelLogoSrc?: string
  homeCardPanelLogoAlt?: string
  /** Mockup à direita no card `violet-panel` (`public/`). */
  homeCardPanelImageSrc?: string
  homeCardPanelImageAlt?: string
  /**
   * Se verdadeiro, remove fundo chroma verde no browser (PNG com moldura verde em `homeCardPanelImageSrc`).
   */
  homeCardPanelChromaKey?: boolean
  /** Métricas sob o mockup (ou só no card se não houver imagem). */
  homeCardPanelStats?: {
    label: string
    value: string
    /** Destaque visual do valor (ex. indicador positivo em verde). */
    valueTone?: 'positive'
  }[]
  /** Se verdadeiro, o bloco de métricas fica centrado horizontalmente sob o mockup. */
  homeCardPanelStatsCentered?: boolean
  hideTitle?: boolean
  /** Título na coluna direita do card quando a capa esconde o título (`hideTitle`). */
  cardAsideTitle?: string
  tagline: string
  /** Texto de abertura na modal; se vazio, usa `tagline`. */
  modalTagline?: string
  year: string
  role: string
  scope: string[]
  outcomes: { label: string; value: string }[]
  highlights: string[]
  problem: string
  approach: string[]
  deliverables: string[]
  /** Resumo de resultado/impacto (seção adicional na modal, opcional). */
  result?: string
  /** Classes extras para o bloco de cabeçalho da modal (ex.: cor de marca). */
  modalHeaderClassName?: string
  /** Cabeçalho com fundo de marca (ex.: rosa) e textos em claro. */
  modalHeaderOnBrand?: boolean
  /** Título da seção de capturas (ex.: "Interfaces do produto"). */
  modalScreensSectionTitle?: string
  /**
   * Telas do produto exibidas no fim do resumo, no mesmo scroll da modal (sem abas).
   * Imagens em `public/`. (Este case: 3840×2160 nas capturas.)
   */
  modalProductScreens?: ProjectModalProductScreen[]
  /** Página de case em formato narrativo longo (mesmo layout editorial). */
  caseStudyLayout?: 'narrative-ilgenio' | 'narrative-plataforma-gestao' | 'narrative-summit-stoneworks'
}

/** Cor de destaque do header da modal on-brand (chips e bullets alinham a ela). */
/** Mesma cor que `theme.colors.primary` (Tailwind). */
export const ON_BRAND_MODAL_ACCENT = '#79538E'

/** Ano e papéis (header da modal) com ponto médio, alinhado ao padrão visual do card: “2026 · A · B · C”. */
export function projectMetaLine(p: Pick<Project, 'year' | 'role'>): string {
  const segments = p.role
    .split(/\s*[,;]\s*|\s*·\s*|\s*•\s*/u)
    .map((s) => s.trim())
    .filter(Boolean)
  return [p.year, ...segments].join(' · ')
}

/** Texto de meta na capa do card: só ano + role como salvo, com um único ponto médio após o ano. */
export function projectCardMetaLine(p: Pick<Project, 'year' | 'role'>): string {
  return `${p.year} · ${p.role.trim()}`
}

/** Altere ao substituir capturas em `public/projects/il-genio/` (invalidação de cache). */
const INTERNAL_SCREENSHOTS_ASSET_V = '20260506-jornada-listagem-v2'

export const projects: Project[] = [
  {
    slug: 'checkout-otimizacao',
    title: 'Ferramenta interna',
    homeCardVariant: 'violet-panel',
    homeCardPanelImageSrc: '/projects/jornada-cliente-mockup.png?v=20260512mockup',
    homeCardPanelChromaKey: true,
    homeCardPanelImageAlt:
      'Interfaces da ferramenta de jornada do cliente em iMac e MacBook.',
    homeCardPanelCtaLabel: 'Ver estudo de caso',
    homeCardPanelStats: [
      { label: 'SLA médio cumprido', value: '93%' },
      { label: 'Projetos no prazo', value: '86%' },
      { label: 'Tempo médio por etapa', value: '9 dias' },
    ],
    hideTitle: true,
    cardAsideTitle: 'Ferramenta de jornada\ndo cliente',
    tagline:
      'Plataforma interna que orquestra a jornada de projetos\n(venda → operação) com fases, SLAs, histórico e visão\npara a gestão.',
    modalTagline:
      'Plataforma web de gestão interna, desenhada para centralizar a jornada de entregas complexas, da origem comercial ao encerramento operacional, com estados, responsáveis e SLAs explícitos, sem depender de planilhas dispersas nem de várias ferramentas em paralelo.',
    modalHeaderClassName: 'border-white/20 bg-primary',
    modalHeaderOnBrand: true,
    year: '2026',
    caseStudyLayout: 'narrative-ilgenio',
    role: 'UX Design · UI Design · Research',
    scope: [
      'Jornada por fases',
      'Dashboards & KPIs',
      'Regras de negócio',
      'Múltiplas áreas',
    ],
    outcomes: [
      { label: 'Jornada', value: 'Rastreável' },
      { label: 'Governança', value: 'Por fase' },
      { label: 'Operação', value: 'Mensurável' },
    ],
    highlights: [
      'Fluxo fase a fase (Kick Off, Onboarding, Implementação, Execução, Encerramento)',
      'Kanban da jornada e listagem com filtros (SLA, risco, status)',
      'Dashboards com visão consolidada e indicadores por projeto',
      'Controle de SLAs, alertas e histórico por projeto',
      'Kick Off interno com formulário completo e requisitos mapeados',
      'Experiência por perfil: admin, gerente de carteira e operacional',
    ],
    problem:
      'A organização conduzia iniciativas em várias fases (Kick Off, Onboarding, Implementação, Execução e Encerramento), com muitas áreas em paralelo (Comercial, Relacionamento, Operação, Tecnologia, Planejamento, Qualidade e outras). Sem um sistema integrando a jornada, informações e responsabilidades se espalhavam, o andamento real era pouco visível para a gestão, e o alinhamento entre compromissos assumidos e execução dependia de repasses e controles manuais, o que gerava risco, retrabalho e falta de previsibilidade na operação.',
    approach: [
      'Mergulho operacional: sessões de levantamento de requisitos com Comercial, Relacionamento, TEC e DEV, Operação, Planejamento, Qualidade, SCT e demais times envolvidos no ciclo de vida de cada projeto.',
      'Mapeamento da jornada existente: entender handoffs, gargalos, onde a informação se perdia e o que cada área precisava ver e registrar em cada fase.',
      'Especificação fase a fase antes da UI: requisitos, campos, responsáveis, dependências e critérios de conclusão, para que o desenho refletisse a operação e não o contrário.',
      'Arquitetura da informação: organizar dados e estados de projeto para uso diário (relação/operacional) e visão estratégica (gestão) sem multiplicar ferramentas.',
      'Prototipagem em camadas: home/dashboard, kanban com visão por fase, listagem com filtros avançados, e o Kick Off interno (formulário extenso) com o que a operação precisa para executar sem depender de reunião de repasse.',
      'Cenários de consulta: kanban, lista, agrupamentos e filtros, pensando em perfis (admin, gerente de carteira, operacional) e diferentes necessidades de leitura no mesmo ecossistema.',
      'Regras de negócio no desenho: o que bloqueia avanço, quando alertar SLA, integração de aceite (DocuSign) no Onboarding, e aprendizados ao longo da execução alimentando a operação com o tempo.',
    ],
    deliverables: [
      'Jornada operacional mapeada e traduzida em fluxo fase a fase (incl. dependências, responsáveis e handoffs).',
      'Especificação funcional e modelagem: estados, gating, SLAs, alertas e rastreabilidade por projeto e fase.',
      'Interfaces: dashboard da home, jornada (kanban), listagem com filtros e Kick Off interno (campo a campo, para execução sem ambiguidade).',
      'Diretrizes de uso e consistência de consulta (visões, filtros, agrupamento) alinhadas aos perfis de acesso.',
    ],
    result:
      'A plataforma vira o elo entre as áreas ao longo do ciclo: avança etapa só com pré-requisitos atendidos, acompanha SLAs em tempo real, registra histórico, concentra a visão de performance e sinaliza riscos. O efeito prático é transformar um processo fragmentado em um fluxo rastreável, mensurável e controlado, com execução mais consistente, visibilidade para a gestão e previsibilidade na conclusão das entregas.',
    modalScreensSectionTitle: 'Interfaces do produto',
    modalProductScreens: [
      {
        label: 'Home: resumo e jornada por fase',
        imageSrc: `/projects/il-genio/screen-home.png?v=${INTERNAL_SCREENSHOTS_ASSET_V}`,
        imageAlt: 'Ferramenta interna: home com resumo da jornada e indicadores',
        width: 3840,
        height: 2160,
      },
      {
        label: 'Jornada (Kanban)',
        imageSrc: `/projects/il-genio/screen-jornada.png?v=${INTERNAL_SCREENSHOTS_ASSET_V}`,
        imageAlt: 'Ferramenta interna: jornada em colunas por fase',
        width: 1024,
        height: 576,
      },
      {
        label: 'Listagem e filtros',
        imageSrc: `/projects/il-genio/screen-listagem.png?v=${INTERNAL_SCREENSHOTS_ASSET_V}`,
        imageAlt: 'Ferramenta interna: listagem com filtros e tabela',
        width: 1024,
        height: 576,
      },
      {
        label: 'Detalhe da oportunidade',
        imageSrc: `/projects/il-genio/screen-oportunidades.png?v=${INTERNAL_SCREENSHOTS_ASSET_V}`,
        imageAlt: 'Ferramenta interna: painel de oportunidade e etapas',
        width: 3840,
        height: 2160,
      },
    ],
  },
  {
    slug: 'slimpass-admin',
    title: 'Plataforma clínica',
    homeCardVariant: 'violet-panel',
    homeCardPanelPalette: 'blue-violet',
    homeCardPanelImageSrc: '/projects/plataforma-gestao-mockup.png?v=20260512',
    homeCardPanelChromaKey: true,
    homeCardPanelImageAlt:
      'Interfaces da plataforma de gestão interna em monitor e laptop.',
    homeCardPanelCtaLabel: 'Ver estudo de caso',
    homeCardPanelStats: [
      { label: 'Tempo de agendamento', value: '-33%' },
      { label: 'NPS', value: '+19 pts' },
      { label: 'Controle de horários', value: '100%' },
    ],
    hideTitle: true,
    cardAsideTitle: 'Plataforma de Gestão Interna',
    tagline:
      'Plataforma web de gestão clínica e operacional de um programa estruturado de emagrecimento: cadastro, prontuário, checkpoints multidisciplinares, agendamentos e visão por convênio.',
    modalTagline:
      'A Plataforma de Gestão Interna já existia quando entrei no projeto. Minha atuação foi o redesign completo da interface: a ferramenta cumpria função operacional, mas gerava fricção em usabilidade, hierarquia visual e consistência para quem vive dela no dia a dia. O desafio foi mapear a operação real (cadastro, ciclos de checkpoint, times, convênios, agendamentos) e redesenhar cada módulo respeitando regras de negócio e requisitos de compliance da empresa, sem reinventar o produto do zero.',
    modalHeaderClassName: 'border-white/20 bg-primary',
    modalHeaderOnBrand: true,
    year: '2025',
    role: 'UX Design · UI Design',
    scope: [
      'Gestão clínica & operacional',
      'Prontuário & checkpoints',
      'Convênios & agendamentos',
    ],
    outcomes: [
      { label: 'Contexto', value: 'Produto existente' },
      { label: 'Papel', value: 'Redesign' },
      { label: 'Restrição', value: 'Compliance' },
    ],
    highlights: [
      'Dashboard: visão macro da operação, com pacientes ativos/inativos, planejamento de metas por mês e por operadora, situação dos tratamentos, adesão e churn, checkpoints e NPS do programa por especialidade (apoio à gestão).',
      'Pacientes: base numerosa com filtros (convênio, etapa, status, cadastro) e prontuário unificado, com dados cadastrais, tratamentos, agenda, consultas, histórico e medidas na mesma tela, sem sistemas paralelos.',
      'Prontuário individual: evolução de peso e IMC, gráficos de acompanhamento, plano alimentar, atividade física e histórico de checkpoints realizados ou faltados, legível de relance.',
      'Tratamentos e agendamentos: ciclos de consultas (presencial/digital), convênio, etapa, especialidade e status; formulário médico inicial ligado ao agendamento com triagem clínica registrada no histórico ao longo do programa.',
      'Cadastro na entrada: peso, altura, IMC e comorbidades, para a equipe saber com quem está lidando antes da primeira consulta.',
    ],
    problem:
      'O programa atende muitos pacientes em paralelo, cada um em etapa diferente, vinculado a convênio e acompanhado por time multidisciplinar (ex.: endocrinologia, nutrição, psicologia), com ciclos periódicos de checkpoint e risco operacional alto: falta mal registrada pode virar glosa; informação clínica dispersa quebra continuidade do tratamento; e a gestão precisa cruzar execução contratada com o que foi efetivamente realizado por operadora. Sem uma ferramenta centralizada, essa escala e essa complexidade clínica não se administram com qualidade, consistência e rastreabilidade. A interface legada, por sua vez, dificultava o trabalho diário mesmo com a lógica de negócio correta.',
    approach: [
      'Alinhamento com stakeholders e requisitos de compliance: entender o que pode mudar na UI e o que é intocável no fluxo regulado.',
      'Imersão na operação: cadastro, prontuário, agendamentos, checkpoints, convênios e perfis (gestão, clínica, agenda).',
      'Arquitetura da informação e hierarquia por tarefa: priorizar o que precisa ser visto “de relance” versus o que fica um clique abaixo, sem esconder obrigatoriedades clínicas.',
      'Redesenho módulo a módulo (dashboard, pacientes, prontuário, tratamentos, cadastro) mantendo regras e dados já modelados no sistema existente.',
      'Protótipos e refinamento com foco em consistência visual, navegação e redução de esforço para tarefas repetitivas e de alto risco (agenda, faltas, histórico).',
    ],
    deliverables: [
      'Mapeamento de fluxos e pontos de fricção da interface anterior frente à operação real.',
      'Proposta de IA, hierarquia visual e componentes para os principais módulos (gestão, paciente, prontuário, agendamentos).',
      'Protótipos navegáveis e especificação alinhada a desenvolvimento, respeitando o escopo funcional já estabelecido.',
    ],
    result:
      'Operacionalmente, a proposta de redesign reforça o papel da plataforma como barreira contra perda de informação e falhas no ciclo de agendamento, com impacto direto em glosa e continuidade do paciente. Financeiramente, as telas de gestão continuam a apoiar o controle de atendimentos realizados versus o contratado por operadora. Clinicamente, o prontuário e o histórico permanecem o centro da decisão, com menos dependência de repasse verbal. Estrategicamente, a interface passa a entregar indicadores de negócio (adesão, churn, NPS, metas) de forma mais clara para orientar expansão e negociação, sempre sobre a base do produto já existente, agora com experiência mais coerente e navegável.',
    caseStudyLayout: 'narrative-plataforma-gestao',
    modalScreensSectionTitle: 'Interfaces do produto',
    modalProductScreens: [
      {
        label: 'Dashboard: visão geral e planejamento',
        imageSrc: '/projects/slimpass/screen-dashboard.png?v=20260505',
        imageAlt:
          'Plataforma de gestão interna: dashboard com totais, quadro de planejamento e metas por período',
      },
      {
        label: 'Pacientes: listagem e filtros',
        imageSrc: '/projects/slimpass/screen-pacientes-lista.png?v=20260505',
        imageAlt: 'Plataforma de gestão interna: lista de pacientes com convênio, etapa e status',
      },
      {
        label: 'Paciente: dados cadastrais no prontuário',
        imageSrc: '/projects/slimpass/screen-paciente-dados.png?v=20260505',
        imageAlt: 'Plataforma de gestão interna: prontuário do paciente com aba de dados cadastrais',
      },
      {
        label: 'Agenda de tratamentos',
        imageSrc: '/projects/slimpass/screen-agenda.png?v=20260505',
        imageAlt: 'Plataforma de gestão interna: aba de agenda com tratamentos e status dos agendamentos',
      },
      {
        label: 'Histórico e formulário médico',
        imageSrc: '/projects/slimpass/screen-historico.png?v=20260505',
        imageAlt:
          'Plataforma de gestão interna: histórico clínico com timeline e formulário de triagem',
      },
    ],
  },
  {
    slug: 'dashboard-insights',
    title: 'Landing page',
    homeCardVariant: 'violet-panel',
    homeCardPanelPalette: 'mauve-plum',
    homeCardPanelImageSrc: '/projects/summit-stoneworks-mockup.png?v=20260513',
    homeCardPanelChromaKey: true,
    homeCardPanelImageAlt:
      'Landing page Summit Stoneworks em monitor e laptop com hero e identidade da marca.',
    homeCardPanelCtaLabel: 'Ver estudo de caso',
    homeCardPanelStats: [
      { label: 'Taxa de conversão', value: '+44%' },
      { label: 'Contato', value: '+81%' },
    ],
    homeCardPanelStatsCentered: true,
    hideTitle: true,
    cardAsideTitle: 'Summit Stoneworks',
    tagline:
      'Landing page para reformas de alto padrão em Fort Myers: pedras naturais e engineered stone; vitrine digital que comunica qualidade, materiais e converte visitantes em contatos qualificados.',
    modalTagline:
      'A Summit Stoneworks não tinha uma presença online à altura do nível de execução das obras. O projeto foi construído do zero com UX estruturado: pesquisa de mercado e benchmarking, arquitetura de conteúdo, wireframes validados e, só então, design visual com a identidade da marca (dourado, textura de pedra, alto padrão) aplicada de ponta a ponta.',
    modalHeaderClassName: 'border-white/20 bg-primary',
    modalHeaderOnBrand: true,
    year: '2025',
    role: 'UX Design · UI Design',
    caseStudyLayout: 'narrative-summit-stoneworks',
    scope: ['Benchmarking', 'Design Thinking', 'Research', 'UI & marca'],
    outcomes: [
      { label: 'Marca', value: 'Alinhada' },
      { label: 'Prova', value: 'Visual' },
      { label: 'Contato', value: 'Qualificado' },
    ],
    highlights: [
      'Hero que qualifica e posiciona o visitante na entrada',
      'Galeria de transformações como prova da qualidade do trabalho',
      'Catálogo de coleções que educa sobre materiais antes do contato',
      'Formulário de contato com baixa fricção para gerar leads qualificados',
    ],
    problem:
      'Num mercado de alto padrão em Fort Myers, o cliente decide em grande parte pela percepção de qualidade antes do primeiro contato. A Summit não tinha uma vitrine digital profissional que refletisse o nível de acabamento das reformas: uma barreira direta a novos negócios com construtores e proprietários.',
    approach: [
      'Pesquisa de campo e benchmarking: empresas de pedras naturais e reformas premium na Flórida e EUA, com padrões do setor e oportunidades de diferenciação.',
      'Arquitetura de conteúdo: seções, ordem e peso narrativo, da proposta de valor à prova visual, serviços, materiais e conversão.',
      'Wireframes com hierarquia da informação, ritmo das imagens e navegação validados antes de qualquer decisão visual final.',
      'Design visual com identidade Summit (tons dourados, texturas de pedra, estética de alto padrão) aplicada de forma consistente em toda a página.',
    ],
    deliverables: [
      'Mapa competitivo e síntese de como o mercado se apresenta digitalmente.',
      'Estrutura de conteúdo da landing page e wireframes de todas as seções.',
      'Interface visual da landing page alinhada à marca e pronta para implementação.',
    ],
    result:
      'Uma presença digital que comunica autoridade e sofisticação para quem decide reformas de alto valor: visitante qualificado na entrada, prova visual no meio da jornada, educação sobre materiais antes da conversa comercial e caminho claro até o contato, transformando visita em oportunidade real de negócio.',
    modalScreensSectionTitle: 'A landing page',
    /** Captura composta: 9 slices verticais (Slice 5 e 6 eram idênticos; omitido o 6). */
    modalProductScreens: [
      {
        label: 'Landing page completa',
        imageSrc: '/projects/summit/landing-page-full.png?v=slices9',
        imageAlt:
          'Summit Stoneworks: landing page inteira (hero, diferencial, galeria, serviços, coleções de pedras e contato)',
        width: 1024,
        height: 4359,
      },
    ],
  },
]

