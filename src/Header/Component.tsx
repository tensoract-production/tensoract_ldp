'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const copy = labels[locale]
  const items = [
    { href: `/${locale}#ecombox`, label: copy.products },
    { href: `/${locale}#about`, label: copy.about },
    { href: `/${locale}#careers`, label: copy.careers },
    { href: `/${locale}#contact`, label: copy.contact },
    { active: pathname.startsWith(`/${locale}/posts`), href: `/${locale}/posts`, label: copy.blog },
  ] as const

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <header className="wire-header">
      <div className="wire-container wire-header__inner">
        <Link className="wire-wordmark" href={`/${locale}`}>
          Tensoract
        </Link>

        <div className="wire-header__right" data-open={isMenuOpen || undefined}>
          <nav aria-label="Primary" className="wire-nav" id="primary-navigation">
            {items.map((item) => (
              <Link
                aria-current={'active' in item && item.active ? 'page' : undefined}
                className={'active' in item && item.active ? 'wire-nav__link wire-nav__link--active' : 'wire-nav__link'}
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="wire-header__controls">
          <LocaleSwitcher locale={locale} onNavigate={() => setIsMenuOpen(false)} />
          <button
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="wire-menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? <X aria-hidden="true" size={20} strokeWidth={1.8} /> : <Menu aria-hidden="true" size={20} strokeWidth={1.8} />}
          </button>
        </div>
      </div>
    </header>
  )
}
