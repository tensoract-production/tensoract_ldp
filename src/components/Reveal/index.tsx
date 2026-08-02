'use client'

import { LazyMotion, MotionConfig } from 'motion/react'
import * as m from 'motion/react-m'
import React from 'react'

import { cn } from '@/utilities/ui'

const loadFeatures = () => import('./features').then((mod) => mod.default)

type Tag = 'div' | 'ul' | 'dl' | 'li'

/**
 * A reveal that keeps its contents on the server.
 *
 * These are client components, but the sections they wrap are not: children
 * arrive as an already-rendered slot, so `ProductLabels` keeps fetching from
 * Payload on the server and only the wrapper ships to the browser.
 *
 * `m` comes from `motion/react-m` rather than the main entrypoint — importing
 * it from `motion/react` drags the fully-featured `motion` component into the
 * initial chunk and defeats the point of `LazyMotion`.
 *
 * Reduced motion is handled by `MotionConfig`, never by branching on a hook:
 * `useReducedMotion()` is null during SSR, so branching renders a different
 * tree on the server than on the client, which both trips a hydration mismatch
 * and strands the content at opacity 0. `reducedMotion="user"` instead drops
 * the transform and keeps the fade, on an identical tree.
 */
export const RevealGroup: React.FC<{
  as?: Tag
  children: React.ReactNode
  className?: string
}> = ({ as: Element = 'div', children, className }) => (
  <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">
      <Element className={className}>{children}</Element>
    </MotionConfig>
  </LazyMotion>
)

export const RevealItem: React.FC<{
  as?: 'div' | 'li'
  children: React.ReactNode
  className?: string
  index?: number
}> = ({ as = 'div', children, className, index = 0 }) => {
  const Motion = as === 'li' ? m.li : m.div

  return (
    <Motion
      className={cn(className)}
      data-reveal=""
      initial="hidden"
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1], delay: index * 0.07 }}
      variants={{
        hidden: { opacity: 0, y: 14 },
        shown: { opacity: 1, y: 0 },
      }}
      viewport={{ amount: 0.25, once: true }}
      whileInView="shown"
    >
      {children}
    </Motion>
  )
}
