import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/Section'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/**
 * `not-found.tsx` cannot read route params, so it speaks the default language.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale)

  return (
    <div className="container py-28 md:py-36">
      <Eyebrow>404</Eyebrow>
      <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.25rem,6vw,4rem)]">
        {dict.notFound.title}
      </h1>
      <p className="mt-5 max-w-[46ch] text-lg text-ink-soft">{dict.notFound.body}</p>
      <Button asChild className="mt-9" size="lg" variant="default">
        <Link href={`/${defaultLocale}`}>{dict.backHome}</Link>
      </Button>
    </div>
  )
}
