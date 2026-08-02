import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { locales } from '../../../i18n/config'

/** One document, two language trees — bust both, plus the index. */
const pathsFor = (slug: string | null | undefined) =>
  locales.flatMap((locale) => [`/${locale}/posts`, `/${locale}/posts/${slug}`])

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating post: ${doc.slug}`)

      pathsFor(doc.slug).forEach((path) => revalidatePath(path))
      revalidateTag('posts-sitemap', 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old post: ${previousDoc.slug}`)

      pathsFor(previousDoc.slug).forEach((path) => revalidatePath(path))
      revalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    pathsFor(doc?.slug).forEach((path) => revalidatePath(path))
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}
