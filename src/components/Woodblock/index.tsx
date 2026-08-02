import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Woodblock plates.
 *
 * A cut block prints in one flat ink or not at all, so there are no gradients
 * and no variable strokes here — only solid shapes. Two things make it read as
 * printed rather than drawn: the ink bleeds a little into the paper fibre, and
 * the second colour block is registered a hair off the first, the way a
 * two-block print always is.
 *
 * These are authored illustration standing in for photography the company does
 * not have yet. They are deliberately not photorealistic so nobody mistakes
 * them for a picture of the real office.
 */

const BLEED_ID = 'tsr-bleed'

export const WoodblockDefs: React.FC = () => (
  <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
    <defs>
      <filter id={BLEED_ID} x="-10%" y="-10%" width="120%" height="120%">
        {/* Roughen the edge, then let it seep — ink meeting a fibrous sheet.
            The displacement has to be coarse enough to read at plate size;
            a subtle one just makes the shapes look like flat vector icons. */}
        <feTurbulence baseFrequency="0.34 0.52" numOctaves="3" result="noise" type="fractalNoise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.4" />
        <feGaussianBlur stdDeviation="0.4" />
      </filter>
    </defs>
  </svg>
)

type PlateProps = {
  className?: string
  /** Described for assistive tech; these carry meaning, not decoration. */
  label?: string
}

const plateBase = 'block h-auto w-full'

/**
 * The workroom. Seven people is small enough to draw honestly: three at the
 * bench, a window, and the parcels the software is about.
 */
export const PlateWorkroom: React.FC<PlateProps> = ({ className, label }) => (
  <svg
    className={cn(plateBase, className)}
    role={label ? 'img' : 'presentation'}
    viewBox="0 0 480 360"
    xmlns="http://www.w3.org/2000/svg"
  >
    {label && <title>{label}</title>}

    {/* Cinnabar block, printed first and slightly out of register: daylight in
        the window, and the pool the lamp throws onto the bench. */}
    <g fill="var(--son)" filter={`url(#${BLEED_ID})`} opacity="0.9" transform="translate(3 -2)">
      <rect height="118" width="150" x="44" y="40" />
      <path d="M252 236h84l16 16h-116z" />
    </g>

    {/* Ink block. */}
    <g fill="var(--ink)" filter={`url(#${BLEED_ID})`}>
      {/* Window frame and the light falling through it */}
      <path d="M40 36h158v126H40V36zm12 12v102h134V48H52z" />
      <rect height="102" width="6" x="115" y="48" />
      <rect height="6" width="134" x="52" y="96" />

      {/* Pendant lamp: cord, shade, and the cone of light under it */}
      <rect height="40" width="3" x="292" y="20" />
      <path d="M268 60h50l-9 26h-32z" />
      <path d="M276 96h34l-6 14h-22z" opacity="0.35" />

      {/* The bench */}
      <rect height="7" width="404" x="38" y="252" />
      <rect height="60" width="7" x="62" y="259" />
      <rect height="60" width="7" x="411" y="259" />

      {/* Three at work: head, shoulders, and the lean of someone concentrating */}
      <g>
        <circle cx="120" cy="196" r="19" />
        <path d="M96 252c0-17 11-29 24-29s24 12 24 29H96z" />
      </g>
      <g>
        <circle cx="196" cy="188" r="19" />
        <path d="M170 252c0-19 12-32 26-32s26 13 26 32h-52z" />
      </g>
      <g>
        <circle cx="288" cy="200" r="17" />
        <path d="M266 252c0-16 10-27 22-27s22 11 22 27h-44z" />
      </g>

      {/* Parcels stacked at the end of the bench */}
      <path d="M340 196h64v56h-64z" />
      <rect fill="var(--paper)" height="56" width="6" x="369" y="196" />
      <rect fill="var(--paper)" height="6" width="64" x="340" y="218" />
      <path d="M356 148h64v44h-64z" />
      <rect fill="var(--paper)" height="44" width="6" x="385" y="148" />

      {/* Floor line */}
      <rect height="5" width="440" x="20" y="330" />
    </g>
  </svg>
)

