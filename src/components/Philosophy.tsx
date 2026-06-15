'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem, expandableContent } from '@/lib/animations'
import { content } from '@/config/content'
import { Container, MotionContainer } from './Container'

interface PhilosophyItem {
  id: string
  title: string
  description: string
}

function PhilosophyCard({ item, isExpanded, onToggle }: {
  item: PhilosophyItem
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="neumorphic-card p-6 md:p-8 cursor-pointer transition-all duration-300 hover:bg-background-card/80"
      onClick={onToggle}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
          {item.title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border border-text-tertiary flex items-center justify-center"
        >
          <span className="text-xl text-text-tertiary">+</span>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            variants={expandableContent}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <p className="text-text-secondary leading-relaxed border-t border-border pt-4 mt-2">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Philosophy() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-24 md:py-32">
      <Container>
        <MotionContainer className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
          >
            {content.philosophy.title}
          </motion.h2>
        </MotionContainer>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {content.philosophy.items.map((item) => (
            <PhilosophyCard
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
