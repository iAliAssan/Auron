'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProductConfig } from '@/types/product';
import { Container } from '@/components/Container';

interface ProductHeroProps {
  config: ProductConfig;
}

export function ProductHero({ config }: ProductHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4"
          >
            {config.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary font-medium mb-4"
          >
            {config.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {config.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            {config.heroCTA.map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  cta.variant === 'primary'
                    ? 'bg-primary text-background hover:bg-primary/90 hover:scale-105'
                    : cta.variant === 'secondary'
                    ? 'bg-surface text-text-primary border border-border hover:bg-primary/10 hover:border-primary'
                    : 'border border-border text-text-secondary hover:text-text-primary hover:border-primary hover:bg-primary/5'
                }`}
              >
                {cta.text}
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
