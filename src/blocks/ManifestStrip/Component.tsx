import React from 'react'

import type { ManifestStripBlock as Props } from '@/payload-types'

import { RevealGroup, RevealItem } from '@/components/Reveal'
import { cn } from '@/utilities/ui'

// The ink band that runs across the page like the barcode row on a label.
const columns: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-3 lg:grid-cols-6',
}

export const ManifestStripBlockComponent: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="bg-ink text-paper">
      <div className="container">
        <RevealGroup
          as="dl"
          className={cn(
            'grid grid-cols-2 gap-x-6 gap-y-8 py-9 md:gap-0 md:divide-x md:divide-paper/15 md:py-8',
            columns[items.length] ?? 'md:grid-cols-4',
          )}
        >
          {items.map((item, i) => (
            <RevealItem className="md:px-6 md:first:pl-0" index={i} key={item.id ?? i}>
              <dt className="display tnum text-[clamp(1.75rem,3.2vw,2.5rem)]">{item.value}</dt>
              <dd className="manifest mt-1.5 text-paper/60">{item.label}</dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
