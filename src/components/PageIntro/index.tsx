import React from 'react'

import { cn } from '@/utilities/ui'

/** The masthead every non-CMS page opens with. */
export const PageIntro: React.FC<{
  children?: React.ReactNode
  className?: string
  heading: string
  intro?: string | null
}> = ({ children, className, heading, intro }) => (
  <header className={cn('border-b border-border pt-12 pb-10 md:pt-24 md:pb-16', className)}>
    <div className="container">
      <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
        <h1 className="wire-title text-[clamp(1.9rem,6vw,4.2rem)] md:col-span-6">{heading}</h1>
        {intro && (
          <p className="text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8 md:text-lg">
            {intro}
          </p>
        )}
      </div>
      {children}
    </div>
  </header>
)
