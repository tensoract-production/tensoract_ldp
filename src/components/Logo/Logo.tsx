import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  showWordmark?: boolean
}

/**
 * A cut mark: one square block with the counter carved out of it, the way a
 * seal is cut in reverse. Solid ink, no stroke — a block prints or it does not.
 */
export const Logo = ({ className, showWordmark = true }: Props) => (
  <span className={clsx('inline-flex items-center gap-2.5', className)}>
    <svg
      aria-hidden="true"
      className="h-[1.15rem] w-[1.15rem] shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h20v20H0V0zm4 4v3.4h4.3V16h3.4V7.4H16V4H4z" />
    </svg>
    {showWordmark && (
      <span
        className="text-[1.2rem] leading-none"
        style={{
          fontFamily: 'var(--font-petrona), Georgia, serif',
          fontWeight: 600,
          letterSpacing: '-0.015em',
        }}
      >
        Tensoract
      </span>
    )}
  </span>
)
