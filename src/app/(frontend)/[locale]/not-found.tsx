import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/** `not-found.tsx` cannot read route params, so it speaks the default language. */
export default function NotFound() {
  const dict = getDictionary(defaultLocale)

  return (
    <div className="container py-32 md:py-40">
      <p className="record text-ink-soft">404</p>
      <h1 className="serif mt-5 max-w-[14ch] text-[clamp(2.4rem,6vw,4rem)]">
        {dict.notFound.title}
      </h1>
      <p className="measure mt-6 text-lg text-ink-soft">{dict.notFound.body}</p>
      <Button asChild className="mt-10" size="lg" variant="default">
        <Link href={`/${defaultLocale}`}>{dict.backHome}</Link>
      </Button>
    </div>
  )
}
