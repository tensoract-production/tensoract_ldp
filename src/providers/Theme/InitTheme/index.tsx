import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../shared'

/**
 * Runs before first paint so a reader who chose dark never sees a sheet of
 * white on the way to it. Mirrors `resolveTheme` by hand: this has to ship as
 * a string of source, so it cannot import the function it duplicates.
 */
export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    var stored = null
    try {
      stored = window.localStorage.getItem('${themeLocalStorageKey}')
    } catch (e) {
      /* storage blocked (private mode); fall through to the default */
    }
    var theme = stored === 'dark' || stored === 'light' ? stored : '${defaultTheme}'
    document.documentElement.setAttribute('data-theme', theme)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
