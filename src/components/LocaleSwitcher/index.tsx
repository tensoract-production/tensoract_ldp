'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { type Locale, localeLabels, localeShortLabels, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { cn } from '@/utilities/ui'

/** Keep the current route while swapping only its locale segment. */
export const LocaleSwitcher: React.FC<{ locale: Locale; className?: string }> = ({
  className,
  locale,
}) => {
  const pathname = usePathname()
  const rest = pathname.replace(new RegExp(`^/(${locales.join('|')})(?=/|$)`), '')

  return (
    <details className={cn('locale-dropdown', className)}>
      <summary aria-label={getDictionary(locale).langSwitch}>
        <span>{localeShortLabels[locale]}</span>
        <span aria-hidden="true" className="locale-dropdown__chevron" />
      </summary>
      <nav aria-label={getDictionary(locale).langSwitch} className="locale-dropdown__menu">
        {locales.map((code) => (
          <Link
            aria-current={code === locale ? 'page' : undefined}
            className={code === locale ? 'locale-dropdown__option locale-dropdown__option--active' : 'locale-dropdown__option'}
            href={`/${code}${rest}`}
            hrefLang={code}
            key={code}
            title={localeLabels[code]}
          >
            <span>{localeShortLabels[code]}</span>
            <span>{localeLabels[code]}</span>
          </Link>
        ))}
      </nav>
    </details>
  )
}
