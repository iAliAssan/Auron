import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'
import { BackgroundEffects } from '@/components/BackgroundEffects'

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: 'AURON',
  description: 'Intelligent Systems',
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
      </body>
    </html>
  )
}
