import type { Metadata } from 'next/types'

import React from 'react'

import { PageIntro } from '@/components/PageIntro'
import { ProductCard, productGridCols } from '@/components/ProductCard'
import { cn } from '@/utilities/ui'
import { toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { findProducts } from '@/utilities/getProducts'

export const revalidate = 600

type Args = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: Args) {
  const locale = toLocale((await params).locale)
  const dict = getDictionary(locale)
  const products = await findProducts({ locale, limit: 50 })

  return (
    <div>
      <PageIntro
        heading={dict.products.indexTitle}
        intro={dict.products.indexLead}
        meta={`${products.length} ${locale === 'vi' ? 'sản phẩm' : 'products'}`}
      />

      <div className="py-14 md:py-16">
        <div className="container">
          {products.length === 0 ? (
            <p className="text-ink-soft">{dict.products.empty}</p>
          ) : (
            <ul className={cn('grid gap-5', productGridCols(products.length))}>
              {products.map((product) => (
                <li className="flex" key={product.id}>
                  <ProductCard
                    className="w-full"
                    dict={dict}
                    locale={locale}
                    product={product}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const dict = getDictionary(toLocale((await params).locale))

  return {
    title: `${dict.products.indexTitle} — Tensoract`,
    description: dict.products.indexLead,
  }
}
