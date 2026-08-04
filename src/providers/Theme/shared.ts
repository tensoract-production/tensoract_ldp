import type { Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

/**
 * Paper is the ground this design is built on; dark is the same sheet under a
 * low lamp. A first-time reader therefore gets paper whatever their OS
 * prefers, and only pressing the switch moves them off it.
 *
 * This deliberately ignores `prefers-color-scheme`: following the OS meant
 * dark-mode visitors met a dark site they had never asked this site for. The
 * switch makes that choice sayable instead of guessed.
 */
export const defaultTheme: Theme = 'light'

export const resolveTheme = (stored: null | string): Theme =>
  stored === 'dark' || stored === 'light' ? stored : defaultTheme
