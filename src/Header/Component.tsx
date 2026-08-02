import React from 'react'

import type { Locale } from '@/i18n/config'

import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { defaultLocale } from '@/i18n/config'

export async function Header({ locale = defaultLocale }: { locale?: Locale }) {
  const headerData = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} locale={locale} />
}
