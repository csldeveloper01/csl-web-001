import { Home } from 'lucide-react';

// @ts-expect-error — Vite asset import
import notFoundImage from '../../../Elements/404/404.png';

export function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-csl-bg px-6 py-16">
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="w-full max-w-2xl h-auto object-contain"
        draggable={false}
      />
      <p className="mt-8 text-center text-lg md:text-xl font-semibold text-csl-blue max-w-xl">
        Looks like the page took a - career break!
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-csl-deep-blue to-csl-blue px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-csl-blue/20"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </a>
    </section>
  );
}
