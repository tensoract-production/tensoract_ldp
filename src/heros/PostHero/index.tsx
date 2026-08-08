import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Media } from '@/components/Media'
import { defaultLocale } from '@/i18n/config'

export const PostHero: React.FC<{
  post: Post
  locale?: Locale
}> = ({ locale = defaultLocale, post }) => {
  const { authors, categories, heroImage, publishedAt, title } = post

  const authorNames = (authors ?? [])
    .map((author) => (typeof author === 'object' && author !== null ? author.name : null))
    .filter(Boolean)

  const categoryNames = (categories ?? [])
    .map((category) => (typeof category === 'object' && category !== null ? category.title : null))
    .filter(Boolean)

  return (
    <header className="border-b border-border pt-16 pb-14 md:pt-24">
      <div className="container">
        <div className="mx-auto max-w-[46rem]">
          {categoryNames.length > 0 && (
            <p className="wire-label">{categoryNames.join(', ')}</p>
          )}

          <h1 className="wire-title mt-5 text-[clamp(2.1rem,5.2vw,3.6rem)]">{title}</h1>

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-5">
            {authorNames.length > 0 && (
              <div>
                <dt className="wire-label">
                  {locale === 'vi' ? 'Tác giả' : 'Author'}
                </dt>
                <dd className="mt-1">{authorNames.join(', ')}</dd>
              </div>
            )}
            {publishedAt && (
              <div>
                <dt className="wire-label">
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
          <div className="mx-auto mt-14 max-w-[54rem] border border-border">
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
