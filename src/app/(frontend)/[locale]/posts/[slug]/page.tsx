import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { type Locale, locales, toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return locales.flatMap((locale) => posts.docs.map(({ slug }) => ({ locale, slug })))
}

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
  const url = `/${locale}/posts/${decodedSlug}`
  const post = await queryPostBySlug({ locale, slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pb-20">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero locale={locale} post={post} />

      <div className="container pt-14">
        <RichText className="mx-auto max-w-[48rem]" data={post.content} enableGutter={false} />

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mx-auto mt-20 max-w-[52rem] border-t border-rule pt-10">
            <h2 className="manifest text-ink-soft">{dict.blog.relatedTitle}</h2>
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

  return generateMeta({ doc: post })
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
