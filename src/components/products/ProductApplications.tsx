'use client';

import { motion } from 'framer-motion';
import { ProductConfig } from '@/types/product';
import { Container } from '@/components/Container';
import * as LucideIcons from 'lucide-react';

interface ProductApplicationsProps {
  config: ProductConfig;
}

const getIcon = (name: string) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className="w-6 h-6 text-primary" /> : null;
};

export function ProductApplications({ config }: ProductApplicationsProps) {
  return (
    <section className="py-16 border-t border-border">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12"
        >
          {config.applications.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.applications.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 text-center hover:border-primary transition-all duration-300"
            >
              <div className="flex justify-center mb-3">{getIcon(item.icon)}</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
