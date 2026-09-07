import React from "react";
import comingSoonImg from "../assets/coming-soon/coming-soon.png";

const ComingSoonPage: React.FC = () => (
  <section className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
    <img src={comingSoonImg} alt="Coming Soon" className="max-w-full h-auto" />
    <h1 className="mt-6 text-2xl font-bold text-csl-blue">Student Portal – Coming Soon</h1>
    <p className="mt-2 text-center text-csl-muted max-w-xl">
      We are working hard to launch the Student Portal. Stay tuned for updates!
    </p>
  </section>
);

export default ComingSoonPage;
