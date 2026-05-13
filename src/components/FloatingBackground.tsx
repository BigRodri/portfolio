import { cn } from '../lib/cn'
import './FloatingBackground.css'

type FloatingBackgroundProps = {
  /**
   * `hero`: absolute inset-0, relative to the nearest positioned ancestor (hero block).
   * `viewport`: fixed inset-0 behind full viewport (use only if stacking context is correct).
   */
  variant?: 'hero' | 'viewport'
  className?: string
}

function FloatingBackgroundUiSilhouettes() {
  return (
    <>
      <div className="floating-bg-ui floating-bg-ui--1">
        <div className="floating-bg-ghost-card">
          <div className="floating-bg-ghost-card__bar" />
          <div className="floating-bg-ghost-card__line floating-bg-ghost-card__line--short" />
          <div className="floating-bg-ghost-card__line floating-bg-ghost-card__line--shorter" />
        </div>
      </div>
      <div className="floating-bg-ui floating-bg-ui--2">
        <div className="floating-bg-ghost-media">
          <div className="floating-bg-ghost-media__title" />
          <div className="floating-bg-ghost-media__track">
            <div className="floating-bg-ghost-media__thumb" />
          </div>
          <div className="floating-bg-ghost-media__controls">
            <span className="floating-bg-ghost-media__dot" />
            <span className="floating-bg-ghost-media__dot" />
            <span className="floating-bg-ghost-media__dot" />
          </div>
        </div>
      </div>
      <div className="floating-bg-ui floating-bg-ui--3">
        <div className="floating-bg-ghost-feature">
          <div className="floating-bg-ghost-feature__thumb" />
          <div className="floating-bg-ghost-card__line floating-bg-ghost-card__line--short" />
          <div className="floating-bg-ghost-card__line floating-bg-ghost-card__line--shorter" />
          <div className="floating-bg-ghost-feature__btn" />
        </div>
      </div>
      <div className="floating-bg-ui floating-bg-ui--4">
        <div className="floating-bg-ghost-icon-row">
          <span className="floating-bg-ghost-icon" />
          <span className="floating-bg-ghost-icon" />
          <span className="floating-bg-ghost-icon floating-bg-ghost-icon--accent" />
          <span className="floating-bg-ghost-icon" />
        </div>
      </div>
      <div className="floating-bg-ui floating-bg-ui--5">
        <div className="floating-bg-ui-stack">
          <div className="floating-bg-ghost-search">
            <div className="floating-bg-ghost-search__inner" />
          </div>
          <div className="floating-bg-ghost-pills">
            <span className="floating-bg-ghost-pill floating-bg-ghost-pill--solid" />
            <span className="floating-bg-ghost-pill floating-bg-ghost-pill--ghost" />
          </div>
        </div>
      </div>
      <div className="floating-bg-ui floating-bg-ui--6">
        <div className="floating-bg-ui-stack">
          <div className="floating-bg-ghost-tabs">
            <span className="floating-bg-ghost-tab floating-bg-ghost-tab--active" />
            <span className="floating-bg-ghost-tab" />
            <span className="floating-bg-ghost-tab" />
            <span className="floating-bg-ghost-tab" />
          </div>
          <div className="floating-bg-ui-row">
            <span className="floating-bg-ghost-toggle">
              <span className="floating-bg-ghost-toggle__knob" />
            </span>
            <span className="floating-bg-ghost-toggle floating-bg-ghost-toggle--off">
              <span className="floating-bg-ghost-toggle__knob" />
            </span>
          </div>
        </div>
      </div>
      <div className="floating-bg-ui floating-bg-ui--7">
        <div className="floating-bg-ghost-product">
          <div className="floating-bg-ghost-product__hero" />
          <div className="floating-bg-ghost-card__line floating-bg-ghost-card__line--short" />
          <div className="floating-bg-ghost-product__cta" />
        </div>
      </div>
    </>
  )
}

/** Gradiente em `.floating-bg-root`; silhuetas do kit na faixa `floating-bg-hero-ui-slot` (variant hero). */
export function FloatingBackground({ variant = 'hero', className }: FloatingBackgroundProps) {
  if (variant === 'viewport') {
    return (
      <div
        className={cn('floating-bg-root', 'floating-bg-root--viewport', className)}
        aria-hidden
      >
        <FloatingBackgroundUiSilhouettes />
      </div>
    )
  }

  return (
    <>
      <div className={cn('floating-bg-root', className)} aria-hidden />
      <div className="floating-bg-hero-ui-slot" aria-hidden>
        <FloatingBackgroundUiSilhouettes />
      </div>
    </>
  )
}
