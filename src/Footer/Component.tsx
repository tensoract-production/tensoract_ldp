import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getCachedGlobal } from '@/utilities/getGlobals'

/** The back cover: the same sheet, printed solid. */
export async function Footer({ locale = defaultLocale }: { locale?: Locale }) {
  const footerData = await getCachedGlobal('footer', 1, locale)()
  const dict = getDictionary(locale)

  const { columns, contact, legal, socials, tagline } = footerData || {}

  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="container py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link
              aria-label="Tensoract"
              className="inline-block transition-colors hover:text-son"
              href={`/${locale}`}
            >
              <Logo />
            </Link>
            {tagline && (
              <p className="mt-6 max-w-[36ch] leading-relaxed text-paper/65">{tagline}</p>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            {(columns ?? []).map((column, ci) => (
              <div key={column.id ?? ci}>
                <h2 className="record text-paper/45">{column.label}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {(column.navItems ?? []).map(({ link }, li) => (
                    <li key={li}>
                      <CMSLink
                        className="text-paper/85 transition-colors hover:text-son"
                        locale={locale}
                        {...link}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {contact && (contact.address || contact.email) && (
              <div>
                <h2 className="record text-paper/45">{contact.label || dict.footer.contact}</h2>
                <address className="mt-4 flex flex-col gap-2.5 text-paper/85 not-italic">
                  {contact.address && (
                    <span className="leading-relaxed whitespace-pre-line">{contact.address}</span>
                  )}
                  {contact.email && (
                    <a
                      className="underline decoration-paper/30 underline-offset-4 transition-colors hover:text-son hover:decoration-son"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </a>
                  )}
                  {contact.email && (
                    <span className="record text-paper/40">{dict.unverifiedEmail}</span>
                  )}
                </address>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="record text-paper/45">
            © {new Date().getFullYear()} {legal || 'Tensoract Co., Ltd'} · {dict.footer.rights}
          </p>

          {socials && socials.length > 0 && (
            <ul className="flex flex-wrap items-center gap-6">
              {socials.map((social, i) => (
                <li key={social.id ?? i}>
                  <a
                    className="record text-paper/60 transition-colors hover:text-son"
                    href={social.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
