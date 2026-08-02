'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'

import type { Header } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Logo } from '@/components/Logo/Logo'
import { getDictionary } from '@/i18n/dictionaries'
import { cn } from '@/utilities/ui'

const navLinkClass = 'manifest text-ink-soft transition-colors hover:text-verified-deep'

export const HeaderClient: React.FC<{ data: Header; locale: Locale }> = ({ data, locale }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const dict = getDictionary(locale)
  const navItems = data?.navItems || []
  const cta = data?.ctaLinks?.[0]?.link

  // Close the panel whenever navigation actually happens.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link
          aria-label="Tensoract"
          className="shrink-0 transition-colors hover:text-verified-deep"
          href={`/${locale}`}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map(({ link }, i) => (
            <CMSLink className={navLinkClass} key={i} locale={locale} {...link} />
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LocaleSwitcher locale={locale} />
          <Link
            className="text-ink-soft transition-colors hover:text-verified-deep"
            href={`/${locale}/search`}
          >
            <span className="sr-only">{dict.nav.search}</span>
            <SearchIcon className="w-[1.15rem]" />
          </Link>
          {cta && (
            <CMSLink
              appearance="default"
              className="h-10 px-5"
              locale={locale}
              size="lg"
              {...cta}
            />
          )}
        </div>

        <button
          aria-controls="mobile-nav"
          aria-expanded={open}
          className="manifest -mr-2 px-2 py-2 text-ink md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? dict.nav.close : dict.nav.menu}
        </button>
      </div>

      <div
        className={cn('border-t border-rule bg-paper md:hidden', !open && 'hidden')}
        id="mobile-nav"
      >
        <nav className="container flex flex-col py-2">
          {navItems.map(({ link }, i) => (
            <CMSLink
              className="manifest border-b border-rule py-4 text-ink"
              key={i}
              locale={locale}
              {...link}
            />
          ))}
          <Link className="manifest border-b border-rule py-4 text-ink" href={`/${locale}/search`}>
            {dict.nav.search}
          </Link>
          <div className="flex items-center justify-between py-4">
            <LocaleSwitcher locale={locale} />
            {cta && <CMSLink appearance="default" locale={locale} size="lg" {...cta} />}
          </div>
        </nav>
      </div>
    </header>
  )
}
