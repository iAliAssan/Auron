'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-noise">
      {/* Gradient orb 1 */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-primary opacity-[0.03] blur-[120px]"
        animate={{
          x: mousePosition.x * 100 - 50,
          y: mousePosition.y * 100 - 50,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        style={{ left: '10%', top: '20%' }}
      />

      {/* Gradient orb 2 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-accent opacity-[0.03] blur-[120px]"
        animate={{
          x: (mousePosition.x - 0.5) * -80,
          y: (mousePosition.y - 0.5) * -80,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        style={{ right: '5%', bottom: '15%' }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 20, -20, 20],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </div>
  )
}
