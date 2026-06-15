'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { content } from '@/config/content'
import { branding } from '@/config/branding'
import { Logo } from './Logo'
import { Container } from './Container'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <Container className="py-20 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
            <Logo />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            {branding.name}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-3xl text-text-secondary max-w-3xl mx-auto whitespace-pre-line"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-12">
            <a
              href="#products"
              className="neumorphic-button inline-block px-8 py-4 text-lg font-medium text-text-primary hover:text-primary transition-colors duration-300"
            >
              {content.hero.cta}
            </a>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border border-text-secondary/30 flex justify-center">
          <div className="w-1 h-3 bg-text-secondary/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
