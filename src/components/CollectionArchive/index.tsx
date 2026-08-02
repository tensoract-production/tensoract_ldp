import { cn } from '@/utilities/ui'
import React from 'react'

import type { Locale } from '@/i18n/config'

import { Card, CardPostData } from '@/components/Card'
import { defaultLocale } from '@/i18n/config'

export type Props = {
  className?: string
  locale?: Locale
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = ({
  className,
  locale = defaultLocale,
  posts,
}) => {
  return (
    <div className={cn('container', className)}>
      <div className="border-b border-rule">
        {posts?.map((result, index) => {
          if (typeof result !== 'object' || result === null) return null

          return (
            <Card doc={result} key={index} locale={locale} relationTo="posts" showCategories />
          )
        })}
      </div>
    </div>
  )
}
