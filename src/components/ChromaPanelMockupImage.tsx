import { useEffect, useLayoutEffect, useState } from 'react'
import { cn } from '../lib/cn'

type Props = {
  src: string
  alt: string
  className?: string
}

/**
 * Verde do ícone WhatsApp (~#25D366 e variações no mockup): não remover como chroma.
 * Distingue do verde-limão do fundo (R e B muito baixos).
 */
function isUiFloatingActionGreen(r: number, g: number, b: number): boolean {
  if (g < 170 || g > 248) return false
  if (r < 18 || r > 88) return false
  if (b < 70 || b > 138) return false
  return g >= r * 2.0 && g >= b * 1.25
}

/** Verde “chroma” de fundo (limão / tela): G dominante com R e B relativamente baixos. */
function isKeyGreen(r: number, g: number, b: number): boolean {
  if (isUiFloatingActionGreen(r, g, b)) return false
  if (g < 72) return false
  const sumRb = r + b + 1
  const dominance = g / sumRb
  if (dominance >= 2.2) return true
  const m = Math.max(r, b)
  if (g < m + 18) return false
  // Exige B e R contidos para não apanhar verdes “brand” mais teal (ex. WhatsApp)
  if (b > 92 || r > 92) return false
  return g > r * 1.08 && g > b * 1.08
}

/** Bordas / spill mais lavado. */
function isKeyGreenLoose(r: number, g: number, b: number): boolean {
  if (isUiFloatingActionGreen(r, g, b)) return false
  if (g < 55) return false
  const m = Math.max(r, b)
  if (b > 100 && g < 235) return false
  return g > m + 12 && g >= r && g >= b
}

function floodGreenFromEdges(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  scratch: Uint8Array,
): void {
  const q: number[] = []
  const push = (x: number, y: number) => {
    const p = y * width + x
    if (scratch[p] !== 0) return
    const i = p * 4
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2]
    if (!isKeyGreenLoose(r, g, b)) return
    scratch[p] = 1
    q.push(p)
  }

  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }

  while (q.length) {
    const p = q.pop()!
    const x = p % width
    const y = (p / width) | 0
    const neighbors = [
      x > 0 ? p - 1 : -1,
      x < width - 1 ? p + 1 : -1,
      y > 0 ? p - width : -1,
      y < height - 1 ? p + width : -1,
    ]
    for (const np of neighbors) {
      if (np < 0 || scratch[np] !== 0) continue
      const i = np * 4
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2]
      if (!isKeyGreenLoose(r, g, b)) continue
      scratch[np] = 1
      q.push(np)
    }
  }

  for (let p = 0; p < width * height; p++) {
    if (scratch[p] === 1) {
      const i = p * 4
      data[i + 3] = 0
    }
  }
}

function eatGreenFringe(data: Uint8ClampedArray, width: number, height: number): void {
  const copy = new Uint8ClampedArray(data)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4
      if (copy[i + 3] > 14) continue
      let opaque = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const j = ((y + dy) * width + (x + dx)) * 4
          if (copy[j + 3] > 200) opaque++
        }
      }
      if (opaque < 4) continue
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2]
      if (isUiFloatingActionGreen(r, g, b)) continue
      if (g > r + 10 && g > b + 10) {
        data[i] = r
        data[i + 1] = Math.min(g, (r + b) >> 1)
        data[i + 2] = b
        data[i + 3] = 0
      }
    }
  }
}

/**
 * Halo verde semi-opaco (ex.: anti-alias entre chroma e moldura do MacBook menor):
 * `eatGreenFringe` ignora α > 14; estes pixéis ficam visíveis sob escala/redimensionamento.
 */
function softenGreenHalosNearOpaque(data: Uint8ClampedArray, width: number, height: number): void {
  const copy = new Uint8ClampedArray(data)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4
      const a = copy[i + 3]
      if (a < 10 || a > 248) continue
      const r = copy[i],
        g = copy[i + 1],
        b = copy[i + 2]
      if (isUiFloatingActionGreen(r, g, b)) continue
      if (g <= r + 5 || g <= b + 5) continue

      let opaqueNear = 0
      let maxNeighborA = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue
          const j = ((y + dy) * width + (x + dx)) * 4
          const na = copy[j + 3]
          if (na > maxNeighborA) maxNeighborA = na
          if (na > 205) opaqueNear++
        }
      }
      if (opaqueNear < 3 || maxNeighborA < 198) continue

      const strongSpill = g > r + 11 && g > b + 11
      const midSpill = a < 140 && g > r + 7 && g > b + 7

      if (a < 125 && (strongSpill || midSpill)) {
        data[i + 3] = 0
        data[i] = 0
        data[i + 1] = 0
        data[i + 2] = 0
        continue
      }

      if (a < 210 && strongSpill) {
        const ng = Math.min(g, Math.round((r + b) / 2))
        data[i + 1] = ng
        const na = Math.max(0, Math.round(a * (g > r + 18 ? 0.42 : 0.62)))
        data[i + 3] = na
        if (na === 0) {
          data[i] = 0
          data[i + 1] = 0
          data[i + 2] = 0
        }
      }
    }
  }
}

