import { motion } from 'framer-motion';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/918056052806"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CreatorSpaceLab on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[9990] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300"
    >
      <img
        src="/assets/whatsapp.svg"
        alt=""
        className="w-full h-full object-contain"
        aria-hidden="true"
      />

      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20 pointer-events-none" />
    </motion.a>
  );
}