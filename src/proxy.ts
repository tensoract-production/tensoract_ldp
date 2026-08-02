import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, locales } from '@/i18n/config'

/**
 * Every public page lives under a language prefix. Anything that arrives
 * without one is sent to the Vietnamese tree, which is the primary audience.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  // Skip the admin panel, Payload's API, preview/seed routes, Next internals,
  // and anything with a file extension (sitemaps, robots.txt, images).
  matcher: ['/((?!admin|api|next|_next|.*\\..*).*)'],
}
