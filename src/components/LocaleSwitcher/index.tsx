'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Fragment } from 'react'

import { type Locale, localeLabels, localeShortLabels, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { cn } from '@/utilities/ui'

/**
 * Swaps the language segment of the current path so the reader stays on the
 * page they were reading.
 */
export const LocaleSwitcher: React.FC<{ locale: Locale; className?: string }> = ({
  className,
  locale,
}) => {
  const pathname = usePathname()
  const rest = pathname.replace(new RegExp(`^/(${locales.join('|')})(?=/|$)`), '')

  return (
    <nav aria-label={getDictionary(locale).langSwitch} className={cn('manifest flex items-center', className)}>
      {locales.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <span aria-hidden="true" className="px-1.5 text-ink-soft/50">
              /
            </span>
          )}
          <Link
            aria-current={code === locale ? 'true' : undefined}
            className={cn(
              'transition-colors',
              code === locale ? 'text-ink' : 'text-ink-soft hover:text-verified-deep',
            )}
            href={`/${code}${rest}`}
            hrefLang={code}
            title={localeLabels[code]}
          >
            {localeShortLabels[code]}
          </Link>
        </Fragment>
      ))}
    </nav>
  )
}
