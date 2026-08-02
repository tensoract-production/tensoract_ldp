import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Media } from '@/components/Media'
import { defaultLocale } from '@/i18n/config'
import { formatAuthors } from '@/utilities/formatAuthors'

/** A post opens the way the rest of the sheet does: title, then the record line. */
export const PostHero: React.FC<{
  post: Post
  locale?: Locale
}> = ({ locale = defaultLocale, post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const categoryNames = (categories ?? [])
    .map((category) => (typeof category === 'object' && category !== null ? category.title : null))
    .filter(Boolean)

  return (
    <header className="border-b border-rule pt-16 pb-14 md:pt-24">
      <div className="container">
        <div className="mx-auto max-w-[46rem]">
          {categoryNames.length > 0 && (
            <p className="record text-ink-soft">{categoryNames.join(', ')}</p>
          )}

          <h1 className="serif mt-5 text-[clamp(2.1rem,5.2vw,3.6rem)]">{title}</h1>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-rule pt-5">
            {hasAuthors && (
              <div>
                <dt className="record text-ink-soft">
                  {locale === 'vi' ? 'Tác giả' : 'Author'}
                </dt>
                <dd className="mt-1">{formatAuthors(populatedAuthors)}</dd>
              </div>
            )}
            {publishedAt && (
              <div>
                <dt className="record text-ink-soft">
                  {locale === 'vi' ? 'Đăng ngày' : 'Published'}
                </dt>
                <dd className="mt-1">
                  <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {heroImage && typeof heroImage !== 'string' && (
          <div className="mx-auto mt-14 max-w-[54rem] border border-rule">
            <Media
              imgClassName="w-full object-cover"
              priority
              resource={heroImage}
              size="(min-width: 54rem) 54rem, 100vw"
            />
          </div>
        )}
      </div>
    </header>
  )
}