function reduceGreenSpillOnDark(data: Uint8ClampedArray): void {
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3]
    if (a < 16) continue
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2]
    if (isUiFloatingActionGreen(r, g, b)) continue
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    if (lum > 95) continue
    if (g > r + 6 && g > b + 6) {
      const ng = Math.round((r + b) / 2)
      data[i + 1] = Math.min(g, ng)
    }
  }
}

function zeroRgbWhenFullyTransparent(data: Uint8ClampedArray): void {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) {
      data[i] = 0
      data[i + 1] = 0
      data[i + 2] = 0
    }
  }
}

function processChroma(imageData: ImageData): void {
  const { data, width, height } = imageData
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2]
    if (isKeyGreen(r, g, b)) {
      data[i + 3] = 0
    }
  }

  const scratch = new Uint8Array(width * height)
  floodGreenFromEdges(data, width, height, scratch)
  eatGreenFringe(data, width, height)
  softenGreenHalosNearOpaque(data, width, height)
  reduceGreenSpillOnDark(data)
  zeroRgbWhenFullyTransparent(data)
}

/**
 * Inclui pixels com α baixo (franjas pós-export). Necessário porque após o chroma
 * as linhas de artefacto muitas vezes não chegam a `opaque` o suficiente para a versão anterior.
 */
function rowEdgeLumStats(
  data: Uint8ClampedArray,
  width: number,
  y: number,
): { mean: number; span: number; solidFrac: number } | null {
  let minL = 255
  let maxL = 0
  let sum = 0
  let n = 0
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4
    const a = data[i + 3]
    if (a < 10) continue
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
    minL = Math.min(minL, lum)
    maxL = Math.max(maxL, lum)
    sum += lum
    n++
  }
  const solidFrac = n / width
  const minSamples = Math.max(24, Math.min(width, Math.floor(width * 0.012)))
  if (n < minSamples) return null
  return { mean: sum / n, span: maxL - minL, solidFrac }
}

function rowMostlyTransparent(
  data: Uint8ClampedArray,
  width: number,
  y: number,
  transparentIfAlphaBelow: number,
  fracThreshold: number,
): boolean {
  let trans = 0
  for (let x = 0; x < width; x++) {
    const a = data[(y * width + x) * 4 + 3]
    if (a < transparentIfAlphaBelow) trans++
  }
  return trans / width >= fracThreshold
}

/** Luminância típica de fundo roxo residual (não ecrãs brancos nem preto dos devices). */
function purpleMarginReferenceLum(
  data: Uint8ClampedArray,
  w: number,
  h: number,
): number {
  const candidates: number[] = []
  for (let y = 0; y < h; y += 2) {
    const s = rowEdgeLumStats(data, w, y)
    if (!s) continue
    if (s.mean >= 26 && s.mean <= 102 && s.solidFrac > 0.04) {
      candidates.push(s.mean)
    }
  }
  if (candidates.length === 0) return 52
  candidates.sort((a, b) => a - b)
  return candidates[Math.floor(candidates.length * 0.4)]
}

