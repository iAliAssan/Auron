'use client';

import { motion } from 'framer-motion';
import { ProductConfig } from '@/types/product';
import { Container } from '@/components/Container';

interface ProductWhyProps {
  config: ProductConfig;
}

export function ProductWhy({ config }: ProductWhyProps) {
  return (
    <section className="py-16 border-t border-border">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-8">
            {config.why.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.why.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10"
              >
                <span className="text-primary text-lg">✓</span>
                <span className="text-text-secondary text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
