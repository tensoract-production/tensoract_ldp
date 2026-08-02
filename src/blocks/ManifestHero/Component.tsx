import React from 'react'

import type { ManifestHeroBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { PlateWorkroom } from '@/components/Woodblock'

type Props = ManifestHeroBlock & { locale?: Locale }

/**
 * The first viewport is the thesis: the headline at press scale on bare paper,
 * a plate of the workroom beside it, and beneath both a single printed line of
 * registration facts closed by the seal. No hero card, no metric band.
 */
export const ManifestHeroBlockComponent: React.FC<Props> = ({
  headline,
  labelCode,
  labelRows,
  labelStamp,
  lead,
  links,
  locale,
}) => {
  const lines = headline.split('\n').filter((line) => line.trim().length > 0)

  return (
    <section className="pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="container">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="serif anim-settle text-[clamp(2.5rem,6.6vw,5rem)]">
              {lines.map((line, i) => (
                <span className="block" key={i}>
                  {line}{' '}
                </span>
              ))}
            </h1>

            {lead && (
              <p
                className="measure anim-settle mt-8 text-lg leading-relaxed text-ink-soft md:text-xl"
                style={{ animationDelay: '0.1s' }}
              >
                {lead}
              </p>
            )}

            {links && links.length > 0 && (
              <div
                className="anim-settle mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
                style={{ animationDelay: '0.18s' }}
              >
                {links.map(({ link }, i) => (
                  <CMSLink key={i} locale={locale} size={i === 0 ? 'lg' : undefined} {...link} />
                ))}
              </div>
            )}
          </div>

          <figure
            className="anim-settle lg:col-span-5"
            style={{ animationDelay: '0.26s' }}
          >
            <PlateWorkroom label="Xưởng làm việc của Tensoract, dựng theo lối tranh khắc gỗ" />
            <figcaption className="record mt-4 text-ink-soft">
              Tranh khắc dựng tay — chưa phải ảnh chụp thật
            </figcaption>
          </figure>
        </div>

        {/* The registration line: the facts a public record already holds. */}
        {labelRows && labelRows.length > 0 && (
          <dl className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-rule pt-6 md:mt-24">
            {labelCode && <dt className="record sr-only">{labelCode}</dt>}
            {labelRows.map((row) => (
              <div className="flex items-baseline gap-3" key={row.id}>
                <dt className="record text-ink-soft">{row.label}</dt>
                <dd className="text-ink">{row.value}</dd>
              </div>
            ))}
            {labelStamp && (
              <dd className="seal ml-auto" title={labelCode ?? undefined}>
                {labelStamp}
              </dd>
            )}
          </dl>
        )}
      </div>
    </section>
  )
}
