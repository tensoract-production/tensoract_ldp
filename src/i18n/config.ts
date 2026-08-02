export const locales = ['vi', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'vi'

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

export function toLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale
}

/**
 * Every public page lives under a locale prefix — `/vi/...` and `/en/...`.
 * Route segments stay the same in both languages so there is one route tree
 * to maintain; only the copy switches.
 */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '')
  return clean ? `/${locale}/${clean}` : `/${locale}`
}

export const localeLabels: Record<Locale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
}

export const localeShortLabels: Record<Locale, string> = {
  vi: 'VI',
  en: 'EN',
}

export const htmlLang: Record<Locale, string> = {
  vi: 'vi-VN',
  en: 'en',
}
