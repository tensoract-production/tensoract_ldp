import React from 'react'

import type { StatementBlock as Props } from '@/payload-types'

import { Section } from '@/components/Section'

export const StatementBlockComponent: React.FC<Props> = ({
  attribution,
  attributionRole,
  text,
}) => (
  <Section tone="sunk">
    <div className="container">
      <blockquote className="serif max-w-[20ch] text-[clamp(2rem,5.4vw,3.9rem)]">
        {text}
      </blockquote>

      {attribution && (
        <footer className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-ink">{attribution}</span>
          {attributionRole && <span className="record text-ink-soft">{attributionRole}</span>}
        </footer>
      )}
    </div>
  </Section>
)
