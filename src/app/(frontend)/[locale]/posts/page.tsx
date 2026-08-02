import type { Metadata } from 'next/types'

import { EditorialArchive } from '@/components/EditorialArchive'
import { Pagination } from '@/components/Pagination'
import { PageIntro } from '@/components/PageIntro'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: Args) {
  const locale = toLocale((await params).locale)
  const dict = getDictionary(locale)
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    locale,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div>
      <PageIntro
        heading={dict.blog.title}
        intro={dict.blog.lead}
      />

      <div className="pb-16">
        {posts.docs.length === 0 ? (
          <div className="container text-ink-soft">{dict.blog.empty}</div>
        ) : (
          <EditorialArchive locale={locale} posts={posts.docs} />
        )}

        {posts.totalPages > 1 && posts.page && (
          <div className="container">
            <Pagination locale={locale} page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  const dict = getDictionary(locale)

  return {
    title: `${dict.blog.title} — Tensoract`,
    description: dict.blog.lead,
  }
}
