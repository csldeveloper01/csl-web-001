export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-csl-bg text-csl-text">
      <main>
        <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-csl-gold/10 via-transparent to-csl-blue/10 pointer-events-none" />
          <div className="relative z-10 section-container">
            <div className="section-eyebrow">
              <span>LEGAL</span>
              <div></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-csl-text leading-[1.05] tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm sm:text-base text-csl-muted font-medium">Last Updated: 7 September 2026</p>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="section-container">
            <article className="max-w-4xl mx-auto bg-white/75 backdrop-blur-xl border border-csl-gold/25 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 shadow-[0_12px_40px_rgba(20,85,184,0.06)] text-sm sm:text-base leading-relaxed text-csl-muted space-y-8">
              
              <div className="border-b border-csl-gold/20 pb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-csl-blue/10 text-csl-blue font-bold text-xs font-mono mb-4">
                  Effective Date: 7 September 2026
                </span>
                <p className="text-csl-text font-medium leading-relaxed mb-4">
                  Creator Space Lab (“Creator Space Lab”, “we”, “us”, or “our”) respects your privacy and is committed to handling personal information responsibly.
                </p>
                <p className="leading-relaxed">
                  This Privacy Policy explains how we collect, use, store, disclose, and protect personal information when you use our website, register for our courses or internships, participate in workshops, contact us, or use our Services.
                </p>
              </div>

              {/* 1. Information We Collect */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">1.</span> Information We Collect
                </h2>
                <p>Depending on how you interact with us, we may collect:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/60 border border-csl-gold/20 p-4 rounded-xl space-y-2">
                    <h3 className="font-bold text-csl-text text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-csl-blue"></span> Personal Information
                    </h3>
                    <ul className="text-xs space-y-1 pl-4 list-disc text-csl-muted">
                      <li>Name, email address, phone/mobile number</li>
                      <li>Date of birth or age details</li>
                      <li>College/institution name and academic background</li>
                      <li>Professional profile, resume/CV, and portfolio</li>
                      <li>Location details voluntarily provided</li>
                    </ul>
                  </div>

                  <div className="bg-white/60 border border-csl-gold/20 p-4 rounded-xl space-y-2">
                    <h3 className="font-bold text-csl-text text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-csl-gold"></span> Enrollment Information
                    </h3>
                    <ul className="text-xs space-y-1 pl-4 list-disc text-csl-muted">
                      <li>Course or workshop selected</li>
                      <li>Internship track &amp; duration preferences</li>
                      <li>Batch dates &amp; session attendance records</li>
                      <li>Assignment, assessment, and project submissions</li>
                      <li>Certificate verification &amp; payment status</li>
                    </ul>
                  </div>

                  <div className="bg-white/60 border border-csl-gold/20 p-4 rounded-xl space-y-2">
                    <h3 className="font-bold text-csl-text text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Communication Information
                    </h3>
                    <ul className="text-xs space-y-1 pl-4 list-disc text-csl-muted">
                      <li>Website contact and enquiry forms</li>
                      <li>Email, WhatsApp, and phone communications</li>
                      <li>Customer support queries and student feedback</li>
                    </ul>
                  </div>

                  <div className="bg-white/60 border border-csl-gold/20 p-4 rounded-xl space-y-2">
                    <h3 className="font-bold text-csl-text text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span> Technical Information
                    </h3>
                    <ul className="text-xs space-y-1 pl-4 list-disc text-csl-muted">
                      <li>IP address, browser type, and operating system</li>
                      <li>Device information and screen specifications</li>
                      <li>Website pages visited, referral sources, and cookies</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. How We Collect Information */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">2.</span> How We Collect Information
                </h2>
                <p>We may collect information through:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 text-csl-text font-medium text-sm">
                  {[
                    'Website registration forms',
                    'Course & internship enrollment forms',
                    'Workshop registration portals',
                    'Secure payment gateways',
                    'WhatsApp & direct email inquiries',
                    'Support interactions & academic counseling',
                    'Cookies & website performance analytics'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-csl-gold shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3. Why We Use Personal Information */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">3.</span> Why We Use Personal Information
                </h2>
                <div className="space-y-3 pl-2">
                  <div className="p-3.5 bg-white/60 border border-csl-gold/20 rounded-xl">
                    <h3 className="font-bold text-csl-text text-sm mb-1">Service Delivery</h3>
                    <p className="text-xs">Registering learners, providing structured courses, delivering workshops, coordinating internships, managing learner accounts, and delivering educational material.</p>
                  </div>
                  <div className="p-3.5 bg-white/60 border border-csl-gold/20 rounded-xl">
                    <h3 className="font-bold text-csl-text text-sm mb-1">Administration</h3>
                    <p className="text-xs">Processing enrollment payments, issuing authentic completion certificates, scheduling batches, and providing student support.</p>
                  </div>
                  <div className="p-3.5 bg-white/60 border border-csl-gold/20 rounded-xl">
                    <h3 className="font-bold text-csl-text text-sm mb-1">Career Services</h3>
                    <p className="text-xs">Placement assistance, resume optimization, mock technical interview preparation, and connecting eligible candidates with authorized hiring partners.</p>
                  </div>
                </div>
              </section>

              {/* 4. Marketing Communications */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">4.</span> Marketing Communications
                </h2>
                <p>With appropriate permission or where permitted by law, we may send program announcements, upcoming workshops, curriculum additions, and educational resources via email, SMS, or WhatsApp.</p>
                <p className="text-xs italic">You may opt out of promotional communications at any time by contacting us or using the unsubscribe link.</p>
              </section>

              {/* 5. Legal Basis / Lawful Processing */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">5.</span> Legal Basis / Lawful Processing
                </h2>
                <p>Creator Space Lab processes personal data for lawful purposes in compliance with applicable Indian data protection frameworks, including the Digital Personal Data Protection (DPDP) Act and rules.</p>
              </section>

              {/* 6. Payment Information */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">6.</span> Payment Information
                </h2>
                <p>Payments are processed securely through certified third-party payment gateways. Creator Space Lab does not directly store sensitive credit card numbers or banking passwords.</p>
              </section>

              {/* 7. Third-Party Service Providers */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">7.</span> Third-Party Service Providers
                </h2>
                <p>We work with trusted service providers for cloud hosting, communication (e.g. WhatsApp, Email), CRM, and analytics. All providers operate under strict confidentiality agreements.</p>
              </section>

              {/* 8. Information Sharing */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">8.</span> Information Sharing
                </h2>
                <p>We do not sell personal information to third parties. Information is only shared with authorized partners, instructors, placement entities, or regulatory authorities where legally mandated.</p>
              </section>

              {/* 9. Placement Partners */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">9.</span> Placement Partners
                </h2>
                <p>For learners participating in placement drives, relevant resumes and project profiles are shared with hiring partners only with the student's consent for designated recruitment drives.</p>
              </section>

              {/* 10. Cookies & Analytics */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">10.</span> Cookies &amp; Analytics
                </h2>
                <p>Our website uses functional cookies to remember preferences and measure website performance. You can control cookie preferences through your individual browser settings.</p>
              </section>

              {/* 11. Data Security & Retention */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">11.</span> Data Security &amp; Retention
                </h2>
                <p>We implement technical and organizational security controls to safeguard data against unauthorized access, loss, or disclosure. Personal data is retained only as long as necessary for academic certification, legal compliance, and program administration.</p>
              </section>

              {/* 12. Your Privacy Rights */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">12.</span> Your Privacy Rights
                </h2>
                <p>Subject to applicable law, you may request access to, correction of, or deletion of your personal information, or withdraw previously granted consent, by contacting our grievance team.</p>
              </section>

              {/* 13. Children's Privacy */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">13.</span> Children's Privacy
                </h2>
                <p>Where programs are accessed by learners under 18 years of age, parental or guardian consent is obtained in compliance with applicable regulatory standards.</p>
              </section>

              {/* 14. Grievance & Contact */}
              <section className="space-y-4 pt-4 border-t border-csl-gold/20">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">14.</span> Grievance &amp; Privacy Contact
                </h2>
                <p>For privacy inquiries, correction requests, or grievance redressal, please contact:</p>
                <div className="bg-white/80 border border-csl-gold/30 rounded-2xl p-5 text-sm space-y-1.5 text-csl-text">
                  <div className="font-extrabold text-base text-csl-blue mb-1">Creator Space Lab — Privacy Officer</div>
                  <div><span className="font-bold text-csl-muted">Email:</span> hr@creatorspacelab.com</div>
                  <div><span className="font-bold text-csl-muted">Address:</span> No.48A, Rajiv Gandhi Salai (OMR), Karapakkam, Chennai – 600097, Tamil Nadu, India</div>
                </div>
              </section>

            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
