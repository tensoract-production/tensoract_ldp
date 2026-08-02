import React from 'react'

import type { ApproachBlock as Props } from '@/payload-types'

import { Section, SectionHeader } from '@/components/Section'

export const ApproachBlockComponent: React.FC<Props> = ({ eyebrow, heading, intro, items }) => (
  <Section>
    <div className="container">
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />

      {items && items.length > 0 && (
        <ul className="mt-14 border-t border-rule">
          {items.map((item, i) => (
            <li
              className="grid gap-3 border-b border-rule py-7 md:grid-cols-12 md:gap-10"
              key={item.id ?? i}
            >
              <h3 className="display text-[1.35rem] md:col-span-5">{item.title}</h3>
              <p className="leading-relaxed text-ink-soft md:col-span-7">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  </Section>
)
