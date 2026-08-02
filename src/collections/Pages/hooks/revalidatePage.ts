import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { locales } from '../../../i18n/config'

/** One document, two language trees — bust both. */
const pathsFor = (slug: string | null | undefined) =>
  locales.map((locale) => (slug === 'home' ? `/${locale}` : `/${locale}/${slug}`))

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating page: ${doc.slug}`)

      pathsFor(doc.slug).forEach((path) => revalidatePath(path))
      revalidateTag('pages-sitemap', 'max')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old page: ${previousDoc.slug}`)

      pathsFor(previousDoc.slug).forEach((path) => revalidatePath(path))
      revalidateTag('pages-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    pathsFor(doc?.slug).forEach((path) => revalidatePath(path))
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}
