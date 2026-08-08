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

/**
 * The pair the theme switch flips between. Both are cut with the same square
 * caps as the arrows, so the sun reads as a struck mark rather than a drawn
 * clip-art disc.
 */
export const Sun: React.FC<IconProps> = ({ className }) => (
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
    <circle cx="8" cy="8" r="3.1" />
    <path d="M8 1.4v1.5M8 13.1v1.5M1.4 8h1.5M13.1 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M12.6 3.4l-1 1M4.4 11.6l-1 1" />
  </svg>
)

export const Moon: React.FC<IconProps> = ({ className }) => (
  <svg
    aria-hidden="true"
    className={cn(base, 'h-[1.05em] w-[1.05em]', className)}
    fill="none"
    stroke="currentColor"
    strokeLinejoin="round"
    strokeWidth="1.75"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.4 9.9A5.7 5.7 0 0 1 6.1 2.6a5.7 5.7 0 1 0 7.3 7.3Z" />
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
