import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  PackageCheck,
  Rocket,
  Search,
  Signpost,
  Target,
  UsersRound,
  Waypoints,
  type LucideIcon,
} from 'lucide-react'
import {
  Fragment,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type RefObject,
} from 'react'
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { CaseStudyShowcase } from './components/CaseStudyShowcase'
import { FloatingBackground } from './components/FloatingBackground'
import { IlGenioCaseStudy } from './components/IlGenioCaseStudy'
import { NextProjectTeaser } from './components/NextProjectTeaser'
import { Pill } from './components/Pill'
import { ilGenioNarrative } from './content/ilGenioNarrative'
import { plataformaGestaoNarrative } from './content/plataformaGestaoNarrative'
import { summitStoneworksNarrative } from './content/summitStoneworksNarrative'
import { ProjectScreenImage } from './components/ProjectScreenImage'
import { ON_BRAND_MODAL_ACCENT, projectMetaLine, projects, type Project } from './content/projects'
import {
  aboutContent,
  approachItems,
  type ApproachIconId,
  type ProcessIconId,
  processSteps,
} from './content/sections'
import { cn } from './lib/cn'

const easeOut = [0.22, 1, 0.36, 1] as const

const DEFAULT_DOC_TITLE = 'UX Design: Portfólio'

const HOME_SECTION_IDS = new Set(['projetos', 'sobre', 'abordagem', 'processo', 'contato'])

/**
 * Secções da home com âncora `#id`: scroll suave ao mudar pathname/hash (links do header).
 * Em reload (F5), uma única vez: topo (hero) e remover `#` de secção. O tipo `navigation` do
 * Performance API mantém-se `reload` durante toda a vida do documento; não pode ser usado
 * em cada clique, senão o header deixa de fazer scroll para as secções.
 */
function useHomeSectionHashScroll() {
  const location = useLocation()
  const navigate = useNavigate()
  const reloadHeroHandledRef = useRef(false)

  useLayoutEffect(() => {
    if (location.pathname !== '/') return

    const navEntry = performance.getEntriesByType?.('navigation')?.[0] as
      | PerformanceNavigationTiming
      | undefined
    const documentWasReloaded = navEntry?.type === 'reload'

    if (documentWasReloaded && !reloadHeroHandledRef.current) {
      reloadHeroHandledRef.current = true
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      const reloadHashId = location.hash.replace(/^#/, '').trim()
      if (reloadHashId && HOME_SECTION_IDS.has(reloadHashId)) {
        navigate({ pathname: '/', search: location.search }, { replace: true })
      }
      return
    }

    const id = location.hash.replace(/^#/, '').trim()
    if (!id || !HOME_SECTION_IDS.has(id)) return
    const el = document.getElementById(id)
    if (!el) return
    const run = () => {
      const header = document.querySelector('header')
      const headerH = header ? Math.round(header.getBoundingClientRect().height) : 72
      const top = el.getBoundingClientRect().top + window.scrollY - headerH
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }
    requestAnimationFrame(() => requestAnimationFrame(run))
  }, [location.pathname, location.hash, location.search, navigate])
}

function Reveal(props: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={props.className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      {props.children}
    </motion.div>
  )
}

function NavLink(props: { to: string; children: ReactNode }) {
  return (
    <Link
      to={props.to}
      className="rounded-lg px-3 py-2 text-[13px] font-semibold text-black/65 outline-none transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:decoration-primary hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {props.children}
    </Link>
  )
}

/** Links antigos `#slug` abrem a página de case correspondente. */
function HashToProjectRoute() {
  const navigate = useNavigate()
  useEffect(() => {
    const read = () => {
      const hash = window.location.hash?.replace('#', '').trim()
      if (!hash) return
      const maybe = projects.find((p) => p.slug === hash)
      if (maybe) {
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search)
        void navigate(`/projeto/${maybe.slug}`, { replace: true })
      }
    }
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [navigate])
  return null
}

function Container(props: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('mx-auto w-full max-w-[1180px] px-5 sm:px-8', props.className)}>
      {props.children}
    </div>
  )
}

