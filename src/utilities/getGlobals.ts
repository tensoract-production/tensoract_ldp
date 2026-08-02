import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { type Locale, defaultLocale } from '@/i18n/config'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(
  slug: T,
  depth = 0,
  locale: Locale = defaultLocale,
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
  })

  return global
}

/**
 * Returns an unstable_cache function keyed by slug *and* locale — the two
 * language versions of a global are different documents to the cache.
 */
export const getCachedGlobal = <T extends Global>(
  slug: T,
  depth = 0,
  locale: Locale = defaultLocale,
) =>
  unstable_cache(async () => getGlobal<T>(slug, depth, locale), [slug, locale], {
    tags: [`global_${slug}`],
  })
