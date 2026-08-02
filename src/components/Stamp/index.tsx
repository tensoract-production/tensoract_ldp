import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * The rubber stamp a warehouse presses onto a checked parcel. Used only for
 * things that have actually been verified by someone outside the company:
 * an award result, a confirmed status.
 */
export const Stamp: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <span
    className={cn(
      'manifest inline-flex -rotate-3 items-center rounded-[3px] border-2 border-verified',
      'px-2.5 py-1 text-verified-deep ring-1 ring-verified/35 ring-inset',
      className,
    )}
  >
    {children}
  </span>
)
