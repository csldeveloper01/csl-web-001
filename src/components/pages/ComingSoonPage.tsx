// @ts-expect-error — Vite asset import
import comingSoonImage from '../../../Elements/STUDENT PORTAL/Coming Soon.png';

export function ComingSoonPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-csl-bg px-6 py-16">
      <img
        src={comingSoonImage}
        alt="Student Portal Coming Soon"
        className="w-full max-w-3xl h-auto object-contain"
        draggable={false}
      />
      <div className="mt-8 text-center max-w-xl space-y-3">
        <p className="text-lg md:text-xl font-semibold text-csl-blue">
          Your space is almost ready.
        </p>
        <p className="text-base md:text-lg text-csl-muted">
          A smarter way to learn, track your journey, and stay connected.
        </p>
        <p className="text-base md:text-lg font-semibold text-csl-blue">
          Student Portal — Coming Soon.
        </p>
      </div>
    </section>
  );
}
