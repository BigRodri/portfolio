import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function Pill(props: { children: ReactNode; className?: string; noHover?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-[12px] font-medium tracking-wide text-black/75',
        !props.noHover && 'transition-colors duration-300 hover:border-primary/30 hover:text-primary',
        props.className,
      )}
    >
      {props.children}
    </span>
  )
}
