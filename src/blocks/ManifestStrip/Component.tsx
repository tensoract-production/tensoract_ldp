import React from 'react'

import type { ManifestStripBlock as Props } from '@/payload-types'

/**
 * The facts set as one printed line rather than a row of big numbers over
 * small labels — that arrangement is the template every SaaS page ships, and
 * it turns a company into a scoreboard. Here the numbers sit inside the
 * sentence, the way a colophon states them.
 */
export const ManifestStripBlockComponent: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="border-t border-rule py-16 md:py-20">
      <div className="container">
        <p className="serif flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[clamp(1.25rem,2.4vw,1.85rem)] leading-snug">
          {items.map((item, i) => (
            <React.Fragment key={item.id ?? i}>
              {i > 0 && (
                <span aria-hidden="true" className="text-rule">
                  /
                </span>
              )}
              <span>
                <span className="tnum text-ink">{item.value}</span>{' '}
                <span className="text-ink-soft">{item.label}</span>
              </span>
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
