import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import localFont from 'next/font/local'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

import { SideNav } from '@/SideNav/Component'
import { LayoutSeparator } from '@/components/LayoutSeparator'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { OrganizationSchema } from '@/components/OrganizationSchema'

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const serif = localFont({
  src: [
    {
      path: './fonts/Redaction-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Redaction-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, serif.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <OrganizationSchema />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* <ProgressiveBlur position="top" className="fixed z-40" height="3rem" /> */}
          <ProgressiveBlur position="bottom" className="fixed z-40" height="3rem" />

          <Header />
          <LayoutSeparator />
          <div className='container w-full bg-background mx-auto grid grid-cols-12 gap-2 relative text-primary'>
            <div className='col-span-2 hidden md:block'>
              <SideNav />
            </div>
            <div className='col-span-12 md:col-span-10'>
              {children}
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  // twitter: {
  //   card: 'summary_large_image',
  //   creator: '@payloadcms',
  // },
}
