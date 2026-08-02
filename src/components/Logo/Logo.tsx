import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  /** Kept for call-site compatibility with the template; the mark is inline SVG. */
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  showWordmark?: boolean
}

/**
 * The mark is four bars in a box: a barcode read at a glance, and the closest
 * thing to a tensor the shipping-label world has. The wordmark is the display
 * face pushed to its widest, which is where Archivo looks most like signage.
 */
export const Logo = ({ className, showWordmark = true }: Props) => (
  <span className={clsx('inline-flex items-center gap-2.5', className)}>
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="19" rx="1.5" stroke="currentColor" strokeWidth="1" width="19" x="0.5" y="0.5" />
      <rect fill="currentColor" height="10" width="2" x="4" y="5" />
      <rect fill="currentColor" height="10" width="1" x="7.5" y="5" />
      <rect fill="currentColor" height="10" width="3" x="10" y="5" />
      <rect fill="currentColor" height="10" width="1" x="15" y="5" />
    </svg>
    {showWordmark && (
      <span
        className="text-[1.0625rem] leading-none"
        style={{
          fontFamily: 'var(--font-archivo), sans-serif',
          fontVariationSettings: "'wdth' 118",
          fontWeight: 600,
          letterSpacing: '0.01em',
        }}
      >
        Tensoract
      </span>
    )}
  </span>
)
