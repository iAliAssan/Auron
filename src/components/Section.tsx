import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function Section({ 
  title, 
  children, 
  className = '',
  titleClassName = ''
}: SectionProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary text-center mb-8 md:mb-12 ${titleClassName}`}
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}
