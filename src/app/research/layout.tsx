import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'تحقیق و توسعه | AURON',
  description:
    'مرکز تحقیق و توسعه آئوران شامل پرسونا، تحلیل داده، تحقیقات بازار و پروژه‌های در حال توسعه در حوزه سیستم‌های هوشمند و اینترنت اشیا.',

  alternates: {
    canonical: '/research',
  },

  openGraph: {
    title: 'تحقیق و توسعه | AURON',
    description:
      'پژوهش‌ها، تحلیل‌ها و پروژه‌های تحقیق و توسعه AURON',
    url: 'https://auron.ir/research',
    siteName: 'AURON',
    locale: 'fa_IR',
    type: 'website',
  },
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
