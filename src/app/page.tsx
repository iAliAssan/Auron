'use client'

import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { BrandStatement } from '@/components/BrandStatement'
import { ProductSection } from '@/components/ProductSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Philosophy />
      <BrandStatement />
      <ProductSection />
      <Footer />
    </main>
  )
}
