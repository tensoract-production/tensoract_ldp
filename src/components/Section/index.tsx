import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Sections are pressings on one sheet: a printed edge separates them, and the
 * heading carries its own weight. No kicker above it — the label above a
 * heading is the tell of a page that did not trust its own words.
 */
export const Section: React.FC<{
  children?: React.ReactNode
  className?: string
  id?: string
  tone?: 'paper' | 'sunk'
}> = ({ children, className, id, tone = 'paper' }) => (
  <section
    className={cn(
      'border-t border-rule py-24 md:py-32',
      tone === 'sunk' && 'bg-paper-sunk',
      className,
    )}
    id={id}
  >
    {children}
  </section>
)

export const SectionHeader: React.FC<{
  heading: string
  intro?: string | null
  className?: string
  align?: 'split' | 'stacked'
}> = ({ align = 'split', className, heading, intro }) => {
  if (align === 'stacked') {
    return (
      <header className={cn('max-w-[22ch]', className)}>
        <h2 className="serif text-[clamp(2rem,4.6vw,3.4rem)]">{heading}</h2>
        {intro && <p className="measure mt-6 text-lg text-ink-soft">{intro}</p>}
      </header>
    )
  }

  return (
    <header className={cn('grid gap-8 md:grid-cols-12 md:gap-10', className)}>
      <h2 className="serif text-[clamp(2rem,4.6vw,3.4rem)] md:col-span-6">{heading}</h2>
      {intro && (
        <p className="text-lg leading-relaxed text-ink-soft md:col-span-5 md:col-start-8">
          {intro}
        </p>
      )}
    </header>
  )
}
