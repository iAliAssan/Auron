'use client'

import { motion } from 'framer-motion'
import { content } from '@/config/content'
import { Container } from './Container'

export function BrandStatement() {
  return (
    <section className="py-24 md:py-32 flex items-center justify-center min-h-[60vh]">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-text-primary whitespace-pre-line leading-tight">
            {content.brandStatement.text}
          </h2>
        </motion.div>
      </Container>
    </section>
  )
}
