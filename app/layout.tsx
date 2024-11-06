import type React from 'react'

import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/providers/theme'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { Lexend } from 'next/font/google'
import data from '@/data'

import type { LayoutProps } from '@/types/layout'
import type { Metadata, Viewport } from 'next'

import '@/app/styles.css'
import { cn } from '@/lib/cn'

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

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-main'
})

const RootLayout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => {
  return (
    <ViewTransitions>
      <html
        suppressHydrationWarning
        lang='en-US'
        className='scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700'
      >
        <body
          className={cn('relative w-full text-primary bg-primary min-h-screen_', lexend.variable)}
        >
          <ThemeProvider>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='absolute z-0 top-[16rem] left-[12rem] size-96 opacity-50 bg-accent-500 rounded-full blur-[128px]' />
              <div className='absolute z-0 top-[32rem] right-[16rem] size-96 opacity-50 bg-accent-600 rounded-full blur-[128px]' />
              <div className='absolute z-0 top-[64rem] left-[24rem] size-96 opacity-50 bg-accent-800 rounded-full blur-[128px]' />
            </div>

            <div id='main' className='relative z-10'>
              <Header />

              <main className='min-h-screen_'>{children}</main>

              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}

export default RootLayout
