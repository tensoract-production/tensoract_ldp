import React from 'react'

import { cn } from '@/utilities/ui'
import type { Product } from '@/payload-types'

const dotTone: Record<Product['status'], string> = {
  live: 'bg-verified',
  beta: 'bg-ink',
  building: 'bg-ink-soft',
  archived: 'bg-ink-soft/50',
}

export const StatusChip: React.FC<{
  status: Product['status']
  label: string
  className?: string
}> = ({ status, label, className }) => (
  <span className={cn('manifest inline-flex items-center gap-2 text-ink-soft', className)}>
    <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', dotTone[status])} />
    {label}
  </span>
)
