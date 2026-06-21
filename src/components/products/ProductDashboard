'use client';

import { motion } from 'framer-motion';
import { ProductConfig } from '@/types/product';
import { Container } from '@/components/Container';
import Image from 'next/image';

interface ProductDashboardProps {
  config: ProductConfig;
}

export function ProductDashboard({ config }: ProductDashboardProps) {
  return (
    <section id="dashboard" className="py-16 border-t border-border">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            {config.dashboard.title}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {config.dashboard.description}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden border border-border shadow-[8px_8px_16px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.02)]"
        >
          <Image
            src={config.dashboard.image}
            alt={config.dashboard.alt}
            width={1200}
            height={675}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </Container>
    </section>
  );
}
