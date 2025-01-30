import type React from 'react'

import { GoogleTagManager } from '@next/third-parties/google'
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/providers/theme'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import { JetBrains_Mono, Lexend } from 'next/font/google'
import { cn } from '@/lib/cn'
import data from '@/data'

import type { LayoutProps } from '@/types/layout'
import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(data.siteUrl),
  generator: 'Next.js',
  applicationName: `${data.name}'s website`,
  keywords: data.keywords,
  creator: data.name,
  publisher: data.name,
  referrer: 'origin',
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
  subsets: ["latin"],
  variable: "--font-mono"
})

const RootLayout: React.FC<LayoutProps> = ({ children }: LayoutProps): React.ReactNode => {
  return (
    <ViewTransitions>
      <html suppressHydrationWarning lang='en-US'>
        <body
          className={cn(
            'relative overflow-x-hidden size-full text-primary bg-background-primary',
            lexend.variable,
            jetbrainsMono.variable
          )}
        >
          <ThemeProvider>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='absolute z-0 top-[10%] left-[15%] size-96 opacity-25 bg-accent-500 rounded-full blur-[128px]' />
              <div className='absolute z-0 top-[35%] right-[20%] size-96 opacity-25 bg-accent-600 rounded-full blur-[128px]' />
              <div className='absolute z-0 top-[50%] left-[25%] size-96 opacity-25 bg-accent-800 rounded-full blur-[128px]' />
              <div className='absolute z-0 top-[80%] right-[10%] size-96 opacity-25 bg-accent-700 rounded-full blur-[128px]' />
            </div>

            <div id='main' className='relative size-full z-10'>
              <Header />

              <div className='grid gap-4 size-full'>
                <div className='w-full min-h-screen_'>
                  <main className='size-full'>{children}</main>
                </div>

                <Footer />
              </div>
            </div>
          </ThemeProvider>

          <GoogleTagManager gtmId={process.env.GTAG_ID || ""} />
        </body>
      </html>
    </ViewTransitions>
  )
}

export default RootLayout