/** One plate per product, cut down to the single object each one is about. */
export const PlateParcelCamera: React.FC<PlateProps> = ({ className, label }) => (
  <svg
    className={cn(plateBase, className)}
    role={label ? 'img' : 'presentation'}
    viewBox="0 0 160 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    {label && <title>{label}</title>}
    <g fill="var(--son)" filter={`url(#${BLEED_ID})`} opacity="0.9" transform="translate(2 -2)">
      <circle cx="80" cy="26" r="11" />
    </g>
    <g fill="var(--ink)" filter={`url(#${BLEED_ID})`}>
      <path d="M52 14h56l10 18H42z" />
      <rect height="6" width="4" x="78" y="32" />
      <path d="M36 52h88v52H36z" />
      <rect fill="var(--paper)" height="52" width="6" x="77" y="52" />
      <rect fill="var(--paper)" height="6" width="88" x="36" y="72" />
    </g>
  </svg>
)

export const PlateRoutes: React.FC<PlateProps> = ({ className, label }) => (
  <svg
    className={cn(plateBase, className)}
    role={label ? 'img' : 'presentation'}
    viewBox="0 0 160 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    {label && <title>{label}</title>}
    <g fill="var(--son)" filter={`url(#${BLEED_ID})`} opacity="0.9" transform="translate(2 -2)">
      <circle cx="128" cy="62" r="9" />
    </g>
    <g fill="var(--ink)" filter={`url(#${BLEED_ID})`}>
      <path d="M18 30h40v28H18z" />
      <path d="M18 68h40v28H18z" />
      <path d="M70 48h40v28H70z" />
      <rect height="5" width="16" x="58" y="42" />
      <rect height="5" width="16" x="58" y="80" />
      <rect height="5" width="18" x="110" y="60" />
      <circle cx="128" cy="62" r="9" />
    </g>
  </svg>
)

export const PlateBrush: React.FC<PlateProps> = ({ className, label }) => (
  <svg
    className={cn(plateBase, className)}
    role={label ? 'img' : 'presentation'}
    viewBox="0 0 160 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    {label && <title>{label}</title>}
    <g fill="var(--son)" filter={`url(#${BLEED_ID})`} opacity="0.9" transform="translate(3 -2)">
      <path d="M96 34h38v38H96z" />
    </g>
    <g fill="var(--ink)" filter={`url(#${BLEED_ID})`}>
      <path d="M26 22h68v76H26zm10 10v56h48V32H36z" />
      <rect height="6" width="30" x="44" y="46" />
      <rect height="6" width="40" x="44" y="62" />
      <path d="M112 22l14 8-34 56-14-8z" />
      <path d="M78 78l14 8-20 12z" />
    </g>
  </svg>
)

export const PlateGate: React.FC<PlateProps> = ({ className, label }) => (
  <svg
    className={cn(plateBase, className)}
    role={label ? 'img' : 'presentation'}
    viewBox="0 0 160 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    {label && <title>{label}</title>}
    <g fill="var(--son)" filter={`url(#${BLEED_ID})`} opacity="0.9" transform="translate(2 -3)">
      <rect height="8" width="86" x="37" y="20" />
    </g>
    <g fill="var(--ink)" filter={`url(#${BLEED_ID})`}>
      <rect height="10" width="104" x="28" y="26" />
      <rect height="66" width="12" x="38" y="36" />
      <rect height="66" width="12" x="110" y="36" />
      <path d="M62 102V62h36v40H86V76H74v26z" />
      <rect height="5" width="130" x="15" y="102" />
    </g>
  </svg>
)

export const productPlates = {
  ecombox: PlateParcelCamera,
  'goi-hang-chuan': PlateRoutes,
  deligent: PlateBrush,
  'tvts-10': PlateGate,
} as const

export function plateForSlug(slug: string) {
  return productPlates[slug as keyof typeof productPlates] ?? PlateParcelCamera
}
