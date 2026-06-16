'use client';

import { motion } from 'framer-motion';
import { logoBreathing } from '@/lib/animations';
import Image from 'next/image';

export function Logo() {
  return (
    <motion.div
      variants={logoBreathing}
      initial="initial"
      animate="animate"
      className="inline-block"
    >
      <Image
        src="/logo.svg"
        alt="AURON Logo"
        width={200}
        height={150}
        className="w-auto h-auto"
        priority
      />
    </motion.div>
  );
}
