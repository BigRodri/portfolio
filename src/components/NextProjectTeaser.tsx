import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { CaseStudyShowcase } from './CaseStudyShowcase'
import {
  caseStudyNextProjectSectionBg,
  caseStudyPageCssVars,
  caseStudyPageTheme,
} from '../content/caseStudyPageTheme'
import { projects, type Project } from '../content/projects'
import { cn } from '../lib/cn'

const teaserKickerClass = cn(
  'font-semibold uppercase tracking-[0.24em]',
  'text-[color:var(--cs-accent)]',
  'text-[13px] sm:text-[15px]',
)

export function NextProjectTeaser(props: { project: Project | null }) {
  const next = props.project
  if (!next) return null

  const homeIndex = projects.findIndex((p) => p.slug === next.slug)
  const index = homeIndex >= 0 ? homeIndex : 0
  const teaserTheme = caseStudyPageTheme(next)

  return (
    <section
      aria-labelledby="next-project-heading"
      style={
        {
          ...caseStudyPageCssVars(teaserTheme),
          ...caseStudyNextProjectSectionBg(teaserTheme),
        } as CSSProperties
      }
      className="w-full border-t border-black/[0.06]"
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-16">
        <Link
          to={`/projeto/${next.slug}`}
          aria-labelledby="next-project-heading"
          className="group mx-auto block w-full rounded-[28px] outline-none transition-[opacity,transform] hover:opacity-[0.98] active:opacity-95 focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--cs-accent-rgb)/0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <p id="next-project-heading" className={cn(teaserKickerClass, 'mb-10 sm:mb-12')}>
            Próximo projeto
          </p>
          <CaseStudyShowcase project={next} index={index} disableInternalNavigation />
        </Link>
      </div>
    </section>
  )
}
