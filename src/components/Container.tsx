'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

export function MotionContainer({ children, className = '' }: ContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}
