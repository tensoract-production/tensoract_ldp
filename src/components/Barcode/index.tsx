import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * A barcode drawn from the string it labels. Same code in, same bars out — so
 * the server and the client always agree, and every product keeps its own
 * recognisable pattern. Decorative: it encodes nothing a scanner could read.
 */
function bars(seed: string, count: number): number[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }

  const next = () => {
    h ^= h << 13
    h |= 0
    h ^= h >>> 17
    h ^= h << 5
    h |= 0
    return (h >>> 0) / 4294967296
  }

  return Array.from({ length: count }, () => next())
}

type Props = {
  value: string
  className?: string
  height?: number
  count?: number
}

export const Barcode: React.FC<Props> = ({ value, className, height = 30, count = 48 }) => {
  const noise = bars(value, count * 2)

  let x = 0
  const rects: { x: number; w: number }[] = []

  for (let i = 0; i < count; i++) {
    const w = 1 + Math.round(noise[i * 2] * 2) // 1–3 units wide
    const gap = 1 + Math.round(noise[i * 2 + 1] * 1.4) // 1–2 units of paper
    rects.push({ x, w })
    x += w + gap
  }

  return (
    <svg
      aria-hidden="true"
      className={cn('block w-full', className)}
      height={height}
      preserveAspectRatio="none"
      viewBox={`0 0 ${x} 10`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {rects.map((r, i) => (
        <rect fill="currentColor" height="10" key={i} width={r.w} x={r.x} y="0" />
      ))}
    </svg>
  )
}
