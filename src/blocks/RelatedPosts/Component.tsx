import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Card } from '../../components/Card'
import { defaultLocale } from '@/i18n/config'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
  locale?: Locale
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent, locale = defaultLocale } = props

  return (
    <div className={clsx(className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <ul className="grid items-stretch gap-5 md:grid-cols-2">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <li className="flex" key={index}>
              <Card
                className="w-full"
                doc={doc}
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
