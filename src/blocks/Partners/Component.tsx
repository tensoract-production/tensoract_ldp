import React from 'react'

import type { PartnersBlock as Props } from '@/payload-types'

import { Media } from '@/components/Media'
import { Section, SectionHeader } from '@/components/Section'

/**
 * Named in type, not boxed in a logo grid. Without real logo files a grid of
 * empty cells reads as something missing; a printed list of names reads as a
 * list of names, which is what this is.
 */
export const PartnersBlockComponent: React.FC<Props> = ({ groups, heading, intro }) => (
  <Section id="partners" tone="sunk">
    <div className="container">
      <SectionHeader heading={heading} intro={intro} />

      {groups && groups.length > 0 && (
        <div className="mt-16 border-t border-rule">
          {groups.map((group, gi) => (
            <div
              className="grid gap-5 border-b border-rule py-9 md:grid-cols-12 md:gap-10"
              key={group.id ?? gi}
            >
              <p className="record text-ink-soft md:col-span-3 md:pt-2">{group.label}</p>

              <ul className="flex flex-wrap items-center gap-x-10 gap-y-4 md:col-span-9">
                {(group.items ?? []).map((partner, pi) => {
                  const body =
                    partner.logo && typeof partner.logo === 'object' ? (
                      <Media
                        className="flex items-center"
                        imgClassName="max-h-8 w-auto object-contain"
                        resource={partner.logo}
                      />
                    ) : (
                      <span className="serif text-[1.35rem]">{partner.name}</span>
                    )

                  return (
                    <li key={partner.id ?? pi}>
                      {partner.url ? (
                        <a
                          className="text-ink underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors hover:text-son-deep hover:decoration-son"
                          href={partner.url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {body}
                        </a>
                      ) : (
                        body
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
