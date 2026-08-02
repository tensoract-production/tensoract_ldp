import type { Locale } from '@/i18n/config'
import { defaultLocale, locales } from '@/i18n/config'

type Reference = {
  relationTo: 'pages' | 'posts' | 'products'
  value: unknown
} | null

const collectionPrefix: Record<'pages' | 'posts' | 'products', string> = {
  pages: '',
  posts: '/posts',
  products: '/products',
}

const alreadyPrefixed = (path: string) =>
  locales.some((code) => path === `/${code}` || path.startsWith(`/${code}/`))

/**
 * Resolves a CMS link to a path inside the current language tree.
 *
 * Editors write internal custom URLs without a language prefix (`/products`);
 * this adds the one for the page being rendered. External URLs and anchors are
 * left exactly as typed.
 */
export function hrefFor({
  locale = defaultLocale,
  reference,
  type,
  url,
}: {
  locale?: Locale
  reference?: Reference
  type?: 'custom' | 'reference' | null
  url?: string | null
}): string | null {
  if (type === 'reference' && reference && typeof reference.value === 'object') {
    const slug = (reference.value as { slug?: string })?.slug
    if (!slug) return null

    const prefix = collectionPrefix[reference.relationTo] ?? ''
    // The home page is served at the root of its language tree.
    if (reference.relationTo === 'pages' && slug === 'home') return `/${locale}`

    return `/${locale}${prefix}/${slug}`
  }

  if (!url) return null

  const isInternal = url.startsWith('/') && !url.startsWith('//')
  if (isInternal && !alreadyPrefixed(url)) {
    return url === '/' ? `/${locale}` : `/${locale}${url}`
  }

  return url
}
