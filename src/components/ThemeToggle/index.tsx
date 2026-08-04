'use client'

import React from 'react'

import type { Locale } from '@/i18n/config'

import { Moon, Sun } from '@/components/Icon'
import { getDictionary } from '@/i18n/dictionaries'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'

/**
 * Sits with the other chrome controls and behaves like them: one press, no
 * menu. There is no third "follow my system" state on purpose — the site has
 * a ground it is designed on, and the reader either stays on it or leaves it.
 */
export const ThemeToggle: React.FC<{ className?: string; locale: Locale }> = ({
  className,
  locale,
}) => {
  const { setTheme } = useTheme()
  const label = getDictionary(locale).nav.theme

  return (
    <button
      // Negative margin buys a 24px-plus target without opening a gap in the
      // row — the same trick the mobile menu button next door uses.
      className={cn(
        '-m-2 inline-flex items-center p-2 text-ink-soft transition-colors hover:text-son-deep',
        className,
      )}
      onClick={() => {
        // Read the live attribute instead of React state: it is what InitTheme
        // wrote and what the CSS is keyed on, so it cannot disagree with the
        // page the reader is looking at.
        const current = document.documentElement.getAttribute('data-theme')
        setTheme(current === 'dark' ? 'light' : 'dark')
      }}
      title={label}
      type="button"
    >
      <span className="sr-only">{label}</span>
      {/* Both marks ship in the markup and CSS reveals one. Branching the tree
          on theme state would make server and client render different HTML —
          the hydration mismatch this project already paid for once. */}
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:inline-block" />
    </button>
  )
}
