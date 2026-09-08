// @ts-expect-error — Vite asset import
import comingSoonImage from '../../../Elements/STUDENT PORTAL/Coming Soon.png';

export function ComingSoonPage() {
  return (
    <section className="flex items-center justify-center min-h-[70vh] bg-csl-bg px-6 pt-28 md:pt-36 pb-16">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-12 lg:gap-16">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src={comingSoonImage}
            alt="Student Portal Coming Soon"
            className="w-full max-w-lg h-auto object-contain"
            draggable={false}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start text-left space-y-3">
          <p className="text-lg md:text-xl font-semibold text-csl-blue">
            Your space is almost ready.
          </p>
          <p className="text-base md:text-lg text-csl-muted max-w-md">
            A smarter way to learn, track your journey, and stay connected.
          </p>
          <p className="text-base md:text-lg font-semibold text-csl-blue">
            Student Portal — Coming Soon.
          </p>
        </div>
      </div>
    </section>
  );
}
