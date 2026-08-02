import React from 'react'

import type { AwardsBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { ArrowUpRight } from '@/components/Icon'
import { Section, SectionHeader } from '@/components/Section'
import { getDictionary } from '@/i18n/dictionaries'

type Props = AwardsBlock & { locale: Locale }

/**
 * The seal lives here. It is pressed only against a result an outside body
 * ruled on, which is why it means anything at all — a decorative seal on every
 * section would be a sticker.
 */
export const AwardsBlockComponent: React.FC<Props> = ({ heading, intro, items, locale }) => (
  <Section id="awards">
    <div className="container">
      <SectionHeader heading={heading} intro={intro} />

      {items && items.length > 0 && (
        <ol className="mt-16 edge-print">
          {items.map((item, i) => (
            <li
              className="grid gap-6 edge-print-b py-10 md:grid-cols-12 md:gap-10"
              key={item.id ?? i}
            >
              <p className="record tnum text-ink-soft md:col-span-2">{item.year}</p>

              <div className="md:col-span-7">
                <h3 className="serif text-[1.6rem]">{item.title}</h3>
                <p className="mt-2 text-ink-soft">{item.organisation}</p>
                {item.description && (
                  <p className="measure mt-4 leading-relaxed text-ink-soft">{item.description}</p>
                )}
                {item.url && (
                  <a
                    className="mt-5 inline-flex items-center gap-2 text-ink underline decoration-rule decoration-1 underline-offset-[6px] transition-colors hover:text-son-deep hover:decoration-son"
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {getDictionary(locale).awards.source}
                    <ArrowUpRight />
                  </a>
                )}
              </div>

              {item.result && (
                <div className="md:col-span-3 md:justify-self-end md:pt-2">
                  <span className="seal">{item.result}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  </Section>
)
