import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

// @ts-expect-error — Vite asset import
import notFoundImage from '../../../Elements/404/404.png';

export function NotFoundPage() {
  return (
    <section className="flex items-center justify-center min-h-[70vh] bg-csl-bg px-6 pt-28 md:pt-36 pb-16">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-12 lg:gap-16">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <motion.div
            className="w-full max-w-md md:max-w-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={notFoundImage}
              alt="404 Not Found"
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <p className="text-lg md:text-xl font-semibold text-csl-blue max-w-md">
            Looks like the page took a - career break!
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-csl-deep-blue to-csl-blue px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-csl-blue/20"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}
