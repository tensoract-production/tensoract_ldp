import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * The masthead every non-CMS page opens with: a mono meta line in the margin,
 * the title set wide, and a lead. Same three parts as a section header so the
 * blog and product pages read as one document with the home page.
 */
export const PageIntro: React.FC<{
  children?: React.ReactNode
  className?: string
  heading: string
  intro?: string | null
  meta?: string | null
}> = ({ children, className, heading, intro, meta }) => (
  <header className={cn('border-b border-rule pt-14 pb-12 md:pt-20 md:pb-14', className)}>
    <div className="container">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          {meta && <p className="manifest text-ink-soft">{meta}</p>}
          <h1 className={cn('display text-[clamp(2.25rem,6vw,4rem)]', meta && 'mt-5')}>
            {heading}
          </h1>
        </div>
        {intro && (
          <p className="text-lg leading-relaxed text-ink-soft md:col-span-5">{intro}</p>
        )}
      </div>
      {children}
    </div>
  </header>
)
