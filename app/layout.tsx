import type React from 'react'

import { JetBrains_Mono, Lexend } from 'next/font/google'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import Script from 'next/script'
import data from '@/lib/data'
import CONSTANTS from '@/lib/constants'

import { cn, Container } from '@trash-kit/ui'

import type { LayoutProps } from '@/types/layout'
import type { Metadata, Viewport } from 'next'

import '@/app/styles.css'

export const metadata: Metadata = {
  metadataBase: new URL(CONSTANTS.APP_URL),
  applicationName: `${CONSTANTS.NAME}'s website`,
  keywords: data.seo.keywords.join(', '),
  description: data.seo.description,
  manifest: `${CONSTANTS.APP_URL}/manifest.json`,
  title: {
    default: 'About me',
    template: `%s - ${CONSTANTS.NAME}`
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  twitter: {
    card: 'summary',
    description: data.seo.description,
    title: {
      default: 'About me',
      template: `%s - ${CONSTANTS.NAME}`
    }
  },
  openGraph: {
    siteName: `${CONSTANTS.NAME}'s website`,
    locale: 'en_US',
    type: 'website',
    description: data.seo.description,
    url: CONSTANTS.APP_URL,
    countryName: 'Türkiye',
    title: {
      default: 'About me',
      template: `%s - ${CONSTANTS.NAME}`
    }
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
})

const RootLayout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => {
  return (
    <html suppressHydrationWarning lang='en-US'>
      <body
        className={cn(
          'relative overflow-x-hidden size-full text-primary bg-surface-primary',
          lexend.variable,
          jetbrainsMono.variable
        )}
      >
        <div className='absolute z-0 inset-0 overflow-hidden'>
          <Container className='absolute inset-0'>
            <div className='absolute top-[10%] left-[15%] size-96 opacity-25 bg-accent-500 rounded-full blur-[128px]' />
            <div className='absolute top-[35%] right-[20%] size-96 opacity-25 bg-accent-600 rounded-full blur-[128px]' />
            <div className='absolute top-[50%] left-[25%] size-96 opacity-25 bg-accent-800 rounded-full blur-[128px]' />
            <div className='absolute top-[75%] right-[10%] size-96 opacity-25 bg-accent-700 rounded-full blur-[128px]' />
          </Container>
        </div>

        <div className='relative z-10 size-full'>
          <Header />

          <main id='main' className='w-full min-h-screen_'>
            {children}
          </main>

          <Footer />
        </div>

        <Script
          defer
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon={`{"token": "${process.env.CLOUDFLARE_TOKEN}"}`}
        />
      </body>
    </html>
  )
}

export default RootLayout