function measureExportHairlineTrim(
  data: Uint8ClampedArray,
  w: number,
  h: number,
): { top: number; bottom: number } {
  const body = purpleMarginReferenceLum(data, w, h)
  const rowCap = Math.min(12, Math.max(4, Math.floor(h * 0.022)))

  let top = 0
  while (top < rowCap && top < h - 4) {
    if (rowMostlyTransparent(data, w, top, 14, 0.97)) {
      top++
      continue
    }
    break
  }

  while (top < rowCap && top < h - 5) {
    const cur = rowEdgeLumStats(data, w, top)
    const nxt = rowEdgeLumStats(data, w, top + 1)
    if (!nxt) break
    if (!cur) {
      top++
      continue
    }
    const darkerThanBody =
      cur.mean < body - 4 ||
      (cur.mean < body + 4 && cur.mean < nxt.mean - 1.2)
    const darkOrSharp =
      (cur.mean < nxt.mean - 1 && cur.mean < 115 && cur.span < 78) ||
      (cur.mean < 62 && cur.span < 90)
    if (darkerThanBody && darkOrSharp) {
      top++
      continue
    }
    break
  }

  /* Passagem extra: risco de 1px quase da mesma luminância que o roxo por baixo. */
  const microCap = top + 6
  while (top < microCap && top < h - 6) {
    const cur = rowEdgeLumStats(data, w, top)
    const nxt = rowEdgeLumStats(data, w, top + 1)
    if (!cur || !nxt) break
    if (cur.mean < nxt.mean - 0.35 && cur.span < 45) {
      top++
      continue
    }
    if (cur.mean <= body + 3 && cur.mean < nxt.mean - 0.2 && cur.span < 42) {
      top++
      continue
    }
    break
  }

  let bottom = 0
  while (bottom < rowCap && h - 1 - bottom > top + 14) {
    const y = h - 1 - bottom
    if (rowMostlyTransparent(data, w, y, 14, 0.97)) {
      bottom++
      continue
    }
    break
  }

  while (bottom < rowCap && h - 1 - bottom > top + 14) {
    const y = h - 1 - bottom
    const cur = rowEdgeLumStats(data, w, y)
    const prev = rowEdgeLumStats(data, w, y - 1)
    if (!cur || !prev) break
    const lighterFringe =
      cur.mean > prev.mean + 0.9 &&
      (cur.mean > body + 1.5 || cur.mean > prev.mean + 3) &&
      cur.span < 68
    if (lighterFringe) {
      bottom++
      continue
    }
    break
  }

  const minTop =
    h > 120 ? Math.min(14, Math.max(6, Math.ceil(h * 0.0072))) : 0
  const minBottom =
    h > 120 ? Math.min(8, Math.max(3, Math.ceil(h * 0.004))) : 0
  if (minTop > 0) top = Math.max(top, minTop)
  if (minBottom > 0) bottom = Math.max(bottom, minBottom)

  const maxStrip = Math.min(Math.floor(h * 0.075), h - 40)
  while (top + bottom > maxStrip) {
    if (top >= bottom && top > 0) top--
    else if (bottom > 0) bottom--
    else break
  }

  return { top, bottom }
}

function copyBufferCropVertical(
  src: Uint8ClampedArray,
  width: number,
  height: number,
  top: number,
  bottom: number,
): Uint8ClampedArray {
  const nh = height - top - bottom
  const out = new Uint8ClampedArray(width * nh * 4)
  const rb = width * 4
  for (let yy = top; yy < height - bottom; yy++) {
    out.set(src.subarray(yy * rb, (yy + 1) * rb), (yy - top) * rb)
  }
  return out
}

/**
 * Mockup com fundo chroma verde: torna-o transparente para o gradiente do card
 * aparecer; dispositivos e ecrãs mantêm-se opacos.
 */
export function ChromaPanelMockupImage(props: Props) {
  const { src, alt, className } = props
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [useRaw, setUseRaw] = useState(false)

  /** Evita um frame com `dataUrl` antigo quando a rota/mockup mudam. */
  useLayoutEffect(() => {
    setDataUrl(null)
    setUseRaw(false)
  }, [src])

  useEffect(() => {
    let cancelled = false

    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (cancelled) return
      try {
        const w = img.naturalWidth
        const h = img.naturalHeight
        if (!w || !h) {
          setUseRaw(true)
          return
        }
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) {
          setUseRaw(true)
          return
        }
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, w, h)
        processChroma(imageData)

        const { top, bottom } = measureExportHairlineTrim(imageData.data, w, h)
        const nh = h - top - bottom
        let buf: Uint8ClampedArray = imageData.data
        let outH = h
        if ((top > 0 || bottom > 0) && nh >= 32) {
          buf = copyBufferCropVertical(imageData.data, w, h, top, bottom)
          outH = nh
        }

        const out = ctx.createImageData(w, outH)
        out.data.set(buf)
        canvas.height = outH
        ctx.putImageData(out, 0, 0)
        setDataUrl(canvas.toDataURL('image/png'))
      } catch {
        setUseRaw(true)
      }
    }
    img.onerror = () => {
      if (!cancelled) setUseRaw(true)
    }
    img.src = src

    return () => {
      cancelled = true
    }
  }, [src])

  if (useRaw) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn('block max-w-full', className)}
        loading="eager"
        decoding="async"
      />
    )
  }

  const waitingChroma = !dataUrl

  return (
    <img
      src={waitingChroma ? src : dataUrl}
      alt={alt}
      className={cn(
        'block max-w-full',
        className,
        waitingChroma && 'pointer-events-none opacity-0 select-none',
      )}
      loading="eager"
      decoding="async"
    />
  )
}
