import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Tracker } from '@/components/Tracker'

import './globals.css'
import { BackgroundEffects } from '@/components/BackgroundEffects'

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://auron.ir'),

  title: {
    default: 'AURON | سیستم‌های هوشمند برای دنیای متصل',
    template: '%s | AURON',
  },

  description:
    'آئوران ارائه‌دهنده سیستم‌های هوشمند برای پایش، تحلیل، کنترل و هوشمندسازی فرآیندهای واقعی با استفاده از اینترنت اشیا و تحلیل داده.',

  keywords: [
    'AURON',
    'آئوران',
    'سیستم هوشمند',
    'اینترنت اشیا',
    'IoT',
    'کشاورزی هوشمند',
    'پایش داده',
    'تحلیل داده',
    'اتوماسیون',
    'هوشمندسازی',
    'مدیریت مزرعه',
  ],

  authors: [{ name: 'AURON Team' }],

  creator: 'AURON',

  publisher: 'AURON',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  openGraph: {
    title: 'AURON | سیستم‌های هوشمند برای دنیای متصل',
    description:
      'سیستم‌های هوشمند برای پایش، تحلیل، کنترل و هوشمندسازی فرآیندهای مبتنی بر داده و IoT',
    url: 'https://auron.ir',
    siteName: 'AURON',
    locale: 'fa_IR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AURON',
    description:
      'سیستم‌های هوشمند برای دنیای متصل | IoT | تحلیل داده | اتوماسیون',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-background text-white">
        <BackgroundEffects />
        {children}
        <Analytics />
        <SpeedInsights />
        <Tracker />
      </body>
    </html>
  )
}
