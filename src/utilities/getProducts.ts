import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Locale } from '@/i18n/config'
import type { Product } from '@/payload-types'

type Args = {
  locale: Locale
  limit?: number
  featuredOnly?: boolean
  draft?: boolean
  excludeId?: string
}

export async function findProducts({
  draft = false,
  excludeId,
  featuredOnly = false,
  limit = 12,
  locale,
}: Args): Promise<Product[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 1,
    draft,
    limit,
    locale,
    overrideAccess: draft,
    sort: 'order',
    where: {
      ...(featuredOnly ? { featured: { equals: true } } : {}),
      ...(excludeId ? { id: { not_equals: excludeId } } : {}),
    },
  })

  return result.docs
}
