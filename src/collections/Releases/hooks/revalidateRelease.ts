import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Release } from '../../../payload-types'
import { locales } from '../../../i18n/config'

/** The home page and every product page can carry the latest release. */
export const revalidateRelease: CollectionAfterChangeHook<Release> = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating for release: ${doc.version}`)
    locales.forEach((locale) => {
      revalidatePath(`/${locale}`)
      revalidatePath(`/${locale}/products`, 'page')
    })
  }

  return doc
}
