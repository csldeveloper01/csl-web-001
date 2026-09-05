import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Instagram, 
  Youtube, 
  User, 
  FileText, 
  Edit3, 
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { YellowBox } from '../../effects/YellowBox';
import { sendContactMessage, sendContactForm, ContactMessagePayload, EmailJSResult } from '../../../services/emailService';

// @ts-ignore
import contactIllustration from '../../../../Elements/CONTACT/CONTACT.png';

export function ContactSection() {
  // Form State
  const [formData, setFormData] = useState<ContactMessagePayload>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submit state machine: idle -> submitting -> button-green-swipe -> submitted-green -> flowing-gradient -> success-complete | error
  type SubmitState = 'idle' | 'submitting' | 'button-green-swipe' | 'submitted-green' | 'flowing-gradient' | 'success-complete' | 'error';
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submittingDots, setSubmittingDots] = useState('.');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Submitting dots animation loop (Submitting -> Submitting.. -> Submitting...)
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

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
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

    // STATE 2 — SUBMITTING: Immediately quick fade button into neutral grey gradient (200ms)
    setSubmitState('submitting');
    setErrorMessage('');

    // Trigger EmailJS submission service via sendForm or fallback payload
    let result: EmailJSResult;
    if (formRef.current) {
      result = await sendContactForm(formRef.current);
    } else {
      result = await sendContactMessage(formData);
    }

    if (result.success) {
      // STATE 3 — SUCCESS: Reveal GREEN SUCCESS GRADIENT from LEFT -> RIGHT (550ms) + Soft Reflective Light Sweep
      setSubmitState('button-green-swipe');

      setTimeout(() => {
        // Button is full CSL Green with "Submitted" text
        setSubmitState('submitted-green');
      }, 550);

      setTimeout(() => {
        // Trigger soft borderless chromatic liquid light flow across form (~2.2s)
        setSubmitState('flowing-gradient');
      }, 1050);

      setTimeout(() => {
        // Display clean success confirmation state UI ("Message Sent")
        setSubmitState('success-complete');
      }, 3250);
    } else {
      setSubmitState('error');
      setErrorMessage(result.message || 'Something went wrong. Please try again.');
    }
  };

  const yellowBlocks = [
    { size: 'w-12 h-12', pos: 'top-[16%] left-[42%]', delay: 0.6, duration: 7 },
    { size: 'w-8 h-8', pos: 'top-[12%] right-[12%]', delay: 1.4, duration: 6 },
    { size: 'w-14 h-14', pos: 'bottom-[18%] left-[6%]', delay: 0.9, duration: 8 },
    { size: 'w-10 h-10', pos: 'bottom-[22%] right-[4%]', delay: 1.7, duration: 7.5 },
  ];

  const isFlowingGradient = submitState === 'flowing-gradient';

  return (
    <section 
      className="relative w-full py-10 md:py-16 flex items-center justify-center bg-csl-bg overflow-hidden mx-auto"
    >
      {/* Decorative Dotted Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Decorative Floating Yellow Blocks */}
      <div className="absolute inset-0 pointer-events-none z-10 2xl:max-w-[1600px] 2xl:mx-auto">
        {yellowBlocks.map((block, i) => (
          <YellowBox key={i} size={block.size} pos={block.pos} delay={block.delay} duration={block.duration} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
        
        {/* TOP ROW: HEADER & 3D ARTWORK (Mobile: order 1 & 2) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center mb-8 lg:mb-10">
          
          {/* Top Left: Header (order-1 on mobile) */}
          <div className="flex flex-col order-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-csl-blue font-bold tracking-widest text-xs uppercase">
                Contact Us
              </span>
              <div className="h-[2px] w-8 bg-csl-gold/60"></div>
            </div>
            
            <h2 
              className="text-3xl sm:text-4xl md:text-[3.2rem] font-extrabold text-csl-text tracking-tight leading-[1.08] mb-4" 
              data-distort="text"
            >
              Let’s build <br />
              <span className="text-csl-blue">something great</span> <br />
              together.
            </h2>
            
            <p className="text-csl-muted font-medium text-sm md:text-base leading-relaxed max-w-md">
              Have questions or want to collaborate? <br />
              We’d love to hear from you.
            </p>
          </div>

          {/* Top Right: 3D Artwork (order-2 on mobile) */}
          <div className="w-full flex items-center justify-center relative order-2">
            <motion.div
              className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -10, 0]
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Ambient voxel glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-csl-gold/20 via-transparent to-csl-blue/15 blur-3xl -z-10 rounded-full scale-90 pointer-events-none"></div>

              {/* Drifting decorative voxel particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2.5 h-2.5 bg-csl-gold/50 border border-csl-gold/70 backdrop-blur-sm"
                    animate={{
                      y: [0, -20, 0],
                      x: [0, (i % 2 === 0 ? 10 : -10), 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1.1, 0.8]
                    }}
                    transition={{
                      duration: 3.5 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                    style={{
                      left: `${18 + (i * 13)}%`,
                      top: `${12 + ((i * 16) % 70)}%`
                    }}
                  />
                ))}
              </div>

              {/* Main Artwork */}
              <img 
                src={contactIllustration} 
                alt="Contact 3D Map Pin" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,30,80,0.12)]"
              />
            </motion.div>
          </div>

        </div>

        {/* BOTTOM ROW: REORDERED ON MOBILE (Message Box first on mobile, then Contact Info) */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
          
          {/* Message Form Box (order-1 on mobile, right column on desktop) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#F8FBFF] to-[#EDF4FE] backdrop-blur-sm border border-csl-gold/30 rounded-3xl p-6 sm:p-7 md:p-9 shadow-sm flex flex-col w-full order-1 lg:order-2">
            <Edit3 
              className="absolute -right-4 -bottom-4 w-36 h-36 md:w-40 md:h-40 text-white/60 drop-shadow-sm pointer-events-none" 
              strokeWidth={2.5}
            />

            {/* Atmospheric Translucent Chromatic Liquid Light Flow (No boxes/shapes) */}
            {isFlowingGradient && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.45, 0.45, 0] }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-3xl"
              >
                {/* Oversized heavily blurred gradient field animating background-position & hue */}
                <motion.div
                  initial={{ backgroundPosition: '0% 100%', filter: 'blur(50px) hue-rotate(0deg)' }}
                  animate={{ backgroundPosition: '100% 0%', filter: 'blur(65px) hue-rotate(25deg)' }}
                  transition={{ duration: 2.2, ease: [0.2, 0.8, 0.2, 1] }}
                  className="w-full h-full"
                  style={{
                    background: `
                      radial-gradient(circle at 20% 80%, rgba(0,229,255,0.4) 0%, transparent 50%),
                      radial-gradient(circle at 40% 60%, rgba(123,44,191,0.35) 0%, transparent 55%),
                      radial-gradient(circle at 60% 40%, rgba(0,71,171,0.35) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255,183,3,0.3) 0%, transparent 60%),
                      linear-gradient(135deg, rgba(0,229,255,0.2) 0%, rgba(139,92,246,0.25) 35%, rgba(236,72,153,0.2) 70%, rgba(255,183,3,0.2) 100%)
                    `,
                    backgroundSize: '230% 230%'
                  }}
                />
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {submitState === 'success-complete' ? (
                /* Clean Post-Submission Success State UI */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-8 px-4 relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-csl-text mb-3 tracking-tight">
                    Message Sent!
                  </h3>

                  <p className="text-csl-muted font-medium text-sm sm:text-base max-w-md leading-relaxed mb-6">
                    Thank you, <span className="font-bold text-csl-blue">{formData.name}</span>. We have received your message and our team will get back to you shortly.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitState('idle');
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-3 rounded-xl bg-csl-blue text-white font-bold text-sm hover:bg-csl-deep-blue transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* Main Form UI */
                <div key="form-container" className="flex flex-col w-full relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-csl-text mb-5">
                    Send us a message
                  </h3>

                  <form 
                    ref={formRef}
                    onSubmit={handleSubmit} 
                    className={`flex flex-col gap-4 transition-all duration-700 ${
                      isFlowingGradient ? 'filter hue-rotate-[15deg] contrast-[1.02] opacity-[0.98]' : ''
                    }`}
                  >
                    {/* Error Banner if EmailJS fails */}
                    {submitState === 'error' && (
                      <div className="flex items-center gap-3 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-600 text-xs sm:text-sm font-semibold mb-1">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                      </div>
                    )}

                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col">
                        <div className="relative flex items-center">
                          <User className="w-4 h-4 text-csl-muted absolute left-4 pointer-events-none" />
                          <input 
                            type="text" 
                            name="name"
                            placeholder="Your Name *" 
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full bg-white/90 border ${
                              errors.name ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/25 focus:border-csl-blue focus:ring-csl-blue'
                            } rounded-xl py-3.5 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-1 transition-all`}
                          />
                        </div>
                        {errors.name && <span className="text-xs text-red-500 mt-1 font-semibold pl-1">{errors.name}</span>}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col">
                        <div className="relative flex items-center">
                          <Mail className="w-4 h-4 text-csl-muted absolute left-4 pointer-events-none" />
                          <input 
                            type="email" 
                            name="email"
                            placeholder="Your Email *" 
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full bg-white/90 border ${
                              errors.email ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/25 focus:border-csl-blue focus:ring-csl-blue'
                            } rounded-xl py-3.5 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-1 transition-all`}
                          />
                        </div>
                        {errors.email && <span className="text-xs text-red-500 mt-1 font-semibold pl-1">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Row 2: Subject */}
                    <div className="flex flex-col">
                      <div className="relative flex items-center">
                        <FileText className="w-4 h-4 text-csl-muted absolute left-4 pointer-events-none" />
                        <input 
                          type="text" 
                          name="subject"
                          placeholder="Subject *" 
                          value={formData.subject}
                          onChange={e => setFormData({ ...formData, subject: e.target.value })}
                          className={`w-full bg-white/90 border ${
                            errors.subject ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/25 focus:border-csl-blue focus:ring-csl-blue'
                          } rounded-xl py-3.5 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-1 transition-all`}
                        />
                      </div>
                      {errors.subject && <span className="text-xs text-red-500 mt-1 font-semibold pl-1">{errors.subject}</span>}
                    </div>

                    {/* Row 3: Message Textarea */}
                    <div className="flex flex-col">
                      <div className="relative flex items-start">
                        <Edit3 className="w-4 h-4 text-csl-muted absolute left-4 top-4 pointer-events-none" />
                        <textarea 
                          name="message"
                          rows={4} 
                          placeholder="Your Message *" 
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          className={`w-full bg-white/90 border ${
                            errors.message ? 'border-red-400 focus:ring-red-400' : 'border-csl-gold/25 focus:border-csl-blue focus:ring-csl-blue'
                          } rounded-xl py-3.5 pl-11 pr-4 text-xs md:text-sm text-csl-text placeholder:text-csl-muted/70 focus:outline-none focus:ring-1 transition-all resize-none`}
                        ></textarea>
                      </div>
                      {errors.message && <span className="text-xs text-red-500 mt-1 font-semibold pl-1">{errors.message}</span>}
                    </div>

                    {/* Row 4: Custom State-Based Animated Submit Button */}
                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={submitState !== 'idle' && submitState !== 'error'}
                        className="relative w-full h-[52px] rounded-xl font-bold text-sm md:text-base overflow-hidden shadow-md cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        {/* STATE 1 — NORMAL: CSL Normal Blue Gradient Layer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-csl-deep-blue to-csl-blue flex items-center justify-center text-white">
                          <div className="flex items-center gap-2">
                            <span>Send Message</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* STATE 2 — SUBMITTING: Neutral Grey Gradient Layer (Quick Fade 200ms, NO green, NO swipe) */}
                        {submitState === 'submitting' && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 flex items-center justify-center text-white z-10"
                          >
                            <span>Submitting{submittingDots}</span>
                          </motion.div>
                        )}

                        {/* STATE 3 — SUCCESS: Reveal Green Success Gradient (LEFT -> RIGHT over 550ms) + Soft Reflective Light Sweep */}
                        {(submitState === 'button-green-swipe' || submitState === 'submitted-green' || submitState === 'flowing-gradient') && (
                          <motion.div
                            initial={{ x: submitState === 'button-green-swipe' ? '-100%' : '0%' }}
                            animate={{ x: '0%' }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white z-20 shadow-lg shadow-emerald-600/20 overflow-hidden"
                          >
                            {/* Soft Reflective Light Sweep traveling across green surface */}
                            {submitState === 'button-green-swipe' && (
                              <motion.div
                                initial={{ x: '-120%' }}
                                animate={{ x: '220%' }}
                                transition={{ duration: 0.65, ease: 'easeInOut', delay: 0.1 }}
                                className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg] pointer-events-none"
                              />
                            )}

                            {/* Button Text = "Submitted" */}
                            <div className="flex items-center gap-2 relative z-30">
                              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                              <span>Submitted</span>
                            </div>
                          </motion.div>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Information Cards (order-2 on mobile, left column on desktop) */}
          <div className="flex flex-col gap-4 w-full order-2 lg:order-1">
            
            {/* Address Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-csl-deep-blue via-[#062B82] to-csl-blue backdrop-blur-sm border border-csl-gold/30 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-default">
              <MapPin 
                className="absolute -right-4 -bottom-4 w-28 h-28 text-white/15 pointer-events-none group-hover:scale-105 transition-transform duration-500" 
                strokeWidth={2.5}
              />
              
              <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-csl-deep-blue transition-all duration-300 relative z-10 shadow-sm">
                <MapPin className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div className="flex flex-col relative z-10">
                <h3 className="text-base font-bold text-white mb-1">
                  Contact Info
                </h3>
                <p className="text-xs font-medium text-white/85 leading-relaxed">
                  Creator Space Lab, <br />
                  Karapakkam, Chennai.
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div 
              className="relative overflow-hidden bg-gradient-to-r from-csl-deep-blue to-csl-blue backdrop-blur-sm border border-csl-gold/30 rounded-2xl p-5 flex flex-col gap-2 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <Phone 
                className="absolute -right-3 -bottom-3 w-24 h-24 text-white/15 pointer-events-none group-hover:scale-105 transition-transform duration-500" 
                strokeWidth={2.5}
              />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-4 h-4 stroke-[1.75]" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/80">
                  Phone Numbers
                </h4>
              </div>

              <div className="flex flex-col gap-1 pl-13 sm:pl-13 relative z-10">
                <a href="tel:+918056052806" className="text-sm md:text-base font-bold text-white hover:underline">
                  +91 80560 52806
                </a>
                <a href="tel:+919500802806" className="text-sm md:text-base font-bold text-white hover:underline">
                  +91 95008 02806
                </a>
                <a href="tel:+919680100306" className="text-sm md:text-base font-bold text-white hover:underline">
                  +91 96801 00306
                </a>
              </div>
            </div>

            {/* Email Card */}
            <a 
              href="mailto:hr.info@creatorspacelab.org.in"
              className="relative overflow-hidden bg-gradient-to-r from-csl-gold via-[#FFBA26] to-[#FFAE1A] backdrop-blur-sm border border-csl-gold/40 rounded-2xl p-5 flex items-center gap-4 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-pointer"
            >
              <Mail 
                className="absolute -right-3 -bottom-3 w-24 h-24 text-white/35 pointer-events-none group-hover:scale-105 transition-transform duration-500" 
                strokeWidth={2.5}
              />

              <div className="w-11 h-11 rounded-xl bg-white/30 border border-white/40 text-csl-text flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-csl-text transition-all duration-300 relative z-10 shadow-sm">
                <Mail className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-bold text-csl-text group-hover:underline relative z-10 break-all">
                hr.info@creatorspacelab.org.in
              </span>
            </a>

            {/* Social Connect Row */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-bold text-csl-text">
                Connect with us
              </span>
              <div className="flex items-center gap-2">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/80 border border-csl-gold/25 text-csl-text flex items-center justify-center hover:bg-csl-blue hover:text-white hover:border-csl-blue transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-white/80 border border-csl-gold/25 text-csl-text flex items-center justify-center hover:bg-csl-blue hover:text-white hover:border-csl-blue transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg bg-white/80 border border-csl-gold/25 text-csl-text flex items-center justify-center hover:bg-csl-blue hover:text-white hover:border-csl-blue transition-all duration-300"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
