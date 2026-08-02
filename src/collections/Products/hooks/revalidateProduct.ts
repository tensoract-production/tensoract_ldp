import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Product } from '../../../payload-types'
import { locales } from '../../../i18n/config'

/** Both language trees serve the same document, so both have to be busted. */
const productPaths = (slug: string | null | undefined) =>
  locales.flatMap((locale) => [`/${locale}/products`, `/${locale}/products/${slug}`])

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    payload.logger.info(`Revalidating product: ${doc.slug}`)
    productPaths(doc.slug).forEach((path) => revalidatePath(path))
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    productPaths(previousDoc.slug).forEach((path) => revalidatePath(path))
  }

  // The home page lists featured products.
  locales.forEach((locale) => revalidatePath(`/${locale}`))

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    productPaths(doc?.slug).forEach((path) => revalidatePath(path))
    locales.forEach((locale) => revalidatePath(`/${locale}`))
  }

  return doc
}
