'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { Search } from '@/components/Icon'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Logo } from '@/components/Logo/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { getDictionary } from '@/i18n/dictionaries'
import { cn } from '@/utilities/ui'

const navLink =
  'text-ink-soft underline decoration-transparent decoration-1 underline-offset-[7px] transition-colors hover:text-son-deep hover:decoration-son'

export const HeaderClient: React.FC<{ data: Header; locale: Locale }> = ({ data, locale }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const dict = getDictionary(locale)
  const navItems = data?.navItems || []
  const cta = data?.ctaLinks?.[0]?.link

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="container flex h-[4.5rem] items-center justify-between gap-8">
        <Link
          aria-label="Tensoract"
          className="shrink-0 text-ink transition-colors hover:text-son-deep"
          href={`/${locale}`}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map(({ link }, i) => (
            <CMSLink className={navLink} key={i} locale={locale} {...link} />
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher locale={locale} />
          <Link
            className="-m-2 inline-flex items-center p-2 text-ink-soft transition-colors hover:text-son-deep"
            href={`/${locale}/search`}
          >
            <span className="sr-only">{dict.nav.search}</span>
            <Search />
          </Link>
          <ThemeToggle locale={locale} />
          {/* Quiet: the page has one primary action and it is the address in
              the first viewport, not a pill in the chrome. */}
          {cta && <CMSLink className={navLink} locale={locale} {...cta} />}
        </div>

        <button
          aria-controls="mobile-nav"
          aria-expanded={open}
          className="-mr-2 px-2 py-2 text-ink md:hidden"
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
              className="border-b border-rule py-4 text-ink"
              key={i}
              locale={locale}
              {...link}
            />
          ))}
          <Link className="border-b border-rule py-4 text-ink" href={`/${locale}/search`}>
            {dict.nav.search}
          </Link>
          <div className="flex items-center justify-between gap-4 py-5">
            <div className="flex items-center gap-6">
              <LocaleSwitcher locale={locale} />
              <ThemeToggle locale={locale} />
            </div>
            {cta && <CMSLink appearance="default" locale={locale} size="lg" {...cta} />}
          </div>
        </nav>
      </div>
    </header>
  )
}
