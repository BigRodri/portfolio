import type { Project } from './projects'

/** Alinhado às superfícies `violetPanel` dos cards (`CaseStudyShowcase`). */
export type CaseStudyPanelPaletteKey = 'default' | 'blue-violet' | 'mauve-plum'

export type CaseStudyPageTheme = Readonly<{
  accentHex: string
  /** Valores espaçados (ex. `121 83 142`) para `rgb(var(--cs-accent-rgb) / ...)`. */
  accentRgb: string
}>

const THEMES = {
  default: {
    accentHex: '#79538e',
    accentRgb: '121 83 142',
  },
  'blue-violet': {
    accentHex: '#4d5698',
    accentRgb: '77 86 152',
  },
  'mauve-plum': {
    accentHex: '#6b4260',
    accentRgb: '107 66 96',
  },
} satisfies Record<CaseStudyPanelPaletteKey, CaseStudyPageTheme>

function rgbComma(theme: CaseStudyPageTheme): string {
  return theme.accentRgb.split(/\s+/).join(', ')
}

/** Paleta aplicada só a páginas narrativas violet-panel; resto mantém tema default do site. */
export function caseStudyPaletteKey(project: Project): CaseStudyPanelPaletteKey {
  if (project.homeCardVariant !== 'violet-panel') return 'default'
  return project.homeCardPanelPalette ?? 'default'
}

export function caseStudyPageTheme(project: Project): CaseStudyPageTheme {
  return THEMES[caseStudyPaletteKey(project)]
}

/** Variáveis em linha (`React.CSSProperties` não tipa bem nomes `--*`). */
export function caseStudyPageCssVars(theme: CaseStudyPageTheme): Record<'--cs-accent' | '--cs-accent-rgb', string> {
  return {
    '--cs-accent': theme.accentHex,
    '--cs-accent-rgb': theme.accentRgb,
  }
}

/** Gradient do hero (~ `from-primary/12`). */
export function caseStudyHeroBgStyle(theme: CaseStudyPageTheme): { background: string } {
  const c = rgbComma(theme)
  return {
    background: `linear-gradient(180deg, rgba(${c}, 0.12) 0%, rgb(255, 255, 255) 100%)`,
  }
}

/** Fundo discreto para “Próximo projeto”: mesma tinta do card, em baixa opacidade, para o teaser continuar destacado sobre branco. */
export function caseStudyNextProjectSectionBg(theme: CaseStudyPageTheme): { background: string } {
  const c = rgbComma(theme)
  return {
    background: [
      `radial-gradient(ellipse 115% 70% at 50% -8%, rgba(${c}, 0.13) 0%, rgba(255, 255, 255, 0) 52%)`,
      `linear-gradient(180deg, rgba(${c}, 0.065) 0%, rgba(${c}, 0.028) 38%, rgb(255, 255, 255) 88%)`,
    ].join(','),
  }
}

export function caseStudyTwoColumnCardSurfaceStyle(theme: CaseStudyPageTheme): {
  borderColor: string
  boxShadow: string
} {
  const c = rgbComma(theme)
  return {
    borderColor: `rgba(${c}, 0.2)`,
    boxShadow: [
      `0 10px 36px -18px rgba(${c}, 0.42)`,
      `0 22px 70px -36px rgba(${c}, 0.2)`,
    ].join(', '),
  }
}
