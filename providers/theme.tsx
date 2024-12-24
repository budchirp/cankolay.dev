'use client'

import type React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children
}: ThemeProviderProps): React.ReactNode => (
  <NextThemeProvider disableTransitionOnChange attribute='class'>
    {children}
  </NextThemeProvider>
)

export { ThemeProvider }
