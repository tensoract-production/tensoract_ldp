import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { Barcode } from '@/components/Barcode'
import { Button } from '@/components/ui/button'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { ProductCard, hostOf, productGridCols } from '@/components/ProductCard'
import { cn } from '@/utilities/ui'
import { Section, SectionHeader } from '@/components/Section'
import { StatusChip } from '@/components/StatusChip'
import RichText from '@/components/RichText'
import { type Locale, locales, toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { generateMeta } from '@/utilities/generateMeta'
import { findProducts } from '@/utilities/getProducts'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 200,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return locales.flatMap((locale) => products.docs.map(({ slug }) => ({ locale, slug })))
}

type Args = {
  params: Promise<{ locale: string; slug?: string }>
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = toLocale(localeParam)
  const dict = getDictionary(locale)
  const decodedSlug = decodeURIComponent(slug)

  const product = await queryProductBySlug({ locale, slug: decodedSlug })

  if (!product) notFound()

  const host = hostOf(product.externalUrl)
  const others = await findProducts({ locale, limit: 3, excludeId: product.id })

  return (
    <article>
      {draft && <LivePreviewListener />}

      <header className="border-b border-rule pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="manifest flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-soft">
              <span>{product.code}</span>
              <span aria-hidden="true">/</span>
              <StatusChip label={dict.products.status[product.status]} status={product.status} />
            </div>

            <h1 className="display mt-6 text-[clamp(2.5rem,7vw,4.5rem)]">{product.title}</h1>

            {product.tagline && (
              <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink-soft md:text-xl">
                {product.tagline}
              </p>
            )}

            {product.externalUrl && (
              <Button asChild className="mt-8" size="lg" variant="default">
                <a href={product.externalUrl} rel="noopener noreferrer" target="_blank">
                  {dict.products.visit}
                </a>
              </Button>
            )}
          </div>

          <div className="md:col-span-5">
            <div className="label-card">
              <dl className="px-5 py-4">
                {host && (
                  <div className="border-t border-rule py-3 first:border-t-0">
                    <dt className="manifest text-ink-soft">Website</dt>
                    <dd className="mt-1.5">{host}</dd>
                  </div>
                )}
                <div className="border-t border-rule py-3 first:border-t-0">
                  <dt className="manifest text-ink-soft">
                    {locale === 'vi' ? 'Nhóm' : 'Category'}
                  </dt>
                  <dd className="mt-1.5">
                    {dict.products.category[product.category ?? 'ecommerce']}
                  </dd>
                </div>
                {product.launchedAt && (
                  <div className="border-t border-rule py-3">
                    <dt className="manifest text-ink-soft">{dict.products.launched}</dt>
                    <dd className="mt-1.5 tnum">
                      {new Date(product.launchedAt).toLocaleDateString(
                        locale === 'vi' ? 'vi-VN' : 'en-GB',
                        { month: 'long', year: 'numeric' },
                      )}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="border-t border-rule px-5 pt-4 pb-4">
                <div className="text-ink">
                  <Barcode count={48} height={30} value={`${product.code}-${product.slug}`} />
                </div>
                <p className="manifest mt-2.5 text-ink-soft">{product.code}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {product.cover && typeof product.cover === 'object' && (
        <div className="border-b border-rule bg-paper-sunk">
          <div className="container py-12">
            <Media
              className="border border-rule bg-paper"
              imgClassName="w-full object-cover"
              priority
              resource={product.cover}
            />
          </div>
        </div>
      )}

      <div className="py-16 md:py-20">
        <div className="container grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            {product.summary && (
              <p className="text-xl leading-relaxed">{product.summary}</p>
            )}
            {product.content && (
              <RichText className="mt-8 max-w-none" data={product.content} enableGutter={false} />
            )}
          </div>

          <div className="md:col-span-5 md:pl-4">
            {product.metrics && product.metrics.length > 0 && (
              <dl className="mb-10 grid grid-cols-2 border-t border-l border-rule">
                {product.metrics.map((metric, i) => (
                  <div className="border-r border-b border-rule p-5" key={metric.id ?? i}>
                    <dt className="display tnum text-[1.75rem]">{metric.value}</dt>
                    <dd className="manifest mt-1.5 text-ink-soft">{metric.label}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.highlights && product.highlights.length > 0 && (
              <div>
                <h2 className="manifest text-ink-soft">{dict.products.whatItDoes}</h2>
                <ul className="mt-4 border-t border-rule">
                  {product.highlights.map((item, i) => (
                    <li className="border-b border-rule py-5" key={item.id ?? i}>
                      <h3 className="display text-[1.15rem]">{item.title}</h3>
                      {item.description && (
                        <p className="mt-2 leading-relaxed text-ink-soft">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <Section tone="sunk">
          <div className="container">
            <SectionHeader align="stacked" heading={dict.products.others} />
            <ul className={cn('mt-10 grid gap-5', productGridCols(others.length))}>
              {others.map((other) => (
                <li className="flex" key={other.id}>
                  <ProductCard className="w-full" dict={dict} locale={locale} product={other} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = toLocale(localeParam)
  const product = await queryProductBySlug({ locale, slug: decodeURIComponent(slug) })

  return generateMeta({ doc: product })
}

const queryProductBySlug = cache(async ({ locale, slug }: { locale: Locale; slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
})
