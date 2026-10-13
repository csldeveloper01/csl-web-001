import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CareerApplicationForm } from './CareerApplicationForm';

export interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPosition?: string;
  positions: { value: string; label: string }[];
}

export function CareerModal({
  isOpen,
  onClose,
  initialPosition = '',
  positions
}: CareerModalProps) {
  // Lock background scroll when modal is open and restore on close
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Career Application Modal"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-csl-deep-blue/60 backdrop-blur-md z-0"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-xl bg-csl-bg border border-csl-gold/30 rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-csl-gold/30 flex items-center justify-center text-csl-text hover:bg-csl-blue hover:text-white transition-all shadow-xs cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Reusable Application Form */}
            <CareerApplicationForm
              key={`modal-form-${initialPosition}`}
              initialPosition={initialPosition}
              positions={positions}
              context="modal"
              onClose={onClose}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CareerModal;
