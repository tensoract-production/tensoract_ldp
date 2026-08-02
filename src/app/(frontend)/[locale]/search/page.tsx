import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageIntro } from '@/components/PageIntro'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import { CardPostData } from '@/components/Card'

import { toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

type Args = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q: string }>
}

export default async function Page({ params, searchParams: searchParamsPromise }: Args) {
  const locale = toLocale((await params).locale)
  const dict = getDictionary(locale)
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    locale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              { title: { like: query } },
              { 'meta.description': { like: query } },
              { 'meta.title': { like: query } },
              { slug: { like: query } },
            ],
          },
        }
      : {}),
  })

  return (
    <div>
      <PageIntro heading={dict.nav.search}>
        <div className="mt-10 max-w-[36rem]">
          <Search locale={locale} />
        </div>
      </PageIntro>

      <div className="py-14 md:py-16">
        {posts.totalDocs > 0 ? (
          <CollectionArchive locale={locale} posts={posts.docs as CardPostData[]} />
        ) : (
          <div className="container text-ink-soft">
            {locale === 'vi' ? 'Không tìm thấy kết quả nào.' : 'No results found.'}
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const dict = getDictionary(toLocale((await params).locale))

  return {
    title: `${dict.nav.search} — Tensoract`,
  }
}
