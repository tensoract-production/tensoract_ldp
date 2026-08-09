import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { getDictionary } from '@/i18n/dictionaries'
import { htmlLang, locales, toLocale } from '@/i18n/config'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import '../globals.css'

const inter = Inter({
  display: 'swap',
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
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
    <html className={inter.variable} lang={htmlLang[locale]}>
      <body>
        <AdminBar adminBarProps={{ preview: isEnabled }} />
        <a className="wire-skip" href="#main">{dict.skipToContent}</a>
        <Header locale={locale} />
        <main className="flex-1" id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: { card: 'summary_large_image' },
}
