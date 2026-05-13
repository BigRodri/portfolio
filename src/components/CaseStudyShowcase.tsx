import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChromaPanelMockupImage } from './ChromaPanelMockupImage'
import { Pill } from './Pill'
import { projectCardMetaLine, type Project } from '../content/projects'
import { cn } from '../lib/cn'

/** Elevação dos CTAs dos cards: spring suave. */
export const cardCtaSpring = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 36,
  mass: 0.9,
}

const MotionLink = motion.create(Link)

type VioletPanelStatRow = NonNullable<Project['homeCardPanelStats']>[number]

/** Mesmas dimensões e espaçamento dos cards de Impacto (`px-4 py-4`, `sm:py-5`, `rounded-2xl`), mantendo texto sobre o gradiente. */
function VioletPanelStatCard(props: { row: VioletPanelStatRow }) {
  const row = props.row
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center rounded-2xl px-4 py-4 text-center sm:py-5">
      <p className="inline-block max-w-none whitespace-nowrap text-[11px] font-medium leading-snug tracking-[-0.01em] text-white/60 sm:text-[12px] lg:text-[13px]">
        {row.label}
      </p>
      <p
        className={cn(
          'mt-1.5 whitespace-nowrap font-["Montserrat"] text-[20px] font-bold leading-none tracking-[-0.03em] sm:mt-2 sm:text-[26px] lg:text-[28px]',
          row.valueTone === 'positive' ? 'text-emerald-400' : 'text-white',
        )}
      >
        {row.value}
      </p>
    </div>
  )
}

/** Gradientes do `violet-panel`: `default` jornada; `blue-violet` indigo; `mauve-plum` ameixa (Summit). */
const violetPanelSurface = {
  default: {
    articleClass:
      'bg-gradient-to-br from-[#3a2f52] via-[#4f3f6a] to-[#5f4d7a] shadow-[0_20px_64px_-32px_rgba(45,32,68,0.55)]',
    ctaRingOffsetClass: 'focus-visible:ring-offset-[#453a61]',
    ctaHoverShadow: '0px 28px 72px -32px rgba(58, 45, 88, 0.45), 0px 22px 48px -28px rgba(0, 0, 0, 0.16)',
  },
  'blue-violet': {
    articleClass:
      'bg-gradient-to-br from-[#2a2850] via-[#3a4272] to-[#4d5698] shadow-[0_20px_64px_-32px_rgba(32,36,72,0.52)]',
    ctaRingOffsetClass: 'focus-visible:ring-offset-[#323058]',
    ctaHoverShadow: '0px 28px 72px -32px rgba(52, 58, 110, 0.48), 0px 22px 48px -28px rgba(0, 0, 0, 0.16)',
  },
  'mauve-plum': {
    articleClass:
      'bg-gradient-to-br from-[#3a2238] via-[#55304d] to-[#6b4260] shadow-[0_20px_64px_-32px_rgba(42,20,36,0.52)]',
    ctaRingOffsetClass: 'focus-visible:ring-offset-[#301a2a]',
    ctaHoverShadow: '0px 28px 72px -32px rgba(95, 52, 78, 0.46), 0px 22px 48px -28px rgba(0, 0, 0, 0.16)',
  },
} as const

