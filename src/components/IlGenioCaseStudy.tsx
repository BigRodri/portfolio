import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ChromaPanelMockupImage } from './ChromaPanelMockupImage'
import {
  type CaseStudyNarrative,
  ilGenioNarrative,
  getIlGenioScreen,
} from '../content/ilGenioNarrative'
import type { Project } from '../content/projects'
import {
  caseStudyHeroBgStyle,
  caseStudyPageCssVars,
  caseStudyPageTheme,
  caseStudyTwoColumnCardSurfaceStyle,
} from '../content/caseStudyPageTheme'
import { ProjectScreenImage } from './ProjectScreenImage'
import { NextProjectTeaser } from './NextProjectTeaser'
import { cn } from '../lib/cn'

/** Acentos alinhados à paleta do card (`--cs-accent` no `<article>`). */
const csAccentText = 'text-[color:var(--cs-accent)]'

/** Rótulo roxo inicial (abaixo do mockup/meta): mesmo estilo editorial de antes; o texto vem do título do card. */
const narrativeEyebrowClassName = cn(
  'font-semibold uppercase tracking-[0.28em]',
  csAccentText,
  'text-[13px] sm:text-[15px]',
)

/** Rótulos violeta tipo “começo de secção”: só abaixo do mockup e do `<dl>` de meta (não altera `<dt>` do bloco de dados). */
const narrativeSectionKickerClassName = cn(
  'font-semibold uppercase tracking-[0.24em]',
  csAccentText,
  'text-[13px] sm:text-[15px]',
)

const topNavProjectLinkClassName = cn(
  'inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold outline-none transition',
  csAccentText,
  'hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--cs-accent-rgb)/0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
)

/** Largura da coluna `<dl>` de meta: alinhada ao case referência (ferramenta de jornada do cliente). */
const IL_GENIO_REFERENCE_META_MAX_WIDTH_CH =
  Math.max(...ilGenioNarrative.meta.map((row) => row.value.length), 0) + 3

function metaBlockMaxWidthCh(meta: CaseStudyNarrative['meta']): number {
  const longest = meta.reduce((acc, row) => Math.max(acc, row.value.length), 0) + 3
  return Math.max(longest, IL_GENIO_REFERENCE_META_MAX_WIDTH_CH)
}

type Section = CaseStudyNarrative['sections'][number]

function isScreenSection(s: Section): boolean {
  return typeof s === 'object' && s !== null && 'type' in s && (s as { type?: string }).type === 'screen'
}

