'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'

const labels = {
  vi: {
    products: 'Sản phẩm',
    about: 'Về Tensoract',
    blog: 'Blog',
    careers: 'Tuyển dụng',
    contact: 'Liên hệ',
  },
  en: {
    products: 'Products',
    about: 'About',
    blog: 'Blog',
    careers: 'Careers',
    contact: 'Contact',
  },
} as const

export function Header({ locale = defaultLocale }: { locale?: Locale }) {
  const pathname = usePathname()
  const copy = labels[locale]
  const items = [
    { href: `/${locale}#ecombox`, label: copy.products },
    { href: `/${locale}#about`, label: copy.about },
    { href: `/${locale}#careers`, label: copy.careers },
    { href: `/${locale}#contact`, label: copy.contact },
    { active: pathname.startsWith(`/${locale}/posts`), href: `/${locale}/posts`, label: copy.blog },
  ] as const

  return (
    <header className="wire-header">
      <div className="wire-container wire-header__inner">
        <Link className="wire-wordmark" href={`/${locale}`}>
          Tensoract
        </Link>

        <div className="wire-header__right">
          <nav aria-label="Primary" className="wire-nav">
            {items.map((item) => (
              <Link
                aria-current={'active' in item && item.active ? 'page' : undefined}
                className={'active' in item && item.active ? 'wire-nav__link wire-nav__link--active' : 'wire-nav__link'}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </header>
  )
}
