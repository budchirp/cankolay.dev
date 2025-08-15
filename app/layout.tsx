import type React from 'react'

import { JetBrains_Mono, Lexend } from 'next/font/google'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import Script from 'next/script'
import { cn } from '@/lib/cn'
import data from '@/data'

import type { LayoutProps } from '@/types/layout'
import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'
import { Container } from '@/components/container'

export const metadata: Metadata = {
  metadataBase: new URL(data.siteUrl),
  applicationName: `${data.name}'s website`,
  keywords: data.keywords,
  creator: data.name,
  publisher: data.name,
  authors: [{ name: data.name, url: data.siteUrl }],
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
    googleBot: {
      index: true,
      follow: true
    }
  },
  twitter: {
    card: 'summary',
    creator: data.name,
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
    countryName: 'Türkiye',
    emails: [data.email],
    title: {
      default: 'About me',
      template: `%s - ${data.name}`
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
          'relative overflow-x-hidden size-full text-text-primary bg-background-primary',
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

        <div className='grid gap-4 relative z-10 size-full'>
          <div className='flex flex-col size-full'>
            <Header />

            <main id='main' className='w-full min-h-screen_'>
              {children}
            </main>
          </div>

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
