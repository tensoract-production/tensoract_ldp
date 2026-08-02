import React from 'react'

import type { PartnersBlock as Props } from '@/payload-types'

import { Media } from '@/components/Media'
import { Section, SectionHeader } from '@/components/Section'

/**
 * A contact sheet of hairline cells. Where there is no logo the name is set in
 * the display face instead — a wordmark reads better than a stretched PNG.
 */
export const PartnersBlockComponent: React.FC<Props> = ({ eyebrow, groups, heading, intro }) => (
  <Section id="partners" tone="sunk">
    <div className="container">
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />

      {groups && groups.length > 0 && (
        <div className="mt-14 flex flex-col gap-12">
          {groups.map((group, gi) => (
            <div className="grid gap-5 md:grid-cols-12 md:gap-8" key={group.id ?? gi}>
              <p className="manifest text-ink-soft md:col-span-3 md:pt-5">{group.label}</p>

              <ul className="grid grid-cols-2 border-t border-l border-rule bg-paper sm:grid-cols-3 md:col-span-9 lg:grid-cols-4">
                {(group.items ?? []).map((partner, pi) => {
                  const inner =
                    partner.logo && typeof partner.logo === 'object' ? (
                      <Media
                        className="flex items-center justify-center"
                        imgClassName="max-h-9 w-auto object-contain"
                        resource={partner.logo}
                      />
                    ) : (
                      <span className="display text-center text-lg text-ink-soft transition-colors group-hover:text-ink">
                        {partner.name}
                      </span>
                    )

                  return (
                    <li className="border-r border-b border-rule" key={partner.id ?? pi}>
                      {partner.url ? (
                        <a
                          className="group flex h-24 items-center justify-center px-4 transition-colors hover:bg-verified-wash"
                          href={partner.url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="group flex h-24 items-center justify-center px-4">
                          {inner}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  </Section>
)
