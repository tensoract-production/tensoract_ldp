'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { resolveTheme, themeLocalStorageKey } from './shared'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // InitTheme has already written the attribute before this ever runs, so read
  // it rather than re-deciding and risking a second, different answer.
  const [theme, setThemeState] = useState<Theme | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setTheme = useCallback((themeToSet: Theme | null) => {
    const next = resolveTheme(themeToSet)

    try {
      if (themeToSet === null) {
        window.localStorage.removeItem(themeLocalStorageKey)
      } else {
        window.localStorage.setItem(themeLocalStorageKey, next)
      }
    } catch (e) {
      // Storage blocked. The choice still applies to this page; it just will
      // not survive a reload, which beats refusing to switch at all.
    }

    document.documentElement.setAttribute('data-theme', next)
    setThemeState(next)
  }, [])

  useEffect(() => {
    let stored: null | string = null

    try {
      stored = window.localStorage.getItem(themeLocalStorageKey)
    } catch (e) {
      /* storage blocked; the default stands */
    }

    const next = resolveTheme(stored)
    document.documentElement.setAttribute('data-theme', next)
    setThemeState(next)
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
