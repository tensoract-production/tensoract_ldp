import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Be_Vietnam_Pro, Petrona } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { WoodblockDefs } from '@/components/Woodblock'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '../globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { htmlLang, locales, toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/**
 * Petrona is cut rather than drawn — irregular stroke endings and a low, wide
 * lowercase that reads like a block impression rather than a book face. Be
 * Vietnam Pro was drawn for Vietnamese, so the diacritics in the body copy sit
 * correctly instead of colliding with the ascenders above them.
 */
const petrona = Petrona({
  display: 'swap',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-petrona',
})

const beVietnamPro = Be_Vietnam_Pro({
  display: 'swap',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-be-vietnam',
  weight: ['400', '500', '600'],
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Args = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Args) {
  const { isEnabled } = await draftMode()
  const locale = toLocale((await params).locale)
  const dict = getDictionary(locale)

  return (
    <html
      className={cn(petrona.variable, beVietnamPro.variable, GeistMono.variable)}
      lang={htmlLang[locale]}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {/* Reveal animations render their hidden state into the SSR markup.
            Without scripting nothing would ever reveal them, so unhide. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {/* The direction contract, emitted into the built markup so it can be
            audited after the build rather than only in source. */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: A seven-person company earns belief with what it has printed, not with what it
asserts. Refuses the SaaS hero-metric band and the grid of identical product cards.
OWN-WORLD: Giấy dó paper ground with visible fibre, warm woodblock ink, cinnabar reserved
for facts an outsider attested. Petrona cut-serif display, Be Vietnam Pro text, mono only
on record data. Hand-cut SVG plates; printed edges, never UI hairlines.
STORY: An investor or enterprise buyer sees four products actually running, reads how the
team works, finds the attested competition entry, and emails.
FIRST VIEWPORT: One wide column on paper. Serif headline left at display scale, a printed
registration line beneath it, a woodblock plate of the workroom right. The email address
is the primary action, set in ink and underlined.
FORM: giấy dó & mộc bản; candidate 5 of the grounded list; seed key 99ee05cf.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
        <Providers>
          <AdminBar adminBarProps={{ preview: isEnabled }} />

          <a
            className="manifest sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2.5 focus:text-paper"
            href="#main"
          >
            {dict.skipToContent}
          </a>

          {/* The woodblock filter lives in one shared <defs>; without it mounted
              every plate's filter reference resolves to nothing. */}
          <WoodblockDefs />

          <Header locale={locale} />
          <main className="flex-1" id="main">
            {children}
          </main>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
