import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/** `not-found.tsx` cannot read route params, so it speaks the default language. */
export default function NotFound() {
  const dict = getDictionary(defaultLocale)

  return (
    <div className="container py-20 md:py-40">
      <p className="wire-label">404</p>
      <h1 className="wire-title mt-5 max-w-[14ch] text-[clamp(1.9rem,6vw,4rem)]">
        {dict.notFound.title}
      </h1>
      <p className="measure mt-6 text-base text-muted-foreground md:text-lg">{dict.notFound.body}</p>
      <Button asChild className="mt-10" size="lg" variant="default">
        <Link href={`/${defaultLocale}`}>{dict.backHome}</Link>
      </Button>
    </div>
  )
}
