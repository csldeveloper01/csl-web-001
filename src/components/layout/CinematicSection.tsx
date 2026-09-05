import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CinematicSectionProps {
  id: string;
  isActive: boolean;
  children: ReactNode;
}

export function CinematicSection({ id, isActive, children }: CinematicSectionProps) {
  return (
    <div
      id={id}
      data-section-id={id}
      className="relative w-full min-h-screen flex items-center justify-center snap-start"
    >
      <motion.div
        className="w-full flex flex-col items-center justify-center"
        initial={{ opacity: 0.3, scale: 0.98 }}
        animate={{
          opacity: isActive ? 1 : 0.45,
          scale: isActive ? 1 : 0.98,
        }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
