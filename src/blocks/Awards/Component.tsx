import React from 'react'

import type { AwardsBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { getDictionary } from '@/i18n/dictionaries'
import { Section, SectionHeader } from '@/components/Section'
import { Stamp } from '@/components/Stamp'

type Props = AwardsBlock & { locale: Locale }

/**
 * A ledger, not a trophy shelf: one hairline-separated row per award, year in
 * the margin, and the stamp only where an outside body actually ruled on it.
 */
export const AwardsBlockComponent: React.FC<Props> = ({
  eyebrow,
  heading,
  intro,
  items,
  locale,
}) => (
  <Section id="awards">
    <div className="container">
      <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />

      {items && items.length > 0 && (
        <ol className="mt-14 border-t border-rule">
          {items.map((item, i) => (
            <li
              className="grid gap-4 border-b border-rule py-8 md:grid-cols-12 md:gap-8"
              key={item.id ?? i}
            >
              <p className="font-mono text-xl tabular-nums text-ink-soft md:col-span-2">
                {item.year}
              </p>

              <div className="md:col-span-7">
                <h3 className="display text-[1.35rem]">{item.title}</h3>
                <p className="manifest mt-2 text-ink-soft">{item.organisation}</p>
                {item.description && (
                  <p className="mt-3.5 max-w-[54ch] leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                )}
                {item.url && (
                  <a
                    className="manifest mt-4 inline-flex items-center gap-1.5 text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-verified-deep hover:decoration-verified"
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {getDictionary(locale).awards.source}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>

              {item.result && (
                <div className="md:col-span-3 md:justify-self-end md:pt-1">
                  <Stamp>{item.result}</Stamp>
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  </Section>
)
