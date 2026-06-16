'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'
import { branding } from '@/config/branding'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-24">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-text-primary font-brand tracking-wide">
              {branding.namePersian}
            </span>
            <span className="text-text-tertiary text-sm tracking-wider">
              Intelligent Systems
            </span>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-border"></div>

          {/* Designed by */}
          <p className="text-text-tertiary text-xs leading-relaxed max-w-md">
            Designed &amp; Developed with ☕, code, and a little bit of obsession by Ali Assan
          </p>

          {/* Copyright */}
          <p className="text-text-tertiary text-xs">
            © ۱۴۰۵
          </p>
        </div>
      </Container>
    </footer>
  )
}
