import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { revalidateTag } from 'next/cache'

import { contactForm as contactFormData } from './tensoract/contact-form'
import { aboutPage, contactPage, footerGlobal, headerGlobal, homePage } from './tensoract/pages'
import { categories as categorySeeds, posts as postSeeds } from './tensoract/posts'
import { products as productSeeds } from './tensoract/products'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'products',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

/**
 * Copies Payload's generated row/block `id`s from a document that already
 * exists onto the payload for a second locale.
 *
 * Without this, updating a document in `en` with a fresh blocks array reads as
 * "delete every block and add new ones", which throws away the Vietnamese text
 * stored alongside it. The two locales share a structure here, so walking the
 * trees in parallel and lifting the ids across is enough.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withIdsFrom(source: any, target: any): any {
  if (Array.isArray(source) && Array.isArray(target)) {
    return target.map((item, index) => withIdsFrom(source[index], item))
  }

  if (source && target && typeof source === 'object' && typeof target === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const merged: any = { ...target }

    if (typeof source.id === 'string') merged.id = source.id

    for (const key of Object.keys(target)) {
      if (source[key] !== undefined) merged[key] = withIdsFrom(source[key], target[key])
    }

    return merged
  }

  return target
}

// Next.js revalidation errors are normal when seeding without a server running.
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding Tensoract content...')

  payload.logger.info('— Clearing collections and globals...')

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {},
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info('— Seeding author...')

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { equals: 'hello@tensoract.vn' } },
  })

  const author = await payload.create({
    collection: 'users',
    data: {
      name: 'Tensoract',
      email: 'hello@tensoract.vn',
      password: 'tensoract',
    },
  })

  payload.logger.info('— Seeding categories...')

  const categoryIds: Record<string, string> = {}

  for (const category of categorySeeds) {
    const created = await payload.create({
      collection: 'categories',
      depth: 0,
      locale: 'vi',
      data: { title: category.vi, slug: category.slug },
    })

    await payload.update({
      collection: 'categories',
      id: created.id,
      locale: 'en',
      data: { title: category.en },
    })

    categoryIds[category.key] = created.id
  }

  payload.logger.info('— Seeding products...')

  for (const product of productSeeds) {
    const created = await payload.create({
      collection: 'products',
      depth: 0,
      locale: 'vi',
      context: { disableRevalidate: true },
      data: {
        slug: product.slug,
        _status: 'published',
        code: product.code,
        status: product.status,
        category: product.category,
        externalUrl: product.externalUrl,
        featured: product.featured,
        order: product.order,
        ...product.vi,
      },
    })

    await payload.update({
      collection: 'products',
      id: created.id,
      locale: 'en',
      depth: 0,
      context: { disableRevalidate: true },
      data: withIdsFrom(created, product.en),
    })
  }

  payload.logger.info('— Seeding posts...')

  const postIds: string[] = []

  // Created in sequence so `publishedAt` ordering matches the order written here.
  for (const post of postSeeds) {
    const created = await payload.create({
      collection: 'posts',
      depth: 0,
      locale: 'vi',
      context: { disableRevalidate: true },
      data: {
        slug: post.slug,
        _status: 'published',
        authors: [author.id],
        categories: [categoryIds[post.categoryKey]],
        ...post.vi,
      },
    })

    await payload.update({
      collection: 'posts',
      id: created.id,
      locale: 'en',
      depth: 0,
      context: { disableRevalidate: true },
      data: withIdsFrom(created, post.en),
    })

    postIds.push(created.id)
  }

  for (const [index, id] of postIds.entries()) {
    await payload.update({
      collection: 'posts',
      id,
      depth: 0,
      context: { disableRevalidate: true },
      data: { relatedPosts: postIds.filter((_, i) => i !== index) },
    })
  }

  payload.logger.info('— Seeding contact form...')

  const contactFormDoc = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info('— Seeding pages...')

  const pageSeeds = [
    { vi: homePage('vi'), en: homePage('en') },
    { vi: aboutPage('vi'), en: aboutPage('en') },
    {
      vi: contactPage({ formId: contactFormDoc.id, locale: 'vi' }),
      en: contactPage({ formId: contactFormDoc.id, locale: 'en' }),
    },
  ]

  for (const page of pageSeeds) {
    const created = await payload.create({
      collection: 'pages',
      depth: 0,
      locale: 'vi',
      context: { disableRevalidate: true },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: page.vi as any,
    })

    await payload.update({
      collection: 'pages',
      id: created.id,
      locale: 'en',
      depth: 0,
      context: { disableRevalidate: true },
      data: withIdsFrom(created, page.en),
    })
  }

  payload.logger.info('— Seeding globals...')

  for (const [slug, build] of [
    ['header', headerGlobal],
    ['footer', footerGlobal],
  ] as const) {
    const created = await payload.updateGlobal({
      slug,
      depth: 0,
      locale: 'vi',
      context: { disableRevalidate: true },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: build('vi') as any,
    })

    await payload.updateGlobal({
      slug,
      depth: 0,
      locale: 'en',
      context: { disableRevalidate: true },
      data: withIdsFrom(created, build('en')),
    })
  }

  // Every write above ran with `disableRevalidate`, so the globals' cache tags
  // were never busted. Without this the header and footer keep serving the
  // previous seed from `unstable_cache` — which survives a server restart,
  // because that cache is written to disk.
  for (const global of globals) {
    revalidateTag(`global_${global}`, 'max')
  }

  payload.logger.info('Seeded Tensoract content successfully.')
}
