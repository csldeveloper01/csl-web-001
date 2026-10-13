import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  MessageSquare 
} from 'lucide-react';
import { openWhatsApp } from '../../../lib/whatsapp';
import { CustomDropdown } from '../../ui/CustomDropdown';
import { coursesCatalog } from '../../../data/coursesData';

export interface CourseFormProps {
  initialCourseId?: string;
  context?: 'modal' | 'full-page';
  onClose?: () => void;
}

export function CourseEnquiryForm({
  initialCourseId,
  context = 'full-page',
  onClose
}: CourseFormProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || coursesCatalog[0]?.id || ''
  );

  const selectedCourse =
    coursesCatalog.find((item) => item.id === selectedCourseId) ?? coursesCatalog[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    institution: '',
    preferredContactMethod: 'WhatsApp' as 'WhatsApp' | 'Phone Call',
    message: ''
  });

  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [dotsIndex, setDotsIndex] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Sync initialCourseId when prop changes
  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId]);

  useEffect(() => {
    if (submitState !== 'submitting') return;

    const interval = setInterval(() => {
      setDotsIndex((prev) => (prev % 3) + 1);
    }, 300);

    return () => clearInterval(interval);
  }, [submitState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill out your Name, Phone Number, and Email Address.');
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      setErrorMessage('Name can contain only letters, spaces, apostrophes, and hyphens.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitState('submitting');

    const message = `Hello, I would like to enquire about a course at Creator Space Lab.
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Institution: ${formData.institution || 'N/A'}
Course: ${selectedCourse.title}
Preferred Contact: ${formData.preferredContactMethod}
Message: ${formData.message || 'N/A'}`;

    openWhatsApp(message);

    setSubmitState('success');
  };

  const isModal = context === 'modal';

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <span className="text-xs font-bold text-csl-blue uppercase tracking-widest block mb-1">
          Request a Callback
        </span>

        <h3 className="text-2xl font-extrabold text-csl-text tracking-tight mb-2">
          Course Enquiry Form
        </h3>

        <p className="text-xs text-csl-muted font-medium leading-relaxed">
          Leave your details and our academic counseling team will contact you via WhatsApp or phone call to discuss curriculum, schedules, batches, and fees.
        </p>
      </div>

      {/* Course Selection */}
      <div className="mb-5">
        <label className="text-[10px] font-extrabold text-csl-gold uppercase tracking-wider block mb-2">
          Selected Course <span className="text-red-500">*</span>
        </label>

        <CustomDropdown
          value={selectedCourseId}
          onChange={(val) => setSelectedCourseId(val)}
          options={coursesCatalog.map((item) => ({ value: item.id, label: item.title }))}
          placeholder="Select Course"
          rounded="rounded-2xl"
        />

        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[11px] text-csl-muted font-medium">
            Choose the course you are interested in
          </span>

          {selectedCourse && (
            <span className="text-[10px] font-bold text-csl-blue bg-csl-blue/10 px-2.5 py-1 rounded-lg">
              {selectedCourse.format}
            </span>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-xs font-bold">
          {errorMessage}
        </div>
      )}

      {submitState === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-8 text-center flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-extrabold text-csl-text mb-2">
            Callback Requested ✓
          </h4>

          <p className="text-xs text-csl-muted font-medium leading-relaxed max-w-xs mb-6">
            Thanks, <span className="font-bold text-csl-blue">{formData.name}</span>! We've received your request for <span className="font-bold text-csl-blue">{selectedCourse.title}</span>. Our team will contact you shortly via {formData.preferredContactMethod}.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmitState('idle');
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  institution: '',
                  preferredContactMethod: 'WhatsApp',
                  message: ''
                });
              }}
              className="px-6 py-2.5 rounded-xl bg-csl-blue text-white font-bold text-xs shadow-md hover:bg-csl-deep-blue transition-colors cursor-pointer"
            >
              Submit Another Request
            </button>
            {isModal && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-white border border-csl-gold/40 text-csl-text font-bold text-xs hover:bg-csl-bg transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="hidden"
            name="course"
            value={selectedCourse.title}
          />

          <input
            type="hidden"
            name="preferred_contact_method"
            value={formData.preferredContactMethod}
          />

          {/* Name */}
          <div>
            <label className="text-xs font-bold text-csl-text block mb-1">
              Full Name *
            </label>

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
                setFormData({ ...formData, name: value });
              }}
              placeholder="Enter your name"
              className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-bold text-csl-text block mb-1">
              Phone Number *
            </label>

            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              maxLength={10}
              inputMode="numeric"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setFormData({ ...formData, phone: value });
              }}
              placeholder="Enter your 10-digit phone number"
              className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-csl-text block mb-1">
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email address"
              className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
            />
          </div>

          {/* Institution */}
          <div>
            <label className="text-xs font-bold text-csl-text block mb-1">
              Institution / College (Optional)
            </label>

            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={(e) =>
                setFormData({ ...formData, institution: e.target.value })
              }
              placeholder="Enter your institution"
              className="w-full bg-white border border-csl-gold/30 rounded-xl px-4 py-2.5 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue"
            />
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="text-xs font-bold text-csl-text block mb-1.5">
              Preferred Contact Method
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    preferredContactMethod: 'WhatsApp'
                  })
                }
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs border cursor-pointer transition-all ${
                  formData.preferredContactMethod === 'WhatsApp'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                    : 'bg-white border-csl-gold/30 text-csl-muted'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                WhatsApp
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    preferredContactMethod: 'Phone Call'
                  })
                }
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs border cursor-pointer transition-all ${
                  formData.preferredContactMethod === 'Phone Call'
                    ? 'border-csl-blue text-csl-blue shadow-xs'
                    : 'bg-white border-csl-gold/30 text-csl-muted'
                }`}
                style={
                  formData.preferredContactMethod === 'Phone Call'
                    ? { backgroundColor: 'rgba(20, 85, 184, 0.10)' }
                    : undefined
                }
              >
                <Phone className="w-4 h-4 text-csl-blue" />
                Phone Call
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-xs font-bold text-csl-text block mb-1">
              Message (Optional)
            </label>

            <textarea
              name="message"
              rows={2}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Anything you'd like to ask about the course?"
              className="w-full bg-white border border-csl-gold/30 rounded-xl p-3 text-xs text-csl-text font-medium focus:outline-none focus:border-csl-blue resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitState === 'submitting'}
            className={`w-full mt-2 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              submitState === 'submitting'
                ? 'bg-gray-600 text-gray-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-csl-deep-blue to-csl-blue text-white hover:shadow-lg cursor-pointer'
            }`}
          >
            {submitState === 'submitting' ? (
              <span>Requesting Callback{'.'.repeat(dotsIndex)}</span>
            ) : (
              <>
                Request Callback
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default CourseEnquiryForm;
