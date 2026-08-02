import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { ArrowUpRight } from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { ProductRow, hostOf } from '@/components/ProductCard'
import { Section, SectionHeader } from '@/components/Section'
import { plateForSlug } from '@/components/Woodblock'
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

  const Plate = plateForSlug(product.slug)
  const host = hostOf(product.externalUrl)
  const others = await findProducts({ locale, limit: 3, excludeId: product.id })

  return (
    <article>
      {draft && <LivePreviewListener />}

      <header className="border-b border-rule pt-14 pb-14 md:pt-20 md:pb-20">
        <div className="container grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="record text-ink-soft">
              {product.code} · {dict.products.status[product.status]}
            </p>
            <h1 className="serif mt-5 text-[clamp(2.4rem,6vw,4.2rem)]">{product.title}</h1>
            {product.tagline && (
              <p className="measure mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
                {product.tagline}
              </p>
            )}
            {product.externalUrl && (
              <Button asChild className="mt-9" size="lg" variant="default">
                <a href={product.externalUrl} rel="noopener noreferrer" target="_blank">
                  {dict.products.visit}
                  <ArrowUpRight />
                </a>
              </Button>
            )}
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="max-w-[15rem]">
              <Plate />
            </div>
            <dl className="mt-8 border-t border-rule">
              {host && (
                <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                  <dt className="record text-ink-soft">Website</dt>
                  <dd>{host}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                <dt className="record text-ink-soft">
                  {locale === 'vi' ? 'Nhóm' : 'Category'}
                </dt>
                <dd>{dict.products.category[product.category ?? 'ecommerce']}</dd>
              </div>
              {product.launchedAt && (
                <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                  <dt className="record text-ink-soft">{dict.products.launched}</dt>
                  <dd className="tnum">
                    {new Date(product.launchedAt).toLocaleDateString(
                      locale === 'vi' ? 'vi-VN' : 'en-GB',
                      { month: 'long', year: 'numeric' },
                    )}
                  </dd>
                </div>
              )}
            </dl>
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

      <div className="py-20 md:py-24">
        <div className="container grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            {product.summary && <p className="measure text-xl leading-relaxed">{product.summary}</p>}
            {product.content && (
              <RichText className="mt-10 max-w-none" data={product.content} enableGutter={false} />
            )}
          </div>

          <div className="md:col-span-4 md:col-start-9">
            {product.metrics && product.metrics.length > 0 && (
              <dl className="mb-12 border-t border-rule">
                {product.metrics.map((metric, i) => (
                  <div
                    className="flex items-baseline justify-between gap-4 border-b border-rule py-4"
                    key={metric.id ?? i}
                  >
                    <dt className="serif tnum text-[1.6rem]">{metric.value}</dt>
                    <dd className="record text-right text-ink-soft">{metric.label}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.highlights && product.highlights.length > 0 && (
              <div>
                <h2 className="serif text-[1.35rem]">{dict.products.whatItDoes}</h2>
                <ul className="mt-5 border-t border-rule">
                  {product.highlights.map((item, i) => (
                    <li className="border-b border-rule py-5" key={item.id ?? i}>
                      <h3 className="text-ink">{item.title}</h3>
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
            <ul className="mt-10 border-b border-rule">
              {others.map((other) => (
                <ProductRow dict={dict} key={other.id} locale={locale} product={other} />
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
