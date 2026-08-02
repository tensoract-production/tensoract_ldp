import React from 'react'

import type { ApproachBlock as Props } from '@/payload-types'

import { Section, SectionHeader } from '@/components/Section'

export const ApproachBlockComponent: React.FC<Props> = ({ heading, intro, items }) => (
  <Section>
    <div className="container">
      <SectionHeader heading={heading} intro={intro} />

      {items && items.length > 0 && (
        <ul className="mt-16 edge-print">
          {items.map((item, i) => (
            <li
              className="grid gap-4 edge-print-b py-9 md:grid-cols-12 md:gap-10"
              key={item.id ?? i}
            >
              <h3 className="serif text-[1.5rem] md:col-span-5">{item.title}</h3>
              <p className="leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  </Section>
)
