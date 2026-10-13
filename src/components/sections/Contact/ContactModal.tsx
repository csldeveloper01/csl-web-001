import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  FileText, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  X 
} from 'lucide-react';
import { openWhatsApp } from '../../../lib/whatsapp';
import { CustomDropdown } from '../../ui/CustomDropdown';

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  title?: string;
  subtitle?: string;
}

export function ContactModal({
  isOpen,
  onClose,
  initialSubject = 'Workshop',
  title = 'Host a Workshop at Your Institution',
  subtitle = 'Share your requirements and our academic partnership team will coordinate with your institution for schedules, curriculum, and hands-on lab setups.'
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    customSubject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  type SubmitState = 'idle' | 'submitting' | 'button-green-swipe' | 'submitted-green' | 'flowing-gradient' | 'success-complete' | 'error';
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submittingDots, setSubmittingDots] = useState('.');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Sync initialSubject when opened
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        subject: initialSubject || prev.subject || 'Workshop'
      }));
      setSubmitState('idle');
      setErrors({});
      setErrorMessage('');
    }
  }, [isOpen, initialSubject]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject.';
    }

    if (formData.subject === 'Other' && !formData.customSubject.trim()) {
      newErrors.customSubject = 'Please enter your subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
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

    const finalSubject =
      formData.subject === 'Other'
        ? formData.customSubject.trim()
        : formData.subject;

    const message = `Hello, I would like to enquire about Creator Space Lab workshops.

Name: ${formData.name}
Subject: ${finalSubject}
Email: ${formData.email}
Message: ${formData.message || 'N/A'}`;

    openWhatsApp(message);
    setSubmitState('success-complete');
  };

  const isFlowingGradient = submitState === 'flowing-gradient';

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-csl-deep-blue/60 backdrop-blur-md z-0"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-xl bg-csl-bg border border-csl-gold/30 rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-csl-gold/30 flex items-center justify-center text-csl-text hover:bg-csl-blue hover:text-white transition-all shadow-xs cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="text-xs font-bold text-csl-blue uppercase tracking-widest block mb-1">
                Workshop Enquiry
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-csl-text tracking-tight mb-2">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-csl-muted font-medium leading-relaxed">
                {subtitle}
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

                  <h4 className="text-2xl font-extrabold text-csl-text mb-3 tracking-tight">
                    Enquiry Sent Successfully ✓
                  </h4>

                  <p className="text-csl-muted font-medium text-sm max-w-md leading-relaxed mb-6">
                    Thanks for reaching out! Your workshop enquiry has been forwarded via WhatsApp. Our team will connect with your institution shortly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setSubmitState('idle');
                        setFormData({
                          name: '',
                          email: '',
                          subject: initialSubject,
                          customSubject: '',
                          message: '',
                        });
                      }}
                      className="px-6 py-3 rounded-xl bg-csl-blue text-white font-bold text-sm hover:bg-csl-deep-blue transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-xl bg-white border border-csl-gold/40 text-csl-text font-bold text-sm hover:bg-csl-bg transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Form UI */
                <form 
                  key="form-ui"
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className={`flex flex-col gap-4 transition-all duration-700 ${
                    isFlowingGradient ? 'filter hue-rotate-[15deg] contrast-[1.02] opacity-[0.98]' : ''
                  }`}
                >
                  {/* Error Banner */}
                  {submitState === 'error' && (
                    <div className="flex items-center gap-3 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 text-xs sm:text-sm font-semibold mb-1">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-csl-text uppercase tracking-wider mb-1.5">
                        Your Name <span className="text-red-500">*</span>
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
                            setFormData((prev) => ({ ...prev, name: value }));
                          }}
                          className={`w-full bg-white border ${
                            errors.name
                              ? 'border-red-400 focus:ring-red-400'
                              : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.name && <span className="text-xs text-red-500 mt-1 font-semibold pl-1">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-csl-text uppercase tracking-wider mb-1.5">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-csl-muted absolute left-4 pointer-events-none" />
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Your Email *" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-white border ${
                            errors.email ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.email && <span className="text-xs text-red-500 mt-1 font-semibold pl-1">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="flex flex-col">
                    <label className="text-[11px] font-bold text-csl-text uppercase tracking-wider mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <CustomDropdown
                      name="subject"
                      value={formData.subject}
                      onChange={(val) => {
                        setFormData((prev) => ({
                          ...prev,
                          subject: val,
                          customSubject: val === 'Other' ? prev.customSubject : '',
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          subject: '',
                          customSubject: '',
                        }));
                      }}
                      options={[
                        'Workshop',
                        'Internship',
                        'Courses',
                        'Other',
                      ]}
                      placeholder="Select Subject *"
                      icon={FileText}
                      error={errors.subject}
                    />
                    {errors.subject && (
                      <span className="text-xs text-red-500 mt-1 font-semibold pl-1">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Custom Subject (if Other) */}
                  {formData.subject === 'Other' && (
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold text-csl-text uppercase tracking-wider mb-1.5">
                        Specify Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <FileText className="w-4 h-4 text-csl-muted absolute left-4 pointer-events-none" />
                        <input
                          type="text"
                          name="customSubject"
                          placeholder="Enter your subject *"
                          value={formData.customSubject}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              customSubject: e.target.value,
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              customSubject: '',
                            }));
                          }}
                          className={`w-full bg-white border ${
                            errors.customSubject
                              ? 'border-red-400 focus:ring-red-400'
                              : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                          } rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.customSubject && (
                        <span className="text-xs text-red-500 mt-1 font-semibold pl-1">
                          {errors.customSubject}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Message Textarea */}
                  <div className="flex flex-col">
                    <label className="text-[11px] font-bold text-csl-text uppercase tracking-wider mb-1.5">
                      Message / Requirement Details <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      name="message"
                      rows={3}
                      placeholder="Tell us about your institution, preferred dates, participant count, or workshop domains of interest..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-white border ${
                        errors.message ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/30 focus:border-csl-blue focus:ring-csl-blue/20'
                      } rounded-xl py-3 px-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.message && <span className="text-xs text-red-500 mt-1 font-semibold pl-1">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitState === 'submitting'}
                      className="relative w-full h-[50px] rounded-xl font-bold text-sm sm:text-base overflow-hidden shadow-md cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {/* Normal Blue State */}
                      <div className="absolute inset-0 bg-gradient-to-r from-csl-deep-blue to-csl-blue flex items-center justify-center text-white">
                        <div className="flex items-center gap-2">
                          <span>Submit Workshop Enquiry</span>
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
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
