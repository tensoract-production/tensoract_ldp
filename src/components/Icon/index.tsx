import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Drawn icons, one stroke weight throughout. Text arrows and emoji are not an
 * icon system, and this world is printed — its marks are cut, not typed.
 */
type IconProps = { className?: string }

const base = 'inline-block shrink-0'

export const ArrowRight: React.FC<IconProps> = ({ className }) => (
  <svg
    aria-hidden="true"
    className={cn(base, 'h-[0.9em] w-[0.9em]', className)}
    fill="none"
    stroke="currentColor"
    strokeLinecap="square"
    strokeWidth="1.75"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
)

export const ArrowUpRight: React.FC<IconProps> = ({ className }) => (
  <svg
    aria-hidden="true"
    className={cn(base, 'h-[0.9em] w-[0.9em]', className)}
    fill="none"
    stroke="currentColor"
    strokeLinecap="square"
    strokeWidth="1.75"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 12L12 4M5.5 4H12v6.5" />
  </svg>
)

export const Search: React.FC<IconProps> = ({ className }) => (
  <svg
    aria-hidden="true"
    className={cn(base, 'h-[1.05em] w-[1.05em]', className)}
    fill="none"
    stroke="currentColor"
    strokeLinecap="square"
    strokeWidth="1.75"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </svg>
)
