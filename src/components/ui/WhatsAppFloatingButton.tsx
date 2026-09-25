import React from 'react';
import { MessageSquare } from 'lucide-react';

/**
 * Global floating WhatsApp button that appears on all pages.
 * Clicking opens the WhatsApp chat with the pre‑filled number.
 */
export const WhatsAppFloatingButton: React.FC = () => (
  <a
    href="https://wa.me/918056052806"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-12 h-12 bg-csl-green rounded-full shadow-lg hover:scale-105 transition-transform"
  >
    <MessageSquare className="w-6 h-6 text-white" />
  </a>
);
