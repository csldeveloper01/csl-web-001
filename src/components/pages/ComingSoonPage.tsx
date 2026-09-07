import { Construction } from 'lucide-react';

export function ComingSoonPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-csl-bg px-8 py-16">
      <Construction className="h-24 w-24 text-csl-blue" strokeWidth={1.5} />
      <h1 className="mt-6 text-2xl font-bold text-csl-blue">Student Portal – Coming Soon</h1>
      <p className="mt-2 text-center text-csl-muted max-w-xl">
        We are working hard to launch the Student Portal. Stay tuned for updates!
      </p>
    </section>
  );
}
