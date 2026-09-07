import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-csl-bg px-8 py-16">
      <p className="text-6xl font-bold text-csl-blue">404</p>
      <h1 className="mt-4 text-2xl font-bold text-csl-blue">Page Not Found</h1>
      <p className="mt-2 text-center text-csl-muted max-w-xl">
        The page you are looking for does not exist or may have been moved.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-csl-blue px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </a>
    </section>
  );
}
