import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

import { Barcode } from '@/components/Barcode'
import { StatusChip } from '@/components/StatusChip'
import { cn } from '@/utilities/ui'

/**
 * Four label cards fill a four-column row exactly; anything else reads better
 * in threes. Keeps the grid from ending on a lone orphan card.
 */
export function productGridCols(count: number): string {
  return count % 4 === 0 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'
}

export function hostOf(url?: string | null): string | null {
  if (!url) return null
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return null
  }
}

/**
 * A product printed as a shipping label: tracking code and status on the
 * header rule, the name set large, a barcode along the tear line, and the
 * destination on the footer rule.
 */
export const ProductCard: React.FC<{
  product: Product
  locale: Locale
  dict: Dictionary
  className?: string
}> = ({ product, locale, dict, className }) => {
  const host = hostOf(product.externalUrl)

  return (
    <article
      className={cn(
        'label-card group relative flex flex-col transition-[transform,border-color] duration-200',
        'hover:-translate-y-0.5 hover:border-ink/25',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3">
        <span className="manifest text-ink-soft">{product.code}</span>
        <StatusChip label={dict.products.status[product.status]} status={product.status} />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5 pt-7 pb-8">
        <h3 className="display text-[1.55rem]">
          <Link
            className="outline-none after:absolute after:inset-0 after:content-['']"
            href={`/${locale}/products/${product.slug}`}
          >
            {product.title}
          </Link>
        </h3>
        {product.tagline && (
          <p className="leading-relaxed text-ink-soft">{product.tagline}</p>
        )}
      </div>

      <div className="px-5 text-ink/80 transition-colors duration-200 group-hover:text-verified">
        <Barcode count={38} height={24} value={`${product.code}-${product.slug}`} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-rule px-5 py-3">
        <span className="manifest truncate text-ink-soft">
          {host ?? dict.products.category[product.category ?? 'ecommerce']}
        </span>
        <span className="manifest inline-flex shrink-0 items-center gap-1.5 text-ink transition-colors group-hover:text-verified-deep">
          {dict.products.readMore}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </article>
  )
}
