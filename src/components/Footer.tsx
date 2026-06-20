'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'
import { branding } from '@/config/branding'
import { Container } from './Container'
import Link from 'next/link'

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

          {/* تحقیق و توسعه */}
          <Link
            href="/persona"
            className="group relative mt-2 px-6 py-2 text-sm rounded-full border border-primary/30 text-text-secondary hover:text-text-primary hover:border-primary transition-all duration-300"
          >
            <span className="relative z-10">🔬 تحقیق و توسعه</span>
            <span className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </Link>

          {/* Copyright */}
          <p className="text-text-tertiary text-xs mt-2">
            © ۱۴۰۵
          </p>
        </div>
      </Container>
    </footer>
  )
}
