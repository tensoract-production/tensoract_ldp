'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Media } from '@/components/Media'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  locale?: Locale
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    locale = defaultLocale,
    relationTo = 'posts',
    showCategories,
    title: titleFromProps,
  } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  // replace non-breaking space with white space
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${locale}/${relationTo}/${slug}`
  const dict = getDictionary(locale)

  return (
    <article
      className={cn(
        'label-card group flex cursor-pointer flex-col transition-[transform,border-color] duration-200',
        'hover:-translate-y-0.5 hover:border-ink/25',
        className,
      )}
      ref={card.ref}
    >
      {metaImage && typeof metaImage !== 'string' && (
        <div className="border-b border-rule bg-paper-sunk">
          <Media
            imgClassName="aspect-[16/9] w-full object-cover"
            resource={metaImage}
            size="33vw"
          />
        </div>
      )}

      {showCategories && hasCategories && (
        <div className="manifest border-b border-rule px-5 py-3 text-ink-soft">
          {categories?.map((category, index) => {
            if (typeof category !== 'object' || category === null) return null

            const categoryTitle = category.title || '—'
            const isLast = index === categories.length - 1

            return (
              <Fragment key={index}>
                {categoryTitle}
                {!isLast && <Fragment>,&nbsp;</Fragment>}
              </Fragment>
            )
          })}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2.5 px-5 pt-6 pb-7">
        {titleToUse && (
          <h3 className="display text-[1.3rem]">
            <Link className="outline-none" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {sanitizedDescription && (
          <p className="line-clamp-3 leading-relaxed text-ink-soft">{sanitizedDescription}</p>
        )}
      </div>

      <div className="manifest flex items-center justify-between border-t border-rule px-5 py-3 text-ink transition-colors group-hover:text-verified-deep">
        {dict.blog.readPost}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
    </article>
  )
}
