import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { BackgroundEffects } from '@/components/BackgroundEffects'
import { theme } from '@/config/theme'
import { typography } from '@/config/typography'
import { branding } from '@/config/branding'

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: branding.siteTitle,
  description: branding.tagline,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${typography.fontFamily}`}>
      <body className="bg-background text-text-primary antialiased">
        <BackgroundEffects />
        {children}
      </body>
    </html>
  )
}
