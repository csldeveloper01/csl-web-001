import { motion } from 'framer-motion';

export function YellowBox({ size, pos, delay, duration }: { size: string, pos: string, delay: number, duration: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-auto overflow-visible ${pos} ${size}`}
      data-distort="yellow"
      style={{
        backgroundColor: 'rgba(245, 184, 61, 0.12)',
        border: '1px solid rgba(245, 184, 61, 0.65)',
        zIndex: 0
      }}
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: [0, 2, 0, -2, 0],
        y: [0, -3, 0, 3, 0],
        opacity: [1, 0.9, 1]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {/* Pulse out ring */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ border: '1px solid rgba(245, 184, 61, 0.8)' }}
        animate={{
          scale: [1, 1.3],
          opacity: [0.5, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: delay
        }}
      />
    </motion.div>
  );
}
