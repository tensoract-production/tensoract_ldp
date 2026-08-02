import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

import { ArrowRight } from '@/components/Icon'
import { plateForSlug } from '@/components/Woodblock'
import { cn } from '@/utilities/ui'

export function hostOf(url?: string | null): string | null {
  if (!url) return null
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return null
  }
}

/**
 * A product reads as an entry in a printed index, not a card in a grid: each
 * row is a different length because each product is a different size, and the
 * rules between them are the only container needed.
 */
export const ProductRow: React.FC<{
  product: Product
  locale: Locale
  dict: Dictionary
  className?: string
}> = ({ className, dict, locale, product }) => {
  const Plate = plateForSlug(product.slug)
  const host = hostOf(product.externalUrl)

  return (
    <li className={cn('edge-print', className)}>
      <Link
        className="group grid items-start gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12"
        href={`/${locale}/products/${product.slug}`}
      >
        <div className="w-28 md:col-span-2 md:w-full md:max-w-[8.5rem]">
          <Plate />
        </div>

        <div className="md:col-span-6">
          <h3 className="serif text-[clamp(1.6rem,3vw,2.15rem)] transition-colors group-hover:text-son-deep">
            {product.title}
          </h3>
          {product.tagline && (
            <p className="measure mt-3 leading-relaxed text-ink-soft">{product.tagline}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 md:col-span-4 md:items-end md:text-right">
          <span className="record text-ink-soft">
            {product.code} · {dict.products.status[product.status]}
          </span>
          {host && <span className="record text-ink-soft">{host}</span>}
          <span className="mt-2 inline-flex items-center gap-2 text-ink transition-colors group-hover:text-son-deep">
            {dict.products.readMore}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </li>
  )
}