export function IlGenioCaseStudy({
  project: p,
  narrative = ilGenioNarrative,
  nextProject = null,
}: {
  project: Project
  narrative?: CaseStudyNarrative
  nextProject?: Project | null
}) {
  const n = narrative
  const panelImg = p.homeCardPanelImageSrc
  const panelAlt = p.homeCardPanelImageAlt ?? ''
  const metaMaxWidthCh = metaBlockMaxWidthCh(n.meta)
  /** Mesmo texto do título visível no card (`cardAsideTitle` ou `title`), numa só linha (sem `\n`). */
  const caseStudyLeadTitle = (p.hideTitle && p.cardAsideTitle ? p.cardAsideTitle : p.title)
    .replace(/\s*\n\s*/g, ' ')
    .trim()

  /** Mesmas métricas do card violet-panel (`homeCardPanelStats`); se não existirem, cai nos `outcomes` do projeto. */
  const footerImpactStats = p.homeCardPanelStats?.length ? p.homeCardPanelStats : p.outcomes

  /** Summit: par de impact cards centrados → mesma fração lateral que cada card da fila de 3 (ex. NPS). */
  const impactCardsSummitPair =
    footerImpactStats.length === 2 && Boolean(p.homeCardPanelStatsCentered)

  const csTheme = caseStudyPageTheme(p)

  return (
    <article
      className="case-study-narrative-page w-full min-w-0 text-black"
      style={caseStudyPageCssVars(csTheme) as CSSProperties}
    >
      <section aria-labelledby="case-study-title" className="w-full min-w-0">
      <header className="w-full min-w-0 pb-12 pt-4 sm:pb-16 sm:pt-6" style={caseStudyHeroBgStyle(csTheme)}>
        <div className="w-full px-5 sm:px-8">
          <div
            className={cn(
              'mx-auto w-full max-w-[1180px]',
              !panelImg && 'max-w-[720px]',
            )}
          >
            <div className="mb-6 flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 sm:mb-8">
              <Link to="/#projetos" className={topNavProjectLinkClassName}>
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                Voltar aos projetos
              </Link>
              {nextProject ? (
                <Link to={`/projeto/${nextProject.slug}`} className={topNavProjectLinkClassName}>
                  Ir para próximo projeto
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              ) : null}
            </div>
            <div className="flex w-full min-w-0 justify-center">
              <div
                className={cn(
                  'flex min-w-0 flex-col items-center justify-center gap-11 px-0',
                  panelImg
                    ? 'w-full max-w-full lg:flex-row lg:items-center lg:justify-center'
                    : 'w-full',
                )}
                style={
                  panelImg
                    ? ({
                        ['--hero-meta-ch']: `${IL_GENIO_REFERENCE_META_MAX_WIDTH_CH}ch`,
                      } as CSSProperties)
                    : undefined
                }
              >
              {panelImg ? (
                <div className="flex w-full min-w-0 shrink-0 justify-center lg:w-[480px] lg:min-w-[480px] lg:max-w-[480px]">
                  <div className="flex w-full min-w-0 max-w-[480px] items-center justify-center lg:min-h-[380px]">
                    {p.homeCardPanelChromaKey ? (
                      <ChromaPanelMockupImage
                        src={panelImg}
                        alt={panelAlt}
                        className="mx-auto h-auto w-auto max-h-[min(320px,55svh)] max-w-full object-contain object-center sm:max-h-[min(380px,50vh)]"
                      />
                    ) : (
                      <img
                        src={panelImg}
                        alt={panelAlt}
                        className="mx-auto block h-auto w-auto max-h-[min(320px,55svh)] max-w-full object-contain object-center sm:max-h-[min(380px,50vh)]"
                        loading="eager"
                        decoding="async"
                      />
                    )}
                  </div>
                </div>
              ) : null}
              <dl
                className={cn(
                  'grid w-full min-w-0 grid-cols-1 gap-6 text-[14px] sm:gap-7 sm:text-[15px]',
                  panelImg &&
                    'mx-auto max-w-[min(100%,var(--hero-meta-ch))] lg:mx-0 lg:w-[var(--hero-meta-ch)] lg:min-w-[var(--hero-meta-ch)] lg:max-w-[var(--hero-meta-ch)] lg:shrink-0',
                )}
                style={panelImg ? undefined : { maxWidth: `${metaMaxWidthCh}ch` }}
              >
                {n.meta.map((row) => (
                  <div key={row.label}>
                    <dt className={cn('text-[11px] font-semibold uppercase tracking-[0.2em]', csAccentText)}>
                      {row.label}
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-black/80">{row.value}</dd>
                  </div>
                ))}
              </dl>
              </div>
            </div>

            {footerImpactStats.length > 0 ? (
              <section aria-labelledby="impact-stats-heading" className="mt-12 w-full sm:mt-14">
                <div className="mx-auto w-full max-w-[720px]">
                  <p id="impact-stats-heading" className={narrativeSectionKickerClassName}>
                    {n.impact.kicker}
                  </p>
                  <h2 className="sr-only">{n.impact.title}</h2>
                  <ul
                    className={cn(
                      'mt-8 list-none gap-4 sm:gap-5',
                      impactCardsSummitPair
                        ? 'mx-auto flex w-full max-w-[720px] flex-col sm:flex-row sm:flex-nowrap sm:justify-center sm:gap-x-5'
                        : cn(
                            'grid grid-cols-1 gap-4 sm:gap-5',
                            footerImpactStats.length === 2 && 'sm:grid-cols-2',
                            footerImpactStats.length >= 3 && 'sm:grid-cols-3',
                          ),
                    )}
                  >
                    {footerImpactStats.map((row) => (
                      <li
                        key={`${row.label}-${row.value}`}
                        className={cn(
                          'rounded-2xl border border-black/10 bg-white py-4 text-center shadow-sm sm:py-5',
                          impactCardsSummitPair
                            ? 'w-full shrink-0 px-5 sm:w-[calc((100%-2.5rem)/3)] sm:px-6'
                            : 'px-4',
                        )}
                      >
                        <p className="text-[12px] font-medium uppercase tracking-wide text-black/50">
                          {row.label}
                        </p>
                        <p
                          className={cn(
                            'mt-1 font-[\'Montserrat\'] text-lg font-semibold sm:text-xl',
                            'valueTone' in row && row.valueTone === 'positive'
                              ? 'text-emerald-600'
                              : csAccentText,
                          )}
                        >
                          {row.value}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-[15px] leading-[1.75] text-black/75 sm:text-[16px]">
                    {n.impact.closing}
                  </p>
                </div>
              </section>
            ) : null}

            <div className="mx-auto mt-14 w-full max-w-[720px] sm:mt-20">
              <p id="case-study-title" className={narrativeEyebrowClassName}>
                {caseStudyLeadTitle}
              </p>
            </div>

            <div className="mx-auto mt-8 w-full max-w-[720px] space-y-4 sm:mt-10">
              <div className="space-y-4 whitespace-pre-line text-[15px] leading-[1.7] text-black/80 sm:text-[16px]">
                {n.leadParagraphs.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
              <p className="text-[16px] font-semibold leading-[1.55] text-black sm:text-[17px]">
                <span className={csAccentText}>O resultado: </span>
                {n.resultHighlight}
              </p>
              <p className="text-[13px] leading-relaxed italic text-black/50 sm:text-[14px]">{n.note}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[720px] space-y-16 pb-14 pt-8 sm:space-y-20 sm:pb-20 sm:pt-10">
        <section>
          <p className={narrativeSectionKickerClassName}>{n.startingPoint.kicker}</p>
          <h2 className="sr-only">{n.startingPoint.title}</h2>
          <p className="mt-6 text-[15px] leading-[1.75] text-black/80 sm:mt-8 sm:text-[16px]">
            {n.startingPoint.body}
          </p>
        </section>

        {n.sections.map((block, idx) => {
          if (isScreenSection(block)) {
            const sb = block as { type: 'screen'; screenIndex: number; intro?: string }
            const screen = getIlGenioScreen(p.modalProductScreens, sb.screenIndex)
            if (!screen) return null
            return (
              <div key={`screen-${sb.screenIndex}-${idx}`} className="w-full">
                {sb.intro ? (
                  <p className="mb-5 max-w-[720px] text-[15px] leading-[1.7] text-black/75 sm:mb-6 sm:text-[16px]">
                    {sb.intro}
                  </p>
                ) : null}
                <div className="mx-auto w-full max-w-[960px]">
                  <ProjectScreenImage
                    src={screen.imageSrc}
                    alt={screen.imageAlt}
                    label={screen.label}
                    width={screen.width}
                    height={screen.height}
                  />
                </div>
              </div>
            )
          }

          const sectionContentTop = block.kicker ? 'mt-6 sm:mt-8' : 'mt-5 sm:mt-6'
          const hasBody = Boolean(block.body?.length)

          return (
            <section key={block.title} className="max-w-[720px]">
              {block.kicker ? (
                <p className={narrativeSectionKickerClassName}>{block.kicker}</p>
              ) : null}
              <h2 className="sr-only">{block.title}</h2>
              {block.body?.length ? (
                <div
                  className={cn(
                    'space-y-4 text-[15px] leading-[1.75] text-black/80 sm:text-[16px]',
                    sectionContentTop,
                  )}
                >
                  {block.body.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
              ) : null}
              {block.twoColumn ? (
                <div
                  className={cn(
                    'grid grid-cols-1 gap-6 border-t border-black/[0.06] pt-8 sm:grid-cols-2 sm:gap-8',
                    hasBody ? 'mt-8' : sectionContentTop,
                  )}
                >
                  <div
                    className="rounded-2xl border border-solid bg-white p-5 sm:p-6"
                    style={caseStudyTwoColumnCardSurfaceStyle(csTheme)}
                  >
                    <h3 className="font-['Montserrat'] text-[15px] font-semibold text-black sm:text-base">
                      {block.twoColumn.a.title}
                    </h3>
                    <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-black/70">
                      {block.twoColumn.a.text}
                    </p>
                  </div>
                  <div
                    className="rounded-2xl border border-solid bg-white p-5 sm:p-6"
                    style={caseStudyTwoColumnCardSurfaceStyle(csTheme)}
                  >
                    <h3 className="font-['Montserrat'] text-[15px] font-semibold text-black sm:text-base">
                      {block.twoColumn.b.title}
                    </h3>
                    <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-black/70">
                      {block.twoColumn.b.text}
                    </p>
                  </div>
                </div>
              ) : null}
              {block.bullets?.length ? (
                <ul
                  className={cn(
                    'grid gap-3 text-[15px] leading-relaxed text-black/80 sm:text-[16px]',
                    hasBody ? 'mt-6' : sectionContentTop,
                  )}
                >
                  {block.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--cs-accent-rgb)/0.8)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          )
        })}
        </div>
      </div>
      </section>

      <NextProjectTeaser project={nextProject} />
    </article>
  )
}
