import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { WireframeHomepage } from '@/components/WireframeHomepage'
import { toLocale } from '@/i18n/config'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Args) {
  const locale = toLocale((await params).locale)
  let posts: Awaited<ReturnType<typeof getLatestPosts>> = []

  try {
    posts = await getLatestPosts(locale)
  } catch {
    // The wireframe remains reviewable while the local CMS database is offline.
    // Blog routes and Payload Admin still require PostgreSQL.
  }

  return <WireframeHomepage locale={locale} posts={posts} />
}

async function getLatestPosts(locale: ReturnType<typeof toLocale>) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    draft: false,
    limit: 3,
    locale,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      categories: true,
      meta: true,
    },
  })

  return result.docs
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const locale = toLocale((await params).locale)
  return locale === 'vi'
    ? {
        title: 'Tensoract — Xây dựng sản phẩm công nghệ',
        description: 'Tensoract xây dựng các sản phẩm công nghệ và SaaS cho bài toán thực tế.',
      }
    : {
        title: 'Tensoract — Building technology products',
        description: 'Tensoract builds technology and SaaS products for real-world problems.',
      }
}
