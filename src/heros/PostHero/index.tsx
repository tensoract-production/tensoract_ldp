import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { Media } from '@/components/Media'
import { defaultLocale } from '@/i18n/config'
import { formatAuthors } from '@/utilities/formatAuthors'

/**
 * Posts open the way the rest of the site does: hairline rules, mono metadata,
 * the title set wide on paper. The hero image sits below the headline rather
 * than behind it, so nothing has to fight a gradient for contrast.
 */
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
    <header className="border-b border-rule pt-14 pb-12 md:pt-20">
      <div className="container">
        <div className="mx-auto max-w-[48rem]">
          {categoryNames.length > 0 && (
            <p className="manifest text-ink-soft">{categoryNames.join(', ')}</p>
          )}

          <h1 className="display mt-5 text-[clamp(2.1rem,5.5vw,3.75rem)]">{title}</h1>

          <dl className="manifest mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-5 text-ink-soft">
            {hasAuthors && (
              <div>
                <dt>{locale === 'vi' ? 'Tác giả' : 'Author'}</dt>
                <dd className="mt-1 text-ink normal-case">{formatAuthors(populatedAuthors)}</dd>
              </div>
            )}
            {publishedAt && (
              <div>
                <dt>{locale === 'vi' ? 'Đăng ngày' : 'Published'}</dt>
                <dd className="mt-1 text-ink">
                  <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {heroImage && typeof heroImage !== 'string' && (
          <div className="mx-auto mt-12 max-w-[56rem] border border-rule">
            <Media
              imgClassName="w-full object-cover"
              priority
              resource={heroImage}
              size="(min-width: 56rem) 56rem, 100vw"
            />
          </div>
        )}
      </div>
    </header>
  )
}
