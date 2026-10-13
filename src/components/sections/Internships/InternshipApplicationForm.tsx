import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { openWhatsApp } from '../../../lib/whatsapp';
import { CustomDropdown } from '../../ui/CustomDropdown';

export interface InternshipFormProps {
  initialDomain?: string;
  context?: 'modal' | 'full-page';
  onClose?: () => void;
}

export const INTERNSHIP_DOMAINS = [
  'Artificial Intelligence & Machine Learning Engineering',
  'Generative AI & Prompt Engineering',
  'Agentic AI & Intelligent Automation',
  'Full Stack Web & Mobile Application Development',
  'DevOps & Cloud Engineering',
  'Software Testing & QA Automation',
  'UI/UX Product Design',
  'Data Analytics & Business Intelligence',
];

export const DURATION_OPTIONS = [
  '15 Days',
  '30 Days',
  'Flexible / Open to Discussion',
];

export const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Final Year',
  'Graduate',
  'Postgraduate',
];

export function InternshipApplicationForm({
  initialDomain = '',
  context = 'full-page',
  onClose
}: InternshipFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    degree: '',
    year: '',
    domain: initialDomain,
    duration: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  type SubmitState = 'idle' | 'submitting' | 'button-green-swipe' | 'submitted-green' | 'success-complete' | 'error';
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submittingDots, setSubmittingDots] = useState('.');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Sync initialDomain when changed (supports exact match or partial match from cards)
  useEffect(() => {
    if (initialDomain) {
      const matched = INTERNSHIP_DOMAINS.find(d => 
        d.toLowerCase().includes(initialDomain.toLowerCase()) || 
        initialDomain.toLowerCase().includes(d.toLowerCase())
      );
      setFormData(prev => ({
        ...prev,
        domain: matched || initialDomain
      }));
    } else if (!formData.domain && INTERNSHIP_DOMAINS.length > 0) {
      setFormData(prev => ({
        ...prev,
        domain: prev.domain || INTERNSHIP_DOMAINS[0]
      }));
    }
  }, [initialDomain]);

  // Submitting dots animation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (submitState === 'submitting') {
      interval = setInterval(() => {
        setSubmittingDots(prev => (prev === '...' ? '.' : prev + '.'));
      }, 350);
    }
    return () => clearInterval(interval);
  }, [submitState]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can contain only letters, spaces, apostrophes, and hyphens.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution name is required.';
    }

    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree/program is required.';
    }

    if (!formData.year) {
      newErrors.year = 'Please select your current year.';
    }

    if (!formData.domain) {
      newErrors.domain = 'Please select a domain.';
    }

    if (!formData.duration) {
      newErrors.duration = 'Please select a duration.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitState('submitting');
    setErrorMessage('');

    const message = `Hello, I would like to enquire about an internship at Creator Space Lab.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Institution: ${formData.institution}
Degree: ${formData.degree}
Current Year: ${formData.year}
Interested Domain: ${formData.domain}
Duration: ${formData.duration}
Message: ${formData.message || 'N/A'}`;

    openWhatsApp(message);

    setSubmitState('button-green-swipe');
    setTimeout(() => {
      setSubmitState('submitted-green');
    }, 550);

    setTimeout(() => {
      setSubmitState('success-complete');
    }, 1300);
  };

  const isModal = context === 'modal';

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <span className="text-xs font-bold text-csl-blue uppercase tracking-widest block mb-1">
          Availability Enquiry
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-csl-text tracking-tight mb-2">
          Internship Application Form
        </h3>
        <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed">
          Tell us about your background and interests. Our academic team will connect via WhatsApp regarding open internship batches.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitState === 'success-complete' ? (
          /* Success State UI */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-8 px-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h4 className="text-2xl sm:text-3xl font-extrabold text-csl-text mb-3 tracking-tight">
              Enquiry Sent Successfully ✓
            </h4>

            <p className="text-csl-muted font-medium text-sm sm:text-base max-w-md leading-relaxed mb-6">
              Thanks for reaching out, <span className="font-bold text-csl-blue">{formData.name}</span>! Our team will review your details and get back to you regarding available internship opportunities for <span className="font-bold text-csl-blue">{formData.domain}</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmitState('idle');
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    institution: '',
                    degree: '',
                    year: '',
                    domain: initialDomain || INTERNSHIP_DOMAINS[0],
                    duration: '',
                    message: '',
                  });
                }}
                className="px-6 py-3 rounded-xl bg-csl-blue text-white font-bold text-sm hover:bg-csl-deep-blue transition-colors cursor-pointer"
              >
                Send Another Enquiry
              </button>
              {isModal && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-white border border-csl-gold/40 text-csl-text font-bold text-sm hover:bg-csl-bg transition-colors cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Form UI */
          <form 
            key="form-ui" 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="flex flex-col gap-5 w-full"
          >
            {/* Error Banner */}
            {submitState === 'error' && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 text-xs sm:text-sm font-semibold">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
              </div>
            )}

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e => {
                    const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
                    setFormData({ ...formData, name: value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                  } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.name && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.name}</span>}
              </div>

              {/* Email Address */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={e => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                  } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.email && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</span>}
              </div>
            </div>

            {/* Row 2: Phone Number & Institution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit phone number"
                  value={formData.phone}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, phone: value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                  } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.phone && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</span>}
              </div>

              {/* Institution */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                  Institution / College <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  placeholder="Enter your college or institution"
                  value={formData.institution}
                  onChange={e => {
                    setFormData({ ...formData, institution: e.target.value });
                    if (errors.institution) setErrors({ ...errors, institution: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.institution ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                  } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.institution && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.institution}</span>}
              </div>
            </div>

            {/* Row 3: Degree & Current Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Degree */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                  Degree / Program <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  placeholder="e.g. B.Sc CS, BCA, B.Tech, MCA"
                  value={formData.degree}
                  onChange={e => {
                    setFormData({ ...formData, degree: e.target.value });
                    if (errors.degree) setErrors({ ...errors, degree: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white border ${
                    errors.degree ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                  } text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.degree && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.degree}</span>}
              </div>

              {/* Current Year Dropdown */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                  Current Year <span className="text-red-500">*</span>
                </label>
                <CustomDropdown
                  name="year"
                  value={formData.year}
                  onChange={(val) => {
                    setFormData(prev => ({ ...prev, year: val }));
                    setErrors(prev => ({ ...prev, year: '' }));
                  }}
                  options={YEAR_OPTIONS}
                  placeholder="Select Current Year"
                  error={errors.year}
                />
                {errors.year && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.year}</span>}
              </div>
            </div>

            {/* Row 4: Interested Domain & Preferred Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Domain Dropdown */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                  Interested Domain <span className="text-red-500">*</span>
                </label>
                <CustomDropdown
                  name="domain"
                  value={formData.domain}
                  onChange={(val) => {
                    setFormData(prev => ({ ...prev, domain: val }));
                    setErrors(prev => ({ ...prev, domain: '' }));
                  }}
                  options={INTERNSHIP_DOMAINS}
                  placeholder="Select Domain"
                  error={errors.domain}
                />
                {errors.domain && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.domain}</span>}
              </div>

              {/* Duration Dropdown */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                  Preferred Duration <span className="text-red-500">*</span>
                </label>
                <CustomDropdown
                  name="duration"
                  value={formData.duration}
                  onChange={(val) => {
                    setFormData(prev => ({ ...prev, duration: val }));
                    setErrors(prev => ({ ...prev, duration: '' }));
                  }}
                  options={DURATION_OPTIONS}
                  placeholder="Select Duration"
                  error={errors.duration}
                />
                {errors.duration && <span className="text-xs text-red-500 mt-1 font-semibold">{errors.duration}</span>}
              </div>
            </div>

            {/* Message (Optional) */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5">
                Message / Internship Requirement <span className="text-csl-muted font-normal lowercase">(optional)</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Tell us about your learning goals, preferred mode (online/offline), or specific technologies..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-csl-gold/30 focus:border-csl-blue focus:ring-2 focus:ring-csl-blue/20 text-sm font-medium text-csl-text placeholder:text-csl-muted/60 focus:outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="relative w-full h-[52px] rounded-xl font-bold text-sm sm:text-base overflow-hidden shadow-md cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {/* Normal State */}
                <div className="absolute inset-0 bg-gradient-to-r from-csl-deep-blue to-csl-blue flex items-center justify-center text-white">
                  <div className="flex items-center gap-2">
                    <span>Send Internship Enquiry</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Submitting State */}
                {submitState === 'submitting' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 flex items-center justify-center text-white z-10"
                  >
                    <span>Submitting{submittingDots}</span>
                  </motion.div>
                )}

                {/* Success Green State */}
                {(submitState === 'button-green-swipe' || submitState === 'submitted-green') && (
                  <motion.div
                    initial={{ x: submitState === 'button-green-swipe' ? '-100%' : '0%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white z-20 shadow-lg shadow-emerald-600/20"
                  >
                    <div className="flex items-center gap-2 relative z-30">
                      <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                      <span>Submitted</span>
                    </div>
                  </motion.div>
                )}
              </button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InternshipApplicationForm;
