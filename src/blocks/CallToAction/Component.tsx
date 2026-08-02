import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Section } from '@/components/Section'

type Props = CTABlockProps & { locale?: Locale }

export const CallToActionBlock: React.FC<Props> = ({ links, locale, richText }) => {
  return (
    <Section>
      <div className="container">
        <div className="label-card grid gap-8 p-7 md:grid-cols-12 md:items-center md:gap-10 md:p-10">
          <div className="md:col-span-7">
            {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
            {(links || []).map(({ link }, i) => (
              <CMSLink key={i} locale={locale} size="lg" {...link} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
