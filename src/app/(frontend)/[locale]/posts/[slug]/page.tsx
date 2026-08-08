import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { PostHero } from '@/heros/PostHero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { type Locale, toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = toLocale(localeParam)
  const dict = getDictionary(locale)
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ locale, slug: decodedSlug })

  if (!post) notFound()

  return (
    <article className="pb-20">
      {draft && <LivePreviewListener />}

      <PostHero locale={locale} post={post} />

      <div className="container pt-14">
        <RichText className="mx-auto max-w-[48rem]" data={post.content} enableGutter={false} />

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mx-auto mt-20 max-w-[52rem] border-t border-border pt-10">
            <h2 className="wire-label">{dict.blog.relatedTitle}</h2>
            <RelatedPosts
              className="mt-6"
              docs={post.relatedPosts.filter((related) => typeof related === 'object')}
              locale={locale}
            />
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = toLocale(localeParam)
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ locale, slug: decodedSlug })

  return {
    title: post?.meta?.title || post?.title || 'Tensoract Insights',
    description: post?.meta?.description || undefined,
  }
}

const queryPostBySlug = cache(async ({ locale, slug }: { locale: Locale; slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
