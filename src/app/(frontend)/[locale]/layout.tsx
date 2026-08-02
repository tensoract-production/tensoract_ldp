import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Archivo, Be_Vietnam_Pro } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '../globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { htmlLang, locales, toLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/**
 * Archivo carries the width axis this identity leans on — freight signage set
 * wide. Be Vietnam Pro was drawn for Vietnamese, so the diacritics in the body
 * copy sit correctly instead of colliding with the ascenders above them.
 */
const archivo = Archivo({
  axes: ['wdth'],
  display: 'swap',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-archivo',
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
      className={cn(archivo.variable, beVietnamPro.variable, GeistMono.variable)}
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
        <Providers>
          <AdminBar adminBarProps={{ preview: isEnabled }} />

          <a
            className="manifest sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2.5 focus:text-paper"
            href="#main"
          >
            {dict.skipToContent}
          </a>

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
