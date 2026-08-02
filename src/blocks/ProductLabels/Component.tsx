import React from 'react'

import type { Product, ProductLabelsBlock } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { ProductCard, productGridCols } from '@/components/ProductCard'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { cn } from '@/utilities/ui'
import { Section, SectionHeader } from '@/components/Section'
import { getDictionary } from '@/i18n/dictionaries'
import { findProducts } from '@/utilities/getProducts'

type Props = ProductLabelsBlock & { locale: Locale }

export const ProductLabelsBlockComponent: React.FC<Props> = async ({
  eyebrow,
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
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />

        {docs.length === 0 ? (
          <p className="mt-12 text-ink-soft">{dict.products.empty}</p>
        ) : (
          <RevealGroup as="ul" className={cn('mt-14 grid gap-5', productGridCols(docs.length))}>
            {docs.map((product, i) => (
              <RevealItem as="li" className="flex" index={i} key={product.id}>
                <ProductCard className="w-full" dict={dict} locale={locale} product={product} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        {links && links.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-3">
            {links.map(({ link }, i) => (
              <CMSLink key={i} locale={locale} size="lg" {...link} />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
