import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Every marketing section sits between two hairlines and opens with the same
 * three-part header: a mono eyebrow, a display heading, and an optional lead.
 * Keeping that constant is what lets the label cards be the loud thing.
 */
export const Section: React.FC<{
  children?: React.ReactNode
  className?: string
  id?: string
  tone?: 'paper' | 'sunk'
}> = ({ children, className, id, tone = 'paper' }) => (
  <section
    className={cn(
      'border-t border-rule py-20 md:py-28',
      tone === 'sunk' && 'bg-paper-sunk',
      className,
    )}
    id={id}
  >
    {children}
  </section>
)

export const SectionHeader: React.FC<{
  eyebrow?: string | null
  heading: string
  intro?: string | null
  className?: string
  align?: 'split' | 'stacked'
}> = ({ eyebrow, heading, intro, className, align = 'split' }) => {
  if (align === 'stacked') {
    return (
      <header className={cn('max-w-[52ch]', className)}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{heading}</h2>
        {intro && <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>}
      </header>
    )
  }

  // Split header: the heading and the lead share a baseline, like a form and its note.
  return (
    <header className={cn('grid gap-8 md:grid-cols-12 md:items-end', className)}>
      <div className="md:col-span-7">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{heading}</h2>
      </div>
      {intro && (
        <p className="text-lg leading-relaxed text-ink-soft md:col-span-5">{intro}</p>
      )}
    </header>
  )
}

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <p className={cn('manifest flex items-center gap-2.5 text-ink-soft', className)}>
    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-verified" />
    {children}
  </p>
)
