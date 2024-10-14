import type React from 'react'

import { ThemeProvider } from '@/providers/theme'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { Lexend } from 'next/font/google'
import data from '@/data'

import type { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import type { LayoutProps } from '@/types/layout'
import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(data.siteUrl),
  generator: 'Next.js',
  applicationName: `${data.name}'s website`,
  keywords: data.keywords,
  creator: data.username,
  publisher: data.username,
  authors: [{ name: data.username, url: data.siteUrl }],
  description: data.description,
  manifest: `${data.siteUrl}/manifest.json`,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || ''
  },
  title: {
    default: 'About me',
    template: `%s - ${data.name}`
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  twitter: {
    description: data.description,
    title: {
      default: 'About me',
      template: `%s - ${data.name}`
    }
  },
  openGraph: {
    siteName: `${data.name}'s website`,
    locale: 'en_US',
    type: 'website',
    description: data.description,
    url: data.siteUrl,
    title: {
      default: 'About me',
      template: `%s - ${data.name}`
    }
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0a0e' }
  ]
}

const lexend: NextFontWithVariable = Lexend({
  subsets: ['latin'],
  variable: '--font-main'
})

const RootLayout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => {
  return (
    <html suppressHydrationWarning lang='en-US'>
      <body className={lexend.variable}>
        <ThemeProvider>
          <Header />

          <main className='min-h-screen_'>{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
