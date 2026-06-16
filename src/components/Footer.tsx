'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'
import { branding } from '@/config/branding'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-24">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold text-text-primary">{branding.name}</span>
              <span className="text-text-tertiary text-sm">Intelligent Systems</span>
            </div>
            <p className="text-text-tertiary text-sm">
              {branding.namePersian} | {branding.tagline}
            </p>
          </div>

          <div className="text-center text-text-tertiary text-sm">
            <p className="text-xs">
              Designed &amp; Developed with ☕, code, and a little bit of obsession by Ali Assan
            </p>
            <p className="mt-1">{branding.name}.ir</p>
            <p>© {content.footer.copyright}</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
