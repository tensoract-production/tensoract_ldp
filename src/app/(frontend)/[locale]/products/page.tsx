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

  // The company leads on Ecombox; the rest is maintained, not led with. The
  // index says so with its structure rather than with an adjective.
  const lead = products.filter((p) => p.tier === 'flagship' || p.tier === 'companion')
  const side = products.filter((p) => p.tier === 'side')

  const groups = [
    { key: 'lead', label: dict.products.flagshipGroup, items: lead },
    { key: 'side', label: dict.products.sideGroup, items: side },
  ].filter((g) => g.items.length > 0)

  return (
    <div>
      <PageIntro heading={dict.products.indexTitle} intro={dict.products.indexLead} />

      <div className="pb-16">
        <div className="container">
          {products.length === 0 ? (
            <p className="py-16 text-ink-soft">{dict.products.empty}</p>
          ) : (
            groups.map((group) => (
              <section className="pt-14" key={group.key}>
                <h2 className="record text-ink-soft">{group.label}</h2>
                <ul className="mt-6 edge-print-b">
                  {group.items.map((product) => (
                    <ProductRow dict={dict} key={product.id} locale={locale} product={product} />
                  ))}
                </ul>
              </section>
            ))
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
