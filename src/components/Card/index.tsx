import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { ArrowRight } from '@/components/Icon'
import { Media } from '@/components/Media'
import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

/**
 * A post is an entry in the same printed index the products use — one rule
 * between each, length set by the writing rather than by a card.
 */
export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  locale?: Locale
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
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
    <article className={cn('group border-t border-border', className)}>
      <div className="grid items-start gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12">
        {metaImage && typeof metaImage !== 'string' && (
          <div className="md:col-span-2">
            <Media
              imgClassName="aspect-[4/3] w-full border border-border object-cover"
              resource={metaImage}
              size="20vw"
            />
          </div>
        )}

        <div className={cn('md:col-span-7', !metaImage && 'md:col-start-1')}>
          {showCategories && hasCategories && (
            <p className="wire-label mb-3">
              {categories?.map((category, index) => {
                if (typeof category !== 'object' || category === null) return null
                const isLast = index === categories.length - 1
                return (
                  <Fragment key={index}>
                    {category.title || '—'}
                    {!isLast && <Fragment>,&nbsp;</Fragment>}
                  </Fragment>
                )
              })}
            </p>
          )}

          {titleToUse && (
            <h3 className="wire-title text-[clamp(1.5rem,2.8vw,2rem)] transition-colors group-hover:text-foreground">
              <Link className="outline-none" href={href}>
                {titleToUse}
              </Link>
            </h3>
          )}
          {sanitizedDescription && (
            <p className="measure mt-3 leading-relaxed text-muted-foreground">{sanitizedDescription}</p>
          )}
        </div>

        <div className="md:col-span-2 md:col-start-11 md:justify-self-end md:pt-2">
          <span className="inline-flex items-center gap-2 text-foreground">
            {dict.blog.readPost}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  )
}
