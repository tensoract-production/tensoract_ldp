'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export const Search: React.FC<{ locale?: Locale }> = ({ locale = defaultLocale }) => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const dict = getDictionary(locale)

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    const query = debouncedValue ? `?q=${encodeURIComponent(debouncedValue)}` : ''
    router.push(`/${locale}/search${query}`)
  }, [debouncedValue, locale, router])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Label className="sr-only" htmlFor="search">
        {dict.nav.search}
      </Label>
      <Input
        id="search"
        onChange={(event) => {
          setValue(event.target.value)
        }}
        placeholder={dict.nav.search}
      />
      <button className="sr-only" type="submit">
        {dict.nav.search}
      </button>
    </form>
  )
}
