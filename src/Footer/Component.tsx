import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer({ locale = defaultLocale }: { locale?: Locale }) {
  const footerData = await getCachedGlobal('footer', 1, locale)()
  const dict = getDictionary(locale)

  const { columns, contact, legal, socials, tagline } = footerData || {}

  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Link
              aria-label="Tensoract"
              className="inline-block transition-colors hover:text-verified"
              href={`/${locale}`}
            >
              <Logo />
            </Link>
            {tagline && (
              <p className="mt-5 max-w-[34ch] leading-relaxed text-paper/60">{tagline}</p>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-8 lg:grid-cols-4">
            {(columns ?? []).map((column, ci) => (
              <div key={column.id ?? ci}>
                <h2 className="manifest text-paper/45">{column.label}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {(column.navItems ?? []).map(({ link }, li) => (
                    <li key={li}>
                      <CMSLink
                        className="text-paper/85 transition-colors hover:text-verified"
                        locale={locale}
                        {...link}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {contact && (contact.address || contact.email || contact.phone) && (
              <div>
                <h2 className="manifest text-paper/45">{contact.label || dict.footer.contact}</h2>
                <address className="mt-4 flex flex-col gap-2.5 not-italic text-paper/85">
                  {contact.address && (
                    <span className="leading-relaxed whitespace-pre-line">{contact.address}</span>
                  )}
                  {contact.email && (
                    <a
                      className="transition-colors hover:text-verified"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a
                      className="transition-colors hover:text-verified"
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    >
                      {contact.phone}
                    </a>
                  )}
                </address>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="manifest text-paper/45">
            © {new Date().getFullYear()} {legal || 'Tensoract Co., Ltd'} · {dict.footer.rights}
          </p>

          {socials && socials.length > 0 && (
            <ul className="flex flex-wrap items-center gap-5">
              {socials.map((social, i) => (
                <li key={social.id ?? i}>
                  <a
                    className="manifest text-paper/60 transition-colors hover:text-verified"
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
