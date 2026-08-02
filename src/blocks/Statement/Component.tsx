import React from 'react'

import type { StatementBlock as Props } from '@/payload-types'

import { Eyebrow, Section } from '@/components/Section'

export const StatementBlockComponent: React.FC<Props> = ({
  attribution,
  attributionRole,
  eyebrow,
  text,
}) => (
  <Section tone="sunk">
    <div className="container">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      <blockquote className="display mt-7 max-w-[22ch] text-[clamp(1.9rem,5vw,3.5rem)]">
        {text}
      </blockquote>

      {attribution && (
        <footer className="manifest mt-9 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink-soft">
          <span className="text-ink">{attribution}</span>
          {attributionRole && (
            <>
              <span aria-hidden="true">/</span>
              <span>{attributionRole}</span>
            </>
          )}
        </footer>
      )}
    </div>
  </Section>
)
