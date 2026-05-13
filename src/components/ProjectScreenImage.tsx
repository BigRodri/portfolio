import { useState } from 'react'
import { cn } from '../lib/cn'

export function ProjectScreenImage(props: {
  src: string
  alt: string
  label: string
  width?: number
  height?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  /** Evita esticar PNGs de baixa resolução além da largura nativa (borrão); ≥900px usa fluido. */
  const intrinsicW = props.width
  const capDisplayToIntrinsic = intrinsicW != null && intrinsicW < 900

  if (failed) {
    return (
      <div
        className={cn(
          'flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-black/12 bg-black/[0.02] p-8 text-center',
          props.className,
        )}
      >
        <p className="text-[13px] font-semibold text-black/60">{props.label}</p>
        <p className="max-w-md text-[12px] leading-relaxed text-black/45">
          Coloque a captura de tela em <code className="rounded bg-black/[0.06] px-1.5 py-0.5 font-mono text-[11px]">public{props.src}</code> para exibir a interface aqui.
        </p>
      </div>
    )
  }
  return (
    <div
      className={cn(
        'w-full min-w-0 overflow-hidden rounded-lg border border-black/10 bg-white leading-none',
        props.className,
      )}
    >
      <img
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        className={
          capDisplayToIntrinsic
            ? 'mx-auto block h-auto w-auto max-w-full'
            : 'block h-auto w-full max-w-full'
        }
        style={
          capDisplayToIntrinsic && intrinsicW
            ? { maxWidth: `min(100%, ${intrinsicW}px)` }
            : undefined
        }
        decoding="async"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