export function CaseStudyShowcase(props: {
  project: Project
  index: number
  /**
   * Quando verdadeiro, não renderiza links internos (evitar `<a>` dentro de `<a>`).
   * Use dentro de um `Link`/roteador pai que navega para o projeto.
   */
  disableInternalNavigation?: boolean
}) {
  const p = props.project
  const reverse = props.index % 2 === 1
  const onBrand = Boolean(p.modalHeaderOnBrand)
  const onBrandPillClass = onBrand ? 'border-primary/40 bg-primary/10 text-black/80' : undefined
  const disableInternalNavigation = props.disableInternalNavigation ?? false

  if (p.homeCardVariant === 'violet-panel') {
    const panelImg = p.homeCardPanelImageSrc
    const panelCta = p.homeCardPanelCtaLabel ?? 'Ver estudo de caso'
    const panelPaletteKey =
      p.homeCardPanelPalette === 'blue-violet'
        ? 'blue-violet'
        : p.homeCardPanelPalette === 'mauve-plum'
          ? 'mauve-plum'
          : 'default'
    const surface = violetPanelSurface[panelPaletteKey]
    const ctaDecorationClass =
      'inline-flex items-center justify-center rounded-full border border-white/35 bg-white px-6 py-2.5 text-[14px] font-medium tracking-[-0.01em] text-black transition-[border-color,background-color] duration-[420ms] ease-[cubic-bezier(0.33,1,0.68,1)]'

    const stats = p.homeCardPanelStats
    /** Alinhado ao `ul` da secção Impacto: `max-w-[720px]` e cada célula = `(100% - 2×gap-5) / 3`. */
    const isTwoMetricsCentered = Boolean(p.homeCardPanelStatsCentered) && (stats?.length ?? 0) === 2

    const statsGridClassName = cn(
      isTwoMetricsCentered
        ? 'mx-auto flex w-full max-w-[720px] flex-col gap-4 sm:flex-row sm:flex-nowrap sm:justify-center sm:gap-x-5'
        : cn(
            'grid w-full grid-cols-1 gap-4 sm:gap-5',
            'sm:grid-cols-3 sm:gap-x-6 lg:gap-x-8',
          ),
    )

    const statCellWrapperClassName = () =>
      cn(
        'min-h-0 min-w-0',
        isTwoMetricsCentered &&
          /** Mesma comprimento lateral que cada `<li>` com `grid-cols-3` em Impacto (`gap-5` ⇒ 2.5rem no total horizontal). */
          'w-full sm:w-[calc((100%-2.5rem)/3)]',
      )

    const renderStatGrid = () =>
      stats!.map((row) => (
        <div key={row.label} className={statCellWrapperClassName()}>
          <VioletPanelStatCard row={row} />
        </div>
      ))

    return (
      <article
        className={cn(
          'overflow-x-visible overflow-y-visible rounded-[28px] border-0',
          disableInternalNavigation && 'pointer-events-none [&_img]:pointer-events-none',
          surface.articleClass,
        )}
      >
        <div
          className={cn(
            'grid min-h-0 w-full gap-y-8 overflow-x-visible overflow-y-visible text-left sm:min-h-[440px] sm:gap-x-8 sm:gap-y-0 lg:min-h-[460px] lg:gap-x-10',
            panelImg ? 'grid-cols-1 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]' : 'grid-cols-1',
          )}
        >
          <div className="flex h-full min-h-0 min-w-0 flex-col px-10 pb-8 pt-10 sm:min-w-0 sm:px-12 sm:pb-10 sm:pl-14 sm:pr-8 sm:pt-12 lg:pl-16">
            {p.homeCardPanelLogoSrc ? (
              <div className="shrink-0">
                <img
                  src={p.homeCardPanelLogoSrc}
                  alt={p.homeCardPanelLogoAlt ?? ''}
                  className="h-7 w-auto object-contain object-left opacity-90 sm:h-8"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}
            <div
              className={cn(
                'flex min-h-0 flex-1 flex-col justify-center',
                p.homeCardPanelLogoSrc ? 'mt-8 sm:mt-10' : null,
              )}
            >
              {p.cardAsideTitle ? (
                <h2 className="font-['Montserrat'] text-[24px] font-bold leading-[1.12] tracking-[-0.035em] text-white whitespace-pre-line sm:text-[30px] lg:text-[32px]">
                  {p.cardAsideTitle}
                </h2>
              ) : null}
              <p
                className={cn(
                  'whitespace-pre-line text-[15px] leading-relaxed text-white/85 sm:text-[16px]',
                  p.cardAsideTitle ? 'mt-7 sm:mt-9' : null,
                )}
              >
                {p.tagline}
              </p>
            </div>
            <div className="shrink-0 pt-9 sm:pt-10">
              {disableInternalNavigation ? (
                <span
                  className={cn(
                    ctaDecorationClass,
                    surface.ctaRingOffsetClass,
                    'pointer-events-none select-none opacity-95',
                  )}
                  aria-hidden
                >
                  {panelCta}
                </span>
              ) : (
                <MotionLink
                  to={`/projeto/${p.slug}`}
                  className={cn(
                    'pointer-events-auto inline-flex cursor-pointer rounded-full hover:border-white hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2',
                    ctaDecorationClass,
                    surface.ctaRingOffsetClass,
                  )}
                  initial={false}
                  transition={cardCtaSpring}
                  whileHover={{
                    y: -8,
                    boxShadow: surface.ctaHoverShadow,
                  }}
                  whileTap={{ scale: 0.985, transition: { duration: 0.12 } }}
                >
                  {panelCta}
                </MotionLink>
              )}
            </div>
          </div>
          {panelImg ? (
            <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-0 overflow-x-visible overflow-y-visible px-8 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pl-4 sm:pr-10 sm:pt-10 lg:pr-14">
              <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5 sm:gap-6">
                <div className="isolate flex w-full max-w-full shrink-0 justify-center overflow-visible">
                  {p.homeCardPanelChromaKey ? (
                    <ChromaPanelMockupImage
                      src={panelImg}
                      alt={p.homeCardPanelImageAlt ?? ''}
                      className="h-auto w-auto max-h-[min(370px,66svh)] max-w-full object-contain object-center [backface-visibility:hidden] [transform:translateZ(0)] sm:max-h-[min(445px,55vh)] sm:max-w-[min(100%,520px)]"
                    />
                  ) : (
                    <img
                      src={panelImg}
                      alt={p.homeCardPanelImageAlt ?? ''}
                      className="h-auto w-auto max-h-[min(370px,66svh)] max-w-full object-contain object-center [backface-visibility:hidden] [transform:translateZ(0)] sm:max-h-[min(445px,55vh)] sm:max-w-[min(100%,520px)]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                {p.homeCardPanelStats?.length ? (
                  <div
                    className={cn(
                      'relative z-10 w-full shrink-0 overflow-visible',
                      p.homeCardPanelStatsCentered && 'flex justify-center',
                    )}
                  >
                    <div className={statsGridClassName}>{renderStatGrid()}</div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : p.homeCardPanelStats?.length ? (
            <div className="flex h-full min-h-0 w-full flex-col items-center justify-center px-10 pb-10 pt-0 sm:px-12 sm:pb-12">
              <div className={statsGridClassName}>{renderStatGrid()}</div>
            </div>
          ) : null}
        </div>
      </article>
    )
  }

  const panelCtaLabel = p.homeCardPanelCtaLabel ?? 'Ver estudo de caso'

  const flatCtaInteractiveClass = cn(
    'mt-6 inline-flex w-fit cursor-pointer items-center justify-center rounded-xl border px-5 py-3 text-[13px] font-semibold tracking-wide transition-[border-color,background-color] duration-[420ms] ease-[cubic-bezier(0.33,1,0.68,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    onBrand
      ? 'border-primary/25 bg-primary text-white shadow-sm hover:bg-primary/92'
      : 'border-black/10 bg-transparent text-black/80 hover:border-primary/35 hover:bg-primary/[0.06]',
  )

  function renderFlatOutlineCta() {
    if (disableInternalNavigation) {
      return (
        <span
          className={cn(
            flatCtaInteractiveClass,
            'pointer-events-none cursor-default select-none',
          )}
          aria-hidden
        >
          {panelCtaLabel}
        </span>
      )
    }
    return (
      <MotionLink
        to={`/projeto/${p.slug}`}
        className={cn(flatCtaInteractiveClass, 'pointer-events-auto')}
        initial={false}
        transition={cardCtaSpring}
        whileHover={{
          y: -8,
          boxShadow: onBrand
            ? '0px 28px 92px -34px rgba(121, 83, 142, 0.42), 0px 22px 48px -28px rgba(0, 0, 0, 0.14)'
            : '0px 28px 92px -34px rgba(121, 83, 142, 0.32), 0px 22px 48px -28px rgba(0, 0, 0, 0.12)',
        }}
        whileTap={{ scale: 0.985, transition: { duration: 0.12 } }}
      >
        {panelCtaLabel}
      </MotionLink>
    )
  }

  return (
    <article
      className={cn(
        'overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_60px_-34px_rgba(0,0,0,0.18)]',
        disableInternalNavigation && 'pointer-events-none',
      )}
    >
      <div
        className={cn('grid w-full text-left', 'grid-cols-1 sm:grid-cols-[1.05fr_0.95fr]')}
      >
        <div
          className={cn(
            'relative min-h-[220px] overflow-hidden sm:h-full sm:min-h-[300px]',
            reverse ? 'sm:order-2' : 'sm:order-1',
          )}
        >
          {p.coverSrc ? (
            <img
              src={p.coverSrc}
              alt=""
              className="absolute inset-0 m-0 h-full w-full object-cover object-center opacity-80"
              loading="lazy"
              aria-hidden="true"
            />
          ) : null}
          <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
            <div>
              {!p.hideTitle ? (
                <div className="text-[11px] font-semibold tracking-[0.22em] text-black/50">
                  {projectCardMetaLine(p)}
                </div>
              ) : null}
              {!p.hideTitle ? (
                <div className="mt-3 font-['Montserrat'] text-[22px] font-semibold leading-[1.15] tracking-[-0.03em] text-black sm:text-[28px]">
                  {p.title}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'flex flex-col border-t border-black/10 p-7 sm:h-full sm:border-l sm:border-t-0 sm:p-9',
            reverse ? 'sm:order-1' : 'sm:order-2',
          )}
        >
          {p.hideTitle ? (
            <>
              <div>
                {p.cardAsideTitle ? (
                  <h2 className="font-['Montserrat'] text-[22px] font-semibold leading-[1.15] tracking-[-0.03em] text-black whitespace-pre-line sm:text-[26px]">
                    {p.cardAsideTitle}
                  </h2>
                ) : null}
                <p
                  className={cn(
                    'whitespace-pre-line text-[15px] leading-relaxed text-black/70 sm:text-[16px]',
                    p.cardAsideTitle ? 'mt-8 sm:mt-10' : null,
                  )}
                >
                  {p.tagline}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.scope.slice(0, 4).map((s) => (
                    <Pill key={s} className={onBrandPillClass} noHover={onBrand}>
                      {s}
                    </Pill>
                  ))}
                </div>
              </div>
              {renderFlatOutlineCta()}
              <p
                className={cn(
                  'mt-auto pt-6 text-[11px] font-semibold uppercase tracking-[0.22em] sm:pt-8 sm:text-[12px]',
                  onBrand ? 'text-primary/90' : 'text-black/55',
                )}
              >
                {projectCardMetaLine(p)}
              </p>
            </>
          ) : (
            <div>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-black/70 sm:text-[16px]">
                {p.tagline}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.scope.slice(0, 4).map((s) => (
                  <Pill key={s} className={onBrandPillClass} noHover={onBrand}>
                    {s}
                  </Pill>
                ))}
              </div>
              {renderFlatOutlineCta()}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
