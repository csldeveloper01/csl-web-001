import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Edit3, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { openWhatsApp } from '../../../lib/whatsapp';
import { CustomDropdown } from '../../ui/CustomDropdown';

export interface CareerFormProps {
  initialPosition?: string;
  positions: { value: string; label: string }[];
  context?: 'modal' | 'full-page';
  onSubmitted?: () => void;
  onClose?: () => void;
}

export function CareerApplicationForm({
  initialPosition = '',
  positions,
  context = 'full-page',
  onClose
}: CareerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: initialPosition,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  type SubmitState = 'idle' | 'submitting' | 'submitted-green' | 'success-complete' | 'error';
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submittingDots, setSubmittingDots] = useState('.');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Sync initialPosition if changed
  useEffect(() => {
    if (initialPosition) {
      setFormData(prev => ({
        ...prev,
        position: initialPosition
      }));
    }
  }, [initialPosition]);

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

    if (!formData.position.trim()) {
      newErrors.position = 'Please select a position.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage('Please correct the highlighted errors before submitting.');
      return;
    }

    setSubmitState('submitting');
    setErrorMessage('');

    const message = `Hello, I would like to apply for a role at Creator Space Lab.

Position: ${formData.position}
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Message: ${formData.message || 'N/A'}`;

    openWhatsApp(message);

    setTimeout(() => {
      setSubmitState('submitted-green');
    }, 450);

    setTimeout(() => {
      setSubmitState('success-complete');
    }, 1200);
  };

  const isModal = context === 'modal';

  return (
    <div className="w-full">
      {/* Top Header of the form container */}
      <div className="mb-6 pb-3 border-b border-csl-gold/20 flex items-center justify-between flex-wrap gap-2 mr-4">
        <div>
          <span className="text-[11px] font-bold text-csl-blue uppercase tracking-widest block mb-0.5">
            CSL Direct Recruitment
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-csl-text tracking-tight">
            Application Form
          </h3>
        </div>

        {formData.position && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-csl-blue/10 text-csl-blue border border-csl-blue/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{formData.position}</span>
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {submitState === 'success-complete' ? (
          /* Success Screen */
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center py-8 px-2"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h4 className="text-2xl sm:text-3xl font-extrabold text-csl-text mb-3 tracking-tight">
              Application Initiated!
            </h4>

            <p className="text-csl-muted font-medium text-sm sm:text-base max-w-md leading-relaxed mb-6">
              Thank you, <span className="font-bold text-csl-blue">{formData.name}</span>. Your application for <span className="font-bold text-csl-blue">{formData.position}</span> has been forwarded to our recruitment team via WhatsApp.
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
                    position: initialPosition || (positions[0]?.value ?? ''),
                    message: '',
                  });
                }}
                className="px-6 py-3 rounded-xl bg-csl-blue text-white font-bold text-sm hover:bg-csl-deep-blue transition-colors cursor-pointer"
              >
                Submit Another Application
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
          /* Form Elements */
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errorMessage && (
              <div className="flex items-center gap-3 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-xs sm:text-sm font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Position Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5 pl-1">
                Select <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                name="position"
                value={formData.position}
                onChange={(val) => {
                  setFormData(prev => ({ ...prev, position: val }));
                  setErrors(prev => {
                    const rest = { ...prev };
                    delete rest.position;
                    return rest;
                  });
                }}
                options={positions}
                placeholder="Select"
                icon={Briefcase}
                error={errors.position}
              />
              {errors.position && (
                <span className="text-xs text-red-500 mt-1 font-semibold pl-1">
                  {errors.position}
                </span>
              )}
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5 pl-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-csl-muted absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
                      setFormData(prev => ({ ...prev, name: value }));
                      if (errors.name) {
                        setErrors(prev => {
                          const rest = { ...prev };
                          delete rest.name;
                          return rest;
                        });
                      }
                    }}
                    className={`w-full bg-white border ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                    } rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-2 transition-all`}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-red-500 mt-1 font-semibold pl-1">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Phone Field */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5 pl-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-csl-muted absolute left-4 pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit Phone Number *"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData(prev => ({ ...prev, phone: value }));
                      if (errors.phone) {
                        setErrors(prev => {
                          const rest = { ...prev };
                          delete rest.phone;
                          return rest;
                        });
                      }
                    }}
                    className={`w-full bg-white border ${
                      errors.phone
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                    } rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-2 transition-all`}
                  />
                </div>
                {errors.phone && (
                  <span className="text-xs text-red-500 mt-1 font-semibold pl-1">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5 pl-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-csl-muted absolute left-4 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com *"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) {
                      setErrors(prev => {
                        const rest = { ...prev };
                        delete rest.email;
                        return rest;
                      });
                    }
                  }}
                  className={`w-full bg-white border ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                  } rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 font-semibold pl-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Message / Cover Note */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-csl-text uppercase tracking-wider mb-1.5 pl-1">
                Message / Notes (Optional)
              </label>
              <div className="relative flex items-start">
                <Edit3 className="w-4 h-4 text-csl-muted absolute left-4 top-4 pointer-events-none" />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Brief summary of your background, link to resume/portfolio..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-white border border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20 rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-2 transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="relative w-full h-[52px] rounded-xl font-bold text-sm md:text-base overflow-hidden shadow-md cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-80"
              >
                {/* Normal State */}
                <div className="absolute inset-0 bg-gradient-to-r from-csl-deep-blue to-csl-blue flex items-center justify-center text-white">
                  <div className="flex items-center gap-2">
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
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

                {/* Submitted Green State */}
                {submitState === 'submitted-green' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white z-20"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                      <span>Submitted!</span>
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