function Button(props: {
  href?: string
  /** Navegação interna (React Router): sem abrir outra aba. */
  to?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold tracking-wide transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
  const variants = {
    primary:
      'border border-primary/25 bg-primary text-white shadow-sm hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-md hover:shadow-primary/25 active:translate-y-0',
    ghost:
      'border border-black/10 bg-transparent text-black/80 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/[0.06] hover:text-primary active:translate-y-0',
  }

  const className = cn(base, variants[props.variant ?? 'ghost'], props.className)

  if (props.to) {
    return (
      <Link to={props.to} className={className}>
        {props.children}
      </Link>
    )
  }

  if (props.href) {
    return (
      <a className={className} href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    )
  }

  return (
    <button className={className} onClick={props.onClick} type="button">
      {props.children}
    </button>
  )
}

/** Igual ao ritmo do bloco #sobre: respiro entre eyebrow/título e o conteúdo. */
const gapAfterSectionHeading = 'mt-12 pt-2 sm:mt-16 sm:pt-4'

/** Espaço entre a linha do eyebrow (rótulo da secção) e o título ou subtítulo logo abaixo. */
const sectionHeadingGapAfterEyebrow = 'mb-8 sm:mb-10'
/** Cartão Contato: espaço entre “CONTATO” e o título (mais fechado que o gap eyebrow→título nas SectionHeading). */
const contatoCardMarginTopAfterEyebrow = 'mt-5 sm:mt-6'

/** Ritmo vertical padrão: topo confortável, base um pouco mais apertada. */
const sectionPaddingY = 'pt-16 pb-10 sm:pt-24 sm:pb-14'
/** Abordagem: mesma lógica, escala compacta. */
const sectionPaddingYCompact = 'pt-10 pb-6 sm:pt-14 sm:pb-10'

const approachIconById: Record<ApproachIconId, LucideIcon> = {
  signpost: Signpost,
  target: Target,
  rocket: Rocket,
  'users-round': UsersRound,
}

const processIconById: Record<ProcessIconId, LucideIcon> = {
  search: Search,
  waypoints: Waypoints,
  'package-check': PackageCheck,
}

/** Anéis dos ícones: fatias da mesma jornada cromática (claro → primary #79538e → profundo). */
const PROCESS_STEP_RING = [
  'bg-gradient-to-br from-[#faf5fc] via-[#e3b8d4] to-[#a56d9e]',
  'bg-gradient-to-br from-[#f0e4f6] via-[#b784bc] to-[#70407c]',
  'bg-gradient-to-br from-[#e2d0ea] via-[#855e96] to-[#402848]',
] as const

const PROCESS_ICON_TONE = [
  'text-[#7d3b70]',
  'text-[#5c2f66]',
  'text-[#351c38]',
] as const

/** Um único degradê vertical (espinha) — a linha “viaja” por toda a timeline; stops no tom do site. */
const processSpineClassName =
  'pointer-events-none absolute top-2 bottom-8 left-[calc(1.75rem-1.5px)] z-0 w-[3px] rounded-full bg-[linear-gradient(180deg,#faf4fb_0%,#efd9ef_14%,#d7a8cf_30%,#b07bac_46%,#916094_56%,#79538e_64%,#65406f_76%,#4c3354_86%,#382533_93%,rgba(56,37,51,0.35)_97%,transparent_100%)] sm:bottom-10 sm:left-[calc(2rem-1.5px)] sm:top-3'

/** Fundos e ícones: quatro roxos bem distintos. Cartões 0 e 2 partilham coluna no 2×2 — antes liam quase iguais; 0 = rosado quente, 2 = violeta azulado mais intenso. */
const approachCardStyles = [
  {
    surface:
      'bg-gradient-to-br from-[#fdf8fb] to-[#f0e1ec] shadow-[0_12px_40px_-28px_rgba(160,90,130,0.22)] hover:shadow-[0_18px_48px_-28px_rgba(160,90,130,0.32)]',
    icon: 'bg-[#8f4878] text-white',
  },
  {
    surface:
      'bg-gradient-to-br from-[#e9eef9] to-[#d2daf1] shadow-[0_12px_40px_-28px_rgba(65,75,160,0.2)] hover:shadow-[0_18px_48px_-28px_rgba(65,75,160,0.3)]',
    icon: 'bg-[#4850a8] text-white',
  },
  {
    surface:
      'bg-gradient-to-br from-[#e4e6fa] to-[#bdb5e6] shadow-[0_12px_40px_-28px_rgba(75,65,155,0.26)] hover:shadow-[0_18px_48px_-28px_rgba(75,65,155,0.36)]',
    icon: 'bg-[#443b96] text-white',
  },
  {
    surface:
      'bg-gradient-to-br from-[#eaecf6] to-[#cbc7dd] shadow-[0_12px_40px_-28px_rgba(70,72,120,0.22)] hover:shadow-[0_18px_48px_-28px_rgba(70,72,120,0.32)]',
    icon: 'bg-[#4a4678] text-white',
  },
] as const

function SectionHeading(props: {
  eyebrow: string
  title?: string
  subtitle?: string
  /** Quando `true`, o subtítulo usa a largura do contentor (sem `max-w-[72ch]`). */
  subtitleFullWidth?: boolean
}) {
  const hasEyebrowOnly = !props.title && !props.subtitle

  return (
    <div className="mb-8 sm:mb-10">
      <div
        className={cn(
          'flex items-center gap-3',
          hasEyebrowOnly ? 'mb-0' : sectionHeadingGapAfterEyebrow,
        )}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
        <div className="text-[16px] font-semibold tracking-[0.26em] text-primary">
          {props.eyebrow}
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
      </div>
      {props.title ? (
        <h2 className="font-['Montserrat'] text-[28px] leading-[1.08] tracking-[-0.03em] text-black sm:text-[38px]">
          {props.title}
        </h2>
      ) : null}
      {props.subtitle ? (
        <p
          className={cn(
            'text-pretty text-[15px] leading-relaxed text-black/70 sm:text-[16px]',
            props.subtitleFullWidth ? 'max-w-none' : 'max-w-[72ch]',
            props.title ? 'mt-5 sm:mt-7' : 'mt-0',
          )}
        >
          {props.subtitle}
        </p>
      ) : null}
    </div>
  )
}

function ProcessTimeline() {
  const n = processSteps.length
  return (
    <div className={cn(gapAfterSectionHeading, 'mx-auto max-w-3xl')}>
      <div className="relative">
        <div className={processSpineClassName} aria-hidden />
        <ol className="relative z-[1] m-0 list-none p-0">
          {processSteps.map((step, i) => {
            const Icon = processIconById[step.icon]
            const ring = PROCESS_STEP_RING[i]
            const iconTone = PROCESS_ICON_TONE[i]
            return (
              <li key={step.title} className="m-0 p-0">
                <Reveal>
                  <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-8">
                    <div className="flex h-full min-h-0 flex-col items-center">
                      {i > 0 ? (
                        <div className="h-10 w-0 shrink-0 sm:h-12" aria-hidden />
                      ) : (
                        <div className="h-2 w-0 shrink-0 sm:h-3" aria-hidden />
                      )}
                      <div
                        className={cn(
                          'relative z-10 shrink-0 rounded-2xl p-[2.5px] shadow-[0_6px_22px_-6px_rgba(121,83,142,0.38)]',
                          ring,
                        )}
                      >
                        <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-[13px] bg-white sm:h-14 sm:w-14 sm:rounded-[15px]">
                          <Icon className={cn('h-6 w-6 sm:h-7 sm:w-7', iconTone)} strokeWidth={1.6} aria-hidden />
                        </div>
                      </div>
                      {i < n - 1 ? (
                        <div className="min-h-[1.25rem] w-0 flex-1" aria-hidden />
                      ) : (
                        <div className="h-12 w-0 shrink-0 sm:h-14" aria-hidden />
                      )}
                    </div>
                    <div
                      className={cn(
                        'min-w-0 pb-10 sm:pb-12',
                        i > 0 ? 'pt-10 sm:pt-12' : 'pt-2 sm:pt-3',
                      )}
                    >
                      <h3 className="font-['Montserrat'] text-[17px] font-semibold tracking-[-0.02em] text-black sm:text-[18px]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-pretty text-[14px] leading-relaxed text-black/70 sm:text-[15px]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}


function resolveNextProject(current: Project): Project | null {
  const i = projects.findIndex((x) => x.slug === current.slug)
  if (i < 0 || projects.length <= 1) return null
  return projects[(i + 1) % projects.length]
}

function ProjectCaseCard({ project: p }: { project: Project }) {
  const nextProject = resolveNextProject(p)

  if (p.caseStudyLayout === 'narrative-ilgenio') {
    return <IlGenioCaseStudy project={p} narrative={ilGenioNarrative} nextProject={nextProject} />
  }
  if (p.caseStudyLayout === 'narrative-plataforma-gestao') {
    return <IlGenioCaseStudy project={p} narrative={plataformaGestaoNarrative} nextProject={nextProject} />
  }
  if (p.caseStudyLayout === 'narrative-summit-stoneworks') {
    return <IlGenioCaseStudy project={p} narrative={summitStoneworksNarrative} nextProject={nextProject} />
  }

  const onBrand = Boolean(p.modalHeaderOnBrand)
  const onBrandPillClass = onBrand
    ? 'border-primary/40 bg-primary/10 text-black/80'
    : undefined

  return (
    <>
    <article
      className="mx-auto flex w-full max-w-[min(980px,calc(100%-28px))] flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.25)]"
    >
      <div
        className={cn(
          'relative shrink-0 border-b p-5 sm:p-7',
          p.modalHeaderClassName ?? 'border-black/10 bg-white',
        )}
      >
        <div className="text-center sm:text-left">
          <div
            className={cn(
              'text-[11px] font-semibold tracking-[0.22em]',
              onBrand ? 'text-white/90 uppercase' : 'text-black/50',
            )}
          >
            {projectMetaLine(p)}
          </div>
          {p.hideTitle && p.cardAsideTitle ? (
            <h1
              className={cn(
                "mt-2 font-['Montserrat'] text-[26px] leading-[1.1] tracking-[-0.03em] whitespace-pre-line sm:text-[34px]",
                onBrand ? 'text-white' : 'text-black',
              )}
            >
              {p.cardAsideTitle}
            </h1>
          ) : !p.hideTitle ? (
            <h1
              className={cn(
                "mt-2 font-['Montserrat'] text-[26px] leading-[1.1] tracking-[-0.03em] sm:text-[34px]",
                onBrand ? 'text-white' : 'text-black',
              )}
            >
              {p.title}
            </h1>
          ) : null}
          <p
            className={cn(
              'mt-2 max-w-[72ch] text-[13.5px] leading-relaxed sm:text-[14.5px]',
              onBrand ? 'text-white/90' : 'text-black/70',
            )}
          >
            {p.modalTagline ?? p.tagline}
          </p>
        </div>
      </div>

      <div>
        <div className="flex min-h-0 flex-col">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-[1.35fr_0.65fr]">
            <div className="p-5 sm:p-7">
              <div className="grid gap-5">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.22em] text-black/50">
                    PROBLEMA
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-black/75">{p.problem}</p>
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.22em] text-black/50">
                    ABORDAGEM
                  </div>
                  <ul className="mt-2 grid gap-2 text-[14px] leading-relaxed text-black/75">
                    {p.approach.map((a) => (
                      <li key={a} className="flex gap-3">
                        <span
                          className={cn(
                            'mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full',
                            onBrand ? '' : 'bg-primary/50',
                          )}
                          style={
                            onBrand ? { backgroundColor: ON_BRAND_MODAL_ACCENT } : undefined
                          }
                        />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.22em] text-black/50">
                    DESTAQUES
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.highlights.map((h) => (
                      <Pill key={h} className={onBrandPillClass} noHover={onBrand}>
                        {h}
                      </Pill>
                    ))}
                  </div>
                </div>
                {p.result ? (
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.22em] text-black/50">
                      RESULTADO
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed text-black/75">{p.result}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-black/10 p-5 sm:border-l sm:border-t-0 sm:p-7">
              <div className="text-[11px] font-semibold tracking-[0.22em] text-black/50">
                ENTREGÁVEIS
              </div>
              <ul className="mt-2 grid gap-2 text-[13.5px] leading-relaxed text-black/72">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span
                      className={cn(
                        'mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full',
                        onBrand ? '' : 'bg-primary/50',
                      )}
                      style={
                        onBrand ? { backgroundColor: ON_BRAND_MODAL_ACCENT } : undefined
                      }
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <div className="text-[11px] font-semibold tracking-[0.22em] text-black/50">
                  ESCOPO
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.scope.map((s) => (
                    <Pill key={s} className={onBrandPillClass} noHover={onBrand}>
                      {s}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
            </div>

            {p.modalProductScreens && p.modalProductScreens.length > 0 ? (
              <div
                className="border-t border-black/10 bg-gradient-to-b from-primary/[0.04] to-white px-5 py-8 sm:px-8"
              >
                <div
                  className={cn(
                    'text-[11px] font-semibold tracking-[0.22em]',
                    onBrand ? 'text-primary/90' : 'text-primary/80',
                  )}
                >
                  {p.modalScreensSectionTitle ?? 'Interfaces do produto'}
                </div>
                <p className="mt-2 max-w-[80ch] text-[13.5px] leading-relaxed text-black/60">
                  Abaixo, capturas do fluxo real da plataforma. Role para ver a sequência, no mesmo
                  eixo do resumo do case.
                </p>
                <div className="mt-6 grid max-w-4xl grid-cols-1 gap-10">
                  {p.modalProductScreens.map((screen) => (
                    <div key={screen.imageSrc} className="m-0">
                      <ProjectScreenImage
                        src={screen.imageSrc}
                        alt={screen.imageAlt}
                        label={screen.label}
                        width={screen.width}
                        height={screen.height}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
        </div>
      </div>
    </article>
      <NextProjectTeaser project={nextProject} />
    </>
  )
}

function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = useMemo(() => projects.find((p) => p.slug === slug) ?? null, [slug])
  const nextProjectForNav = useMemo(
    () => (project ? resolveNextProject(project) : null),
    [project],
  )

  useLayoutEffect(() => {
    if (project) window.scrollTo(0, 0)
  }, [project, slug])

  useEffect(() => {
    if (!project) return
    const rawStudyTitle =
      project.hideTitle && project.cardAsideTitle ? project.cardAsideTitle : project.title
    const studyTitle = rawStudyTitle.replace(/\s*\n\s*/g, ' ').trim()
    const next = `Estudo: ${studyTitle} · RUXD`
    document.title = next
    return () => {
      document.title = DEFAULT_DOC_TITLE
    }
  }, [project])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') void navigate('/#projetos')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  if (!project) return <Navigate to="/" replace />

  const isNarrativeCaseStudy =
    project.caseStudyLayout === 'narrative-ilgenio' ||
    project.caseStudyLayout === 'narrative-plataforma-gestao' ||
    project.caseStudyLayout === 'narrative-summit-stoneworks'

  return (
    <main className="relative z-10 pb-20">
      {isNarrativeCaseStudy ? (
        <div className="w-full min-w-0">
          <ProjectCaseCard project={project} />
        </div>
      ) : (
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-2 sm:pt-4">
            <Link
              to="/#projetos"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg py-2 text-[13px] font-semibold text-primary outline-none transition hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Voltar aos projetos
            </Link>
            {nextProjectForNav ? (
              <Link
                to={`/projeto/${nextProjectForNav.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg py-2 text-[13px] font-semibold text-primary outline-none transition hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Ir para próximo projeto
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            ) : null}
          </div>
          <div className="mt-4">
            <ProjectCaseCard project={project} />
          </div>
        </Container>
      )}
    </main>
  )
}

function PortfolioHeader({
  headerRef,
}: {
  headerRef?: RefObject<HTMLElement | null>
}) {
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 bg-white"
    >
      <Container className="flex items-center justify-between py-3.5">
        <Link
          to="/"
          className="flex items-center rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label="Início"
        >
          <img
            src="/logo-ruxd.png"
            alt="RUXD"
            width={120}
            height={36}
            className="m-0 h-9 w-auto rounded-xl sm:h-10 sm:rounded-2xl"
            decoding="async"
          />
        </Link>
        <nav className="hidden items-center gap-0.5 sm:flex" aria-label="Principal">
          <NavLink to="/#projetos">Projetos</NavLink>
          <NavLink to="/#abordagem">Abordagem</NavLink>
          <NavLink to="/#processo">Processo</NavLink>
          <NavLink to="/#sobre">Sobre</NavLink>
          <NavLink to="/#contato">Contato</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button href="https://www.linkedin.com/in/rodrigo-fagundes-ux-designer/" variant="primary">
            LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button href="/curriculo-rodrigo-fagundes.pdf" variant="ghost">
            Currículo
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </header>
  )
}

function HomePage() {
  const headerRef = useRef<HTMLElement | null>(null)
  useHomeSectionHashScroll()

  return (
    <>
      <PortfolioHeader headerRef={headerRef} />

      <main className="relative z-10">
        <section className="relative min-h-[78vh] overflow-hidden pt-0">
          <div className="relative flex min-h-[78vh] flex-col bg-white">
            <FloatingBackground variant="hero" />
            <Container className="relative z-10 flex flex-1 flex-col justify-center py-12 isolate sm:py-16">
              <div className="flex max-w-[min(100%,680px)] flex-col sm:max-w-[min(100%,780px)]">
                <div className="flex flex-col gap-1">
                  <div className="text-[18px] font-semibold tracking-[-0.02em] text-black sm:text-[20px]">
                    Rodrigo M. Fagundes
                  </div>
                  <div className="text-[13px] font-medium uppercase tracking-[0.18em] text-black/50 sm:text-[14px]">
                    UX/UI Designer
                  </div>
                </div>

                <div className="mt-14 flex flex-col sm:mt-[4.5rem]">
                  <h1 className="font-['Montserrat'] text-[44px] leading-[0.98] tracking-[-0.045em] text-black sm:text-[72px]">
                    Transformando{' '}
                    <span className="text-primary">dores</span> em{' '}
                    <span className="text-primary">soluções</span> através
                    <br />
                    do design
                  </h1>
                  <div className="mt-14 flex flex-wrap gap-2 sm:mt-20">
                    <Button
                      href="https://www.linkedin.com/in/rodrigo-fagundes-ux-designer/"
                      variant="primary"
                      className="px-5 py-3 text-[14px] sm:text-[15px]"
                    >
                      LinkedIn
                      <ArrowUpRight className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      href="/curriculo-rodrigo-fagundes.pdf"
                      variant="ghost"
                      className="px-5 py-3 text-[14px] sm:text-[15px]"
                    >
                      Currículo
                      <ArrowUpRight className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </section>

        <section
          id="projetos"
          className={cn(
            'border-t border-primary/15 bg-gradient-to-b from-primary/[0.12] via-primary/[0.04] to-white',
            sectionPaddingY,
          )}
        >
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="PROJETOS"
                subtitle="Cada projeto abaixo resume o contexto, o trabalho desenvolvido e o impacto."
              />
            </Reveal>
            <div className={cn(gapAfterSectionHeading, 'flex flex-col gap-10 sm:gap-14')}>
              {projects.map((p, i) => (
                <Reveal key={p.slug}>
                  <CaseStudyShowcase index={i} project={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="abordagem"
          className={sectionPaddingYCompact}
        >
          <Container>
            <Reveal>
              <h2 className="sr-only">Abordagem</h2>
              <SectionHeading
                eyebrow="ABORDAGEM"
                subtitle="Combino UX Thinking com estratégia de produto para criar soluções escaláveis que resolvem necessidades reais dos usuários, estão alinhadas aos objetivos do negócio e são feitas para funcionar de verdade e não apenas para ficar bonitas no Figma. Sem enrolação. Sem over-design. Apenas soluções bem pensadas, testadas e que funcionam."
                subtitleFullWidth
              />
            </Reveal>
            <div className={cn(gapAfterSectionHeading, 'grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6')}>
              {approachItems.map((item, i) => {
                const Icon = approachIconById[item.icon]
                const style = approachCardStyles[i % approachCardStyles.length]
                return (
                  <Reveal key={item.title}>
                    <motion.div
                      className={cn(
                        'flex h-full items-center gap-5 rounded-2xl p-7 transition duration-300 hover:-translate-y-1 sm:gap-6 sm:p-8',
                        style.surface,
                      )}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                    >
                      <div
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                          style.icon,
                        )}
                        aria-hidden
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.65} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-['Montserrat'] text-[17px] font-semibold tracking-[-0.02em] text-black sm:text-[18px]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-pretty text-[14px] leading-relaxed text-black/70">{item.text}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                )
              })}
            </div>
          </Container>
        </section>

        <section id="processo" className={sectionPaddingYCompact}>
          <Container>
            <Reveal>
              <h2 className="sr-only">Processo</h2>
              <SectionHeading
                eyebrow="PROCESSO"
                subtitle="Um fluxo enxuto que se adapta ao tamanho do risco. Mais profundidade quando precisa, mais velocidade quando dá."
                subtitleFullWidth
              />
            </Reveal>
            <ProcessTimeline />
          </Container>
        </section>

        <section id="sobre" className={sectionPaddingY}>
          <Container>
            <Reveal>
              <SectionHeading eyebrow="SOBRE MIM" />
              <h2 className="sr-only">{aboutContent.title}</h2>
            </Reveal>
            <Reveal
              className={cn(
                gapAfterSectionHeading,
                'grid gap-3 sm:grid-cols-[1fr_minmax(260px,400px)] sm:items-start sm:gap-x-1',
              )}
            >
              <div className="flex min-w-0 flex-col gap-6">
                <div className="max-w-[72ch] space-y-4 text-[15px] leading-relaxed text-black/70 sm:text-[16px]">
                  {aboutContent.paragraphs.map((block, i) => (
                    <p key={i}>{block}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {aboutContent.chips.map((c) => (
                    <Fragment key={c}>
                      <Pill
                        className="border-primary/40 bg-primary/10 text-black/80"
                        noHover
                      >
                        {c}
                      </Pill>
                      {c === 'Design System' ? (
                        <span
                          className="h-0 w-full shrink-0 basis-full"
                          aria-hidden
                        />
                      ) : null}
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="relative flex flex-col sm:-translate-x-3 md:-translate-x-5">
                {aboutContent.photos.map((photo, index) =>
                  index === 0 ? (
                    <div
                      key={photo.src}
                      className="relative z-20 ml-0 mr-auto aspect-square w-full max-w-[min(100%,400px)] -translate-y-5 -translate-x-6 rounded-full sm:-translate-y-7 sm:-translate-x-10"
                    >
                      <span
                        className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full translate-x-3 rounded-full border-2 border-primary/45 -translate-y-2 sm:translate-x-4 sm:-translate-y-3"
                        aria-hidden
                      />
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="relative z-10 aspect-square h-full w-full rounded-full border border-black/[0.06] object-cover shadow-[0_16px_48px_-28px_rgba(0,0,0,0.28)]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div
                      key={photo.src}
                      className="relative ml-auto mr-0 aspect-square w-[min(100%,280px)] -mt-[5.75rem] sm:-mt-[6.25rem] sm:w-[min(100%,260px)]"
                    >
                      {/* anel z-15 fica abaixo da foto maior (z-20); img z-30 por cima */}
                      <div
                        className="pointer-events-none absolute inset-0 z-[15]"
                        aria-hidden
                      >
                        <span className="absolute left-0 top-0 h-full w-full translate-x-3 -translate-y-2 rounded-full border-2 border-primary/45 sm:translate-x-4 sm:-translate-y-3" />
                      </div>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="absolute inset-0 z-30 aspect-square h-full w-full -translate-y-8 translate-x-3 rounded-full border border-black/[0.06] object-cover shadow-[0_16px_48px_-28px_rgba(0,0,0,0.28)] sm:-translate-y-5 sm:translate-x-5"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ),
                )}
              </div>
            </Reveal>
          </Container>
        </section>

        <section
          id="contato"
          className={cn(
            'border-t border-black/[0.06] bg-gradient-to-b from-primary/[0.07] to-white',
            sectionPaddingY,
          )}
        >
          <Container>
            <Reveal>
              <div className="contact-card-surface flex min-h-[260px] flex-col rounded-[28px] border border-primary/20 p-8 shadow-[0_20px_70px_-40px_rgba(121,83,142,0.38)] sm:min-h-[240px] sm:p-10">
                <div className="relative z-10 min-w-0 flex-1">
                  <div className="text-[16px] font-semibold tracking-[0.22em] text-primary">CONTATO</div>
                  <h2
                    className={cn(
                      "font-['Montserrat'] text-[30px] leading-[1.08] tracking-[-0.03em] text-black sm:text-[40px]",
                      contatoCardMarginTopAfterEyebrow,
                    )}
                  >
                    Vamos conversar sobre o seu próximo passo
                  </h2>
                  <p className="mt-3 max-w-none text-[15px] leading-relaxed text-black/70 sm:text-[16px]">
                    Conte em poucas linhas o produto, o prazo e o que você quer melhorar.
                    <br />
                    Respondo com perguntas objetivas e uma proposta de como avançar.
                  </p>
                </div>
                <div className="relative z-10 mt-auto flex shrink-0 justify-end pt-6 sm:pt-8">
                  <Button href="https://www.linkedin.com/in/rodrigo-fagundes-ux-designer/" variant="primary">
                    Entrar em contato
                  </Button>
                </div>
              </div>
            </Reveal>

            <footer className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center">
              <p className="text-[12px] text-black/50">
                © {new Date().getFullYear()} · Rodrigo Medeiros Fagundes · UX/UI Design
              </p>
              <nav className="flex flex-wrap gap-1" aria-label="Rodapé">
                <NavLink to="/#projetos">Projetos</NavLink>
                <NavLink to="/#abordagem">Abordagem</NavLink>
                <NavLink to="/#processo">Processo</NavLink>
                <NavLink to="/#sobre">Sobre</NavLink>
                <NavLink to="/#contato">Contato</NavLink>
              </nav>
            </footer>
          </Container>
        </section>
      </main>
    </>
  )
}

function ProjectRoute() {
  return (
    <>
      <PortfolioHeader />
      <ProjectPage />
    </>
  )
}

const shellClass =
  'min-h-screen bg-[#ffffff] text-black [font-family:Sen,system-ui,-apple-system,Segoe_UI,Roboto,sans-serif]'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={shellClass}>
            <HashToProjectRoute />
            <HomePage />
          </div>
        }
      />
      <Route
        path="projeto/:slug"
        element={
          <div className={shellClass}>
            <ProjectRoute />
          </div>
        }
      />
    </Routes>
  )
}
