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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((result, index) => {
          if (typeof result !== 'object' || result === null) return null

          return (
            <li className="flex" key={index}>
              <Card
                className="w-full"
                doc={result}
                locale={locale}
                relationTo="posts"
                showCategories
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
