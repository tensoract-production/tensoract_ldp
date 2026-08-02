import React from 'react'

import type { ManifestHeroBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Barcode } from '@/components/Barcode'
import { CMSLink } from '@/components/Link'
import { Eyebrow } from '@/components/Section'
import { Stamp } from '@/components/Stamp'

type Props = ManifestHeroBlock & { locale?: Locale }

export const ManifestHeroBlockComponent: React.FC<Props> = ({
  eyebrow,
  headline,
  labelCode,
  labelRows,
  labelStamp,
  labelTitle,
  lead,
  links,
  locale,
}) => {
  const lines = headline.split('\n').filter((line) => line.trim().length > 0)
  const code = labelCode || 'TSR-2022'

  return (
    <section className="pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="container grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow className="anim-rise">{eyebrow}</Eyebrow>}

          <h1 className="display mt-6 text-[clamp(2.75rem,8.5vw,6rem)]">
            {lines.map((line, i) => (
              <span
                className="anim-rise block"
                key={i}
                style={{ animationDelay: `${0.06 * (i + 1)}s` }}
              >
                {line}{' '}
              </span>
            ))}
          </h1>

          {lead && (
            <p
              className="anim-rise mt-7 max-w-[46ch] text-lg leading-relaxed text-ink-soft md:text-xl"
              style={{ animationDelay: `${0.06 * (lines.length + 1)}s` }}
            >
              {lead}
            </p>
          )}

          {links && links.length > 0 && (
            <div
              className="anim-rise mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: `${0.06 * (lines.length + 2)}s` }}
            >
              {links.map(({ link }, i) => (
                <CMSLink key={i} locale={locale} size="lg" {...link} />
              ))}
            </div>
          )}
        </div>

        {/* The signature: a printed shipping label, freshly stamped. */}
        <div className="lg:col-span-5">
          <div className="anim-settle label-card mx-auto max-w-[26rem] shadow-[0_18px_40px_-28px_rgb(0_0_0/0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-3.5">
              <span className="manifest pt-1.5 text-ink-soft">{code}</span>
              {labelStamp && <Stamp>{labelStamp}</Stamp>}
            </div>

            {labelTitle && (
              <p className="display px-5 pt-6 pb-5 text-[1.75rem]">{labelTitle}</p>
            )}

            {labelRows && labelRows.length > 0 && (
              <dl className="px-5 pb-6">
                {labelRows.map((row) => (
                  <div className="border-t border-rule py-3.5 first:border-t-0" key={row.id}>
                    <dt className="manifest text-ink-soft">{row.label}</dt>
                    <dd className="mt-1.5 leading-snug">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="border-t border-rule px-5 pt-4 pb-4">
              <div className="text-ink">
                <Barcode count={54} height={34} value={code} />
              </div>
              <p className="manifest mt-2.5 text-ink-soft">{code}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
