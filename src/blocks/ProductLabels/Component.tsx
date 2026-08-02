import React from 'react'

import type { Product, ProductLabelsBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { ProductRow } from '@/components/ProductCard'
import { Section, SectionHeader } from '@/components/Section'
import { getDictionary } from '@/i18n/dictionaries'
import { findProducts } from '@/utilities/getProducts'

type Props = ProductLabelsBlock & { locale: Locale }

export const ProductLabelsBlockComponent: React.FC<Props> = async ({
  heading,
  intro,
  limit,
  links,
  locale,
  products,
  source,
}) => {
  const dict = getDictionary(locale)

  const docs: Product[] =
    source === 'manual'
      ? ((products ?? []).filter((p): p is Product => typeof p === 'object') as Product[])
      : await findProducts({
          locale,
          limit: limit ?? 6,
          featuredOnly: source === 'featured',
        })

  return (
    <Section id="products">
      <div className="container">
        <SectionHeader heading={heading} intro={intro} />

        {docs.length === 0 ? (
          <p className="mt-14 text-ink-soft">{dict.products.empty}</p>
        ) : (
          <ul className="mt-16 edge-print-b">
            {docs.map((product) => (
              <ProductRow dict={dict} key={product.id} locale={locale} product={product} />
            ))}
          </ul>
        )}

        {links && links.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-4">
            {links.map(({ link }, i) => (
              <CMSLink key={i} locale={locale} {...link} />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
