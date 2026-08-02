import type { Metadata } from 'next/types'

import React from 'react'

import { PageIntro } from '@/components/PageIntro'
import { ProductRow } from '@/components/ProductCard'
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
      <PageIntro heading={dict.products.indexTitle} intro={dict.products.indexLead} />

      <div className="py-4 md:py-8">
        <div className="container">
          {products.length === 0 ? (
            <p className="py-16 text-ink-soft">{dict.products.empty}</p>
          ) : (
            <ul className="border-b border-rule">
              {products.map((product) => (
                <ProductRow dict={dict} key={product.id} locale={locale} product={product} />
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
