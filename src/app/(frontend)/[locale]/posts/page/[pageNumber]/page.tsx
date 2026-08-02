import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageIntro } from '@/components/PageIntro'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'

import { locales, toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const revalidate = 600

type Args = {
  params: Promise<{
    locale: string
    pageNumber: string
  }>
}

export default async function Page({ params }: Args) {
  const { locale: localeParam, pageNumber } = await params
  const locale = toLocale(localeParam)
  const dict = getDictionary(locale)
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    locale,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })

  return (
    <div>
      <PageIntro
        heading={dict.blog.title}
        intro={dict.blog.lead}
      />

      <div className="py-14 md:py-16">
        <CollectionArchive locale={locale} posts={posts.docs} />

        {posts?.page && posts?.totalPages > 1 && (
          <div className="container">
            <Pagination locale={locale} page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale: localeParam, pageNumber } = await params
  const dict = getDictionary(toLocale(localeParam))

  return {
    title: `${dict.blog.title} — ${pageNumber || ''} — Tensoract`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { locale: string; pageNumber: string }[] = []

  for (const locale of locales) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push({ locale, pageNumber: String(i) })
    }
  }

  return pages
}
