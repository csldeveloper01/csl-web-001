export default function TermsPage() {
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
              Website Terms &amp; Conditions
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
                  Welcome to Creator Space Lab. These Terms &amp; Conditions (“Terms”) govern your access to and use of the Creator Space Lab website, courses, training programs, internships, workshops, career-support services, software products, technology services, and related services (“Services”).
                </p>
                <p className="leading-relaxed mb-3">
                  By accessing our website, creating an account, registering for a program, making a payment, or using our Services, you acknowledge that you have read, understood, and agreed to these Terms.
                </p>
                <p className="text-red-600/90 font-medium">
                  If you do not agree with these Terms, please do not use the website or enroll in our Services.
                </p>
              </div>

              {/* 1. About Creator Space Lab */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">1.</span> About Creator Space Lab
                </h2>
                <p>Creator Space Lab provides educational, professional, technology, and career-oriented services, which may include:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-2">
                  {[
                    'Professional training programs',
                    'Technical courses',
                    'Internship programs',
                    'Workshops and seminars',
                    'Project-based learning',
                    'Career and placement assistance',
                    'Industry-oriented training',
                    'Software and technology solutions',
                    'Corporate training',
                    'Other educational or technology-related services'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-csl-text font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-csl-gold shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-csl-muted pt-2 italic">
                  The specific features, duration, curriculum, schedule, pricing, and deliverables may vary between programs.
                </p>
              </section>

              {/* 2. Eligibility */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">2.</span> Eligibility
                </h2>
                <p>You must provide accurate information when registering for our Services.</p>
                <div className="space-y-3 pl-2">
                  <div className="bg-white/60 border border-csl-gold/20 p-4 rounded-xl">
                    <h3 className="font-bold text-csl-text mb-1">2.1 Adults</h3>
                    <p className="text-sm">Individuals aged 18 years or above may register and enroll independently.</p>
                  </div>
                  <div className="bg-white/60 border border-csl-gold/20 p-4 rounded-xl">
                    <h3 className="font-bold text-csl-text mb-1">2.2 Users Below 18</h3>
                    <p className="text-sm mb-1">Where a program is available to individuals below 18 years of age, enrollment may require the consent of a parent or legal guardian.</p>
                    <p className="text-sm">The parent or legal guardian may be responsible for ensuring that the minor complies with these Terms.</p>
                  </div>
                </div>
              </section>

              {/* 3. Website Usage */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">3.</span> Website Usage
                </h2>
                <p>You agree to use the website only for lawful purposes. You must not:</p>
                <ul className="space-y-2 pl-2">
                  {[
                    'Use the website for fraudulent purposes',
                    'Attempt unauthorized access to our systems',
                    'Interfere with website operations',
                    'Upload malicious software or harmful code',
                    'Copy or misuse website content',
                    'Impersonate another person',
                    'Use another person\'s account without authorization',
                    'Attempt to obtain confidential information belonging to another user',
                    'Use our Services for activities prohibited by applicable law'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-csl-text font-medium text-xs bg-csl-gold/10 p-3 rounded-lg border border-csl-gold/25">
                  Creator Space Lab may restrict or terminate access where misuse is identified.
                </p>
              </section>

              {/* 4. Account Registration */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">4.</span> Account Registration
                </h2>
                <p>Certain Services may require you to create an account or submit registration information. You agree to:</p>
                <ul className="space-y-2 pl-2">
                  {[
                    'Provide accurate and complete information',
                    'Keep your information updated',
                    'Maintain the confidentiality of your login credentials',
                    'Not share your account with another person',
                    'Notify us if you suspect unauthorized access'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-csl-text font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-csl-blue shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs">You are responsible for activities conducted through your account, subject to applicable law.</p>
              </section>

              {/* 5. Course and Program Enrollment */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">5.</span> Course and Program Enrollment
                </h2>
                <p>Enrollment becomes effective after the applicable registration requirements and payment requirements have been completed.</p>
                <p className="font-semibold text-csl-text">Program information may include:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pl-2 text-xs font-mono text-csl-text">
                  {[
                    'Program name', 'Duration', 'Batch dates', 'Training schedule', 'Curriculum',
                    'Mode of delivery', 'Project requirements', 'Certificate requirements', 'Access period'
                  ].map((item, i) => (
                    <div key={i} className="p-2 bg-white/70 border border-csl-gold/25 rounded-md">
                      {item}
                    </div>
                  ))}
                </div>
                <p>Creator Space Lab reserves the right to reasonably modify schedules, trainers, session timings, curriculum components, or delivery methods when necessary.</p>
                <p>Where material changes significantly affect a program, reasonable communication will be provided.</p>
              </section>

              {/* 6. Course Access */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">6.</span> Course Access
                </h2>
                <p>Course access may include live sessions, recordings, learning materials, assignments, projects, software/tools, community groups, or other resources depending on the selected program.</p>
                <p>Access may be limited to the duration specified for the particular program. Unless expressly stated otherwise:</p>
                <ul className="space-y-2 pl-2">
                  {[
                    'Course access is personal to the enrolled learner.',
                    'Login credentials must not be shared.',
                    'Paid recordings and learning materials must not be redistributed.',
                    'Course materials must not be uploaded to public platforms.',
                    'Course materials must not be sold or commercially redistributed.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-csl-gold font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 7. Batch Changes and Rescheduling */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">7.</span> Batch Changes and Rescheduling
                </h2>
                <p>Batch transfer or rescheduling may be permitted at the sole discretion of Creator Space Lab and subject to availability.</p>
                <p>Requests should be submitted through the official communication channel within the applicable notice period.</p>
                <p>Creator Space Lab may impose reasonable conditions or charges for repeated or late batch-transfer requests. Specific batch-transfer terms applicable to a program will be communicated at enrollment where applicable.</p>
              </section>

              {/* 8. Attendance and Participation */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">8.</span> Attendance and Participation
                </h2>
                <p>Students are expected to attend scheduled training sessions and actively participate in the program. Attendance requirements may apply to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 text-csl-text font-medium">
                  {['Internship completion', 'Course completion', 'Project completion', 'Certificate eligibility', 'Assessment eligibility'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-csl-gold shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-amber-800 bg-amber-500/10 p-3 rounded-lg border border-amber-500/25">
                  Failure to attend required sessions may affect eligibility for a certificate or completion status.
                </p>
              </section>

              {/* 9. Assignments and Projects */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">9.</span> Assignments and Projects
                </h2>
                <p>Students may be required to complete assignments, assessments, projects, or other activities. Students are responsible for:</p>
                <ul className="space-y-2 pl-2">
                  {[
                    'Completing their own work',
                    'Meeting submission deadlines',
                    'Following project guidelines',
                    'Avoiding plagiarism',
                    'Using third-party content lawfully',
                    'Maintaining academic and professional integrity'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-csl-text font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-csl-blue shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs">Creator Space Lab may reject copied, plagiarized, fraudulent, or substantially unauthorized work.</p>
              </section>

              {/* 10. Certificates */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">10.</span> Certificates
                </h2>
                <p>Where a certificate is offered, it may be issued only after the applicable completion requirements have been satisfied. Requirements may include:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 text-csl-text font-medium">
                  {[
                    'Minimum attendance',
                    'Completion of required assignments',
                    'Project completion',
                    'Assessment completion',
                    'Program completion',
                    'Payment of applicable fees'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs">Registration or payment alone does not automatically guarantee issuance of a certificate. Creator Space Lab may verify completion before issuing a certificate.</p>
              </section>

              {/* 11. Intellectual Property */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">11.</span> Intellectual Property
                </h2>
                <p>All intellectual property associated with Creator Space Lab's Services, including course materials, videos, training presentations, documents, notes, graphics, logos, website content, branding, software, source code, templates, training frameworks, and recorded sessions belongs to Creator Space Lab or the relevant third-party rights holder.</p>
                <p>Enrollment grants the student a limited, personal, non-exclusive, non-transferable right to use the applicable educational materials for personal learning purposes. It does not transfer ownership of the intellectual property to the student.</p>
              </section>

              {/* 12. Prohibited Use of Course Materials */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">12.</span> Prohibited Use of Course Materials
                </h2>
                <p>Students must not, without prior written permission:</p>
                <ul className="space-y-2 pl-2">
                  {[
                    'Record live sessions for redistribution',
                    'Share paid recordings',
                    'Upload course materials publicly',
                    'Sell course materials',
                    'Distribute login credentials',
                    'Reproduce proprietary training content',
                    'Create competing commercial content using proprietary materials',
                    'Reverse-engineer proprietary software',
                    'Remove copyright or ownership notices'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 13. Student-Submitted Content */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">13.</span> Student-Submitted Content
                </h2>
                <p>Students may submit assignments, projects, code, designs, presentations, feedback, reviews, and testimonials. Students remain responsible for ensuring that submitted content does not infringe the rights of another person.</p>
                <p>By submitting content for assessment or program administration, the student permits Creator Space Lab to access, review, store, and use that content for legitimate program-related purposes. Any public promotional use will be handled in accordance with applicable consent and privacy standards.</p>
              </section>

              {/* 14. Payments */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">14.</span> Payments
                </h2>
                <p>Program fees must be paid according to the pricing and payment schedule displayed or communicated during enrollment. Applicable taxes, including GST where applicable, may be charged in accordance with law.</p>
                <p>Failure to complete required payments may result in suspension of access, withholding of certificates, restriction from further sessions, or cancellation of enrollment.</p>
              </section>

              {/* 15. Promotional Offers */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">15.</span> Promotional Offers
                </h2>
                <p>Promotional discounts, coupons, early-bird offers, scholarships, referral benefits, or special pricing may be subject to specific conditions. Unless expressly stated otherwise, offers have limited validity, cannot be combined, and cannot be transferred.</p>
              </section>

              {/* 16. Placement and Career Assistance */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">16.</span> Placement and Career Assistance
                </h2>
                <p>Creator Space Lab may provide placement assistance, career guidance, interview preparation, resume assistance, industry connections, or hiring-related support.</p>
                <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-xl space-y-2">
                  <p className="font-bold text-csl-text text-sm">Please Note:</p>
                  <p className="text-xs">Placement assistance does not constitute a guarantee of employment, job offer, specific salary, or selection by a hiring company. Hiring decisions are made solely by individual employers based on their internal requirements.</p>
                </div>
              </section>

              {/* 17. Third-Party Services */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">17.</span> Third-Party Services
                </h2>
                <p>Our Services may use or link to third-party platforms, including payment providers, communication platforms, analytics services, software platforms, hosting providers, recruitment platforms, or other external services. Third-party services have their own terms and privacy policies.</p>
              </section>

              {/* 18. Disclaimer of Warranties */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">18.</span> Disclaimer of Warranties
                </h2>
                <p>We aim to provide accurate and useful educational and professional Services. However, we do not guarantee uninterrupted website availability, error-free content, or that every course will produce the identical result for every learner.</p>
              </section>

              {/* 19. Limitation of Liability */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">19.</span> Limitation of Liability
                </h2>
                <p>To the maximum extent permitted by applicable law, Creator Space Lab will not be liable for indirect, incidental, special, consequential, or loss-of-opportunity damages arising from the use of the website or Services.</p>
              </section>

              {/* 20. Suspension or Termination */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">20.</span> Suspension or Termination
                </h2>
                <p>Creator Space Lab may suspend or terminate access where reasonably necessary due to violation of these Terms, fraudulent activity, non-payment, unauthorized distribution of content, security violations, or abuse.</p>
              </section>

              {/* 21. Changes to Services */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">21.</span> Changes to Services
                </h2>
                <p>We may modify, discontinue, replace, or update parts of our Services when reasonably necessary, providing reasonable notice where appropriate.</p>
              </section>

              {/* 22. Changes to These Terms */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">22.</span> Changes to These Terms
                </h2>
                <p>Creator Space Lab may update these Terms from time to time. The updated version will be published on this website with a revised “Last Updated” date.</p>
              </section>

              {/* 23. Governing Law */}
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">23.</span> Governing Law
                </h2>
                <p>These Terms shall be governed by the laws of India. Subject to applicable law, disputes shall be subject to the jurisdiction of the competent courts in Chennai, Tamil Nadu, India.</p>
              </section>

              {/* 24. Contact */}
              <section className="space-y-4 pt-4 border-t border-csl-gold/20">
                <h2 className="text-xl sm:text-2xl font-bold text-csl-text tracking-tight flex items-center gap-2">
                  <span className="text-csl-blue">24.</span> Contact Information
                </h2>
                <p>For questions regarding these Terms:</p>
                <div className="bg-white/80 border border-csl-gold/30 rounded-2xl p-5 text-sm space-y-1.5 text-csl-text">
                  <div className="font-extrabold text-base text-csl-blue mb-1">Creator Space Lab</div>
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
