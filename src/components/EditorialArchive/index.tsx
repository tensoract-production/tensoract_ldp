import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import type { CardPostData } from '@/components/Card'

import { ArrowRight } from '@/components/Icon'
import { Media } from '@/components/Media'
import { getDictionary } from '@/i18n/dictionaries'
import { cn } from '@/utilities/ui'

/**
 * A front page, not a feed. The lead story takes the full measure and the
 * largest setting; what follows runs in uneven columns divided by printed
 * rules, the way a broadsheet allocates attention. The modern part is the
 * asymmetry — nothing here is a card of equal weight.
 */

const categoryLine = (post: CardPostData) =>
  (post.categories ?? [])
    .map((c) => (typeof c === 'object' && c !== null ? c.title : null))
    .filter(Boolean)
    .join(', ')

const ReadMark: React.FC<{ label: string }> = ({ label }) => (
  <span className="mt-5 inline-flex items-center gap-2 text-ink transition-colors group-hover:text-son-deep">
    {label}
    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
  </span>
)

export const EditorialArchive: React.FC<{
  posts: CardPostData[]
  locale: Locale
  className?: string
}> = ({ className, locale, posts }) => {
  if (!posts?.length) return null

  const dict = getDictionary(locale)
  const [lead, ...rest] = posts
  const href = (p: CardPostData) => `/${locale}/posts/${p.slug}`

  return (
    <div className={cn('container', className)}>
      {/* Lead */}
      <article className="group edge-print-b pb-14">
        <Link className="grid gap-8 pt-12 md:grid-cols-12 md:gap-10" href={href(lead)}>
          <div className="md:col-span-7">
            {categoryLine(lead) && (
              <p className="record text-son-deep">{categoryLine(lead)}</p>
            )}
            <h2 className="serif mt-4 text-[clamp(2.1rem,5vw,3.6rem)] transition-colors group-hover:text-son-deep">
              {lead.title}
            </h2>
            {lead.meta?.description && (
              <p className="measure mt-5 text-lg leading-relaxed text-ink-soft">
                {lead.meta.description}
              </p>
            )}
            <ReadMark label={dict.blog.readPost} />
          </div>

          {lead.meta?.image && typeof lead.meta.image !== 'string' && (
            <div className="md:col-span-5">
              <Media
                imgClassName="aspect-[5/4] w-full border border-rule object-cover"
                resource={lead.meta.image}
                size="40vw"
              />
            </div>
          )}
        </Link>
      </article>

      {/* The columns beneath it: three across, uneven in length by content. */}
      {rest.length > 0 && (
        <div
          className={cn(
            'grid gap-x-10',
            // Columns follow the copy: a short run must not leave a hole where
            // a fourth story would have gone.
            rest.length === 1 && 'md:grid-cols-1',
            rest.length === 2 && 'md:grid-cols-2',
            rest.length >= 3 && 'md:grid-cols-3',
          )}
        >
          {rest.map((post, i) => (
            <article
              className={cn(
                'group edge-print-b py-10 md:edge-print-b md:py-12',
                // Printed column rules between, not around.
                i > 0 && 'md:border-l md:border-rule md:pl-10',
              )}
              key={post.slug}
            >
              <Link className="block" href={href(post)}>
                {categoryLine(post) && (
                  <p className="record text-ink-soft">{categoryLine(post)}</p>
                )}
                <h3 className="subhead mt-3 transition-colors group-hover:text-son-deep">
                  {post.title}
                </h3>
                {post.meta?.description && (
                  <p className="mt-3 leading-relaxed text-ink-soft">{post.meta.description}</p>
                )}
                <ReadMark label={dict.blog.readPost} />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
