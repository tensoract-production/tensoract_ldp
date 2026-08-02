import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Section } from '@/components/Section'

type Props = CTABlockProps & { locale?: Locale }

/** The close: no box, no panel — just the page ending on the one action. */
export const CallToActionBlock: React.FC<Props> = ({ links, locale, richText }) => {
  return (
    <Section>
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          </div>
          <div className="flex flex-col items-start gap-4 md:col-span-4 md:col-start-9">
            {(links || []).map(({ link }, i) => (
              <CMSLink
                className={i === 0 ? 'ink-action' : undefined}
                key={i}
                locale={locale}
                {...link}
                appearance="inline"
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
