import React from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ReleasesBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { Section, SectionHeader } from '@/components/Section'
import RichText from '@/components/RichText'

type Props = ReleasesBlock & { locale: Locale }

/**
 * Shipping history as a dated ledger. An investor scanning for momentum reads
 * dates and version numbers, so those get the margin and the tabular figures.
 */
export const ReleasesBlockComponent: React.FC<Props> = async ({
  heading,
  intro,
  limit,
  links,
  locale,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'releases',
    depth: 1,
    limit: limit ?? 4,
    locale,
    overrideAccess: false,
    sort: '-releasedAt',
  })

  if (docs.length === 0) return null

  return (
    <Section id="releases">
      <div className="container">
        <SectionHeader heading={heading} intro={intro} />

        <ol className="mt-16 edge-print">
          {docs.map((release) => {
            const product =
              typeof release.product === 'object' && release.product !== null
                ? release.product
                : null

            return (
              <li
                className="grid gap-4 edge-print-b py-8 md:grid-cols-12 md:gap-10"
                key={release.id}
              >
                <p className="record tnum text-ink-soft md:col-span-2">
                  {new Date(release.releasedAt).toLocaleDateString(
                    locale === 'vi' ? 'vi-VN' : 'en-GB',
                    { day: '2-digit', month: '2-digit', year: 'numeric' },
                  )}
                </p>

                <p className="md:col-span-2">
                  <span className="record tnum text-ink">
                    {product ? `${product.title} ` : ''}
                    {release.version}
                  </span>
                </p>

                <div className="md:col-span-7">
                  <h3 className="serif text-[1.3rem]">{release.title}</h3>
                  {release.notes && (
                    <RichText
                      className="mt-2 max-w-none text-ink-soft"
                      data={release.notes}
                      enableGutter={false}
                    />
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        {links && links.length > 0 && (
          <div className="mt-10">
            {links.map(({ link }, i) => (
              <CMSLink
                className="text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:text-son-deep hover:decoration-son"
                key={i}
                locale={locale}
                {...link}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
