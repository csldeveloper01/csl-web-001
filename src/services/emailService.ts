import emailjs from '@emailjs/browser';

export interface InternshipEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  institution: string;
  degree: string;
  year: string;
  domain: string;
  duration: string;
  message?: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CourseCallbackPayload {
  courseName: string;
  name: string;
  phone: string;
  email: string;
  institution?: string;
  preferredContactMethod: 'WhatsApp' | 'Phone Call';
  message?: string;
}

export interface EmailJSResult {
  success: boolean;
  message: string;
}

function getEnvVars() {
  const env = (import.meta as any).env || {};
  return {
    serviceId: env.VITE_EMAILJS_SERVICE_ID || '',
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY || '',
    internshipTemplateId: env.VITE_EMAILJS_INTERNSHIP_TEMPLATE_ID || env.VITE_EMAILJS_TEMPLATE_ID || '',
    courseTemplateId: env.VITE_EMAILJS_COURSE_TEMPLATE_ID || env.VITE_EMAILJS_TEMPLATE_ID || '',
    contactTemplateId: env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || env.VITE_EMAILJS_TEMPLATE_ID || '',
  };
}

/**
 * Send Internship Enquiry via EmailJS SDK using emailjs.sendForm or emailjs.send
 */
export async function sendInternshipForm(
  formElement: HTMLFormElement | string
): Promise<EmailJSResult> {
  const { serviceId, publicKey, internshipTemplateId } = getEnvVars();

  // Initialize EmailJS SDK once (avoid double init)
  if (publicKey) {
    // EmailJS stores the user ID internally; check to prevent re‑initialisation
    if (!(emailjs as any).userID) {
      emailjs.init(publicKey);
    }
  } else {
    console.warn('EmailJS public key is missing.');
  }

  // In production, ensure required env vars are present
  if ((import.meta as any).env.PROD && (!serviceId || !publicKey || !internshipTemplateId)) {
    console.error('EmailJS configuration missing in production environment.');
    return { success: false, message: 'EmailJS not configured for production.' };
  }

  if (serviceId && internshipTemplateId && publicKey) {
    try {
      const response = await emailjs.sendForm(
        serviceId,
        internshipTemplateId,
        formElement,
        publicKey
      );

      if (response.status === 200 || response.text === 'OK') {
        return { success: true, message: 'Enquiry sent successfully!' };
      } else {
        return { success: false, message: `EmailJS Error (${response.status}): ${response.text}` };
      }
    } catch (err: any) {
      return { success: false, message: err?.text || err?.message || 'Failed to send enquiry via EmailJS.' };
    }
  }

  // Demo fallback mode if keys not set
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true, message: 'Enquiry sent successfully (Demo Mode)!' };
}

export async function sendInternshipEnquiry(
  payload: InternshipEnquiryPayload
): Promise<EmailJSResult> {
  const { serviceId, publicKey, internshipTemplateId } = getEnvVars();

  const templateParams = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    institution: payload.institution,
    degree: payload.degree,
    pursuing_year: payload.year,
    domain: payload.domain,
    duration: payload.duration,
    message: payload.message || 'N/A',
    subject: `Internship request form from ${payload.name}`,
    submission_time: new Date().toLocaleString(),
  };

  if (serviceId && internshipTemplateId && publicKey) {
    try {
      const response = await emailjs.send(
        serviceId,
        internshipTemplateId,
        templateParams,
        { publicKey }
      );

      if (response.status === 200 || response.text === 'OK') {
        return { success: true, message: 'Enquiry sent successfully!' };
      } else {
        return { success: false, message: `EmailJS Error (${response.status}): ${response.text}` };
      }
    } catch (err: any) {
      return { success: false, message: err?.text || err?.message || 'Failed to send enquiry via EmailJS.' };
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true, message: 'Enquiry sent successfully (Demo Mode)!' };
}

/**
 * Send Contact Message via EmailJS SDK
 */
export async function sendContactForm(
  formElement: HTMLFormElement | string
): Promise<EmailJSResult> {
  const { serviceId, publicKey, contactTemplateId } = getEnvVars();

  // Initialize EmailJS SDK once (avoid double init)
  if (publicKey) {
    if (!(emailjs as any).userID) {
      emailjs.init(publicKey);
    }
  } else {
    console.warn('EmailJS public key is missing.');
  }

  // Production guard
  if ((import.meta as any).env.PROD && (!serviceId || !publicKey || !contactTemplateId)) {
    console.error('EmailJS configuration missing in production environment.');
    return { success: false, message: 'EmailJS not configured for production.' };
  }

  if (serviceId && contactTemplateId && publicKey) {
    try {
      const response = await emailjs.sendForm(
        serviceId,
        contactTemplateId,
        formElement,
        publicKey
      );

      if (response.status === 200 || response.text === 'OK') {
        return { success: true, message: 'Message sent successfully!' };
      } else {
        return { success: false, message: `EmailJS Error (${response.status}): ${response.text}` };
      }
    } catch (err: any) {
      return { success: false, message: err?.text || err?.message || 'Failed to send message via EmailJS.' };
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true, message: 'Message sent successfully (Demo Mode)!' };
}

export async function sendContactMessage(
  payload: ContactMessagePayload
): Promise<EmailJSResult> {
  const { serviceId, publicKey, contactTemplateId } = getEnvVars();

  const templateParams = {
    name: payload.name,
    email: payload.email,
    subject: payload.subject ? `Contact Form: ${payload.subject}` : `Contact message from ${payload.name}`,
    message: payload.message,
    submission_time: new Date().toLocaleString(),
  };

  if (serviceId && contactTemplateId && publicKey) {
    try {
      const response = await emailjs.send(
        serviceId,
        contactTemplateId,
        templateParams,
        { publicKey }
      );

      if (response.status === 200 || response.text === 'OK') {
        return { success: true, message: 'Message sent successfully!' };
      } else {
        return { success: false, message: `EmailJS Error (${response.status}): ${response.text}` };
      }
    } catch (err: any) {
      return { success: false, message: err?.text || err?.message || 'Failed to send message via EmailJS.' };
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true, message: 'Message sent successfully (Demo Mode)!' };
}

/**
 * Send Course Callback Request via EmailJS SDK
 */
export async function sendCourseCallbackForm(
  formElement: HTMLFormElement | string
): Promise<EmailJSResult> {
  const { serviceId, publicKey, courseTemplateId } = getEnvVars();

  // Initialize EmailJS SDK once (avoid double init)
  if (publicKey) {
    if (!(emailjs as any).userID) {
      emailjs.init(publicKey);
    }
  } else {
    console.warn('EmailJS public key is missing.');
  }

  // Production guard
  if ((import.meta as any).env.PROD && (!serviceId || !publicKey || !courseTemplateId)) {
    console.error('EmailJS configuration missing in production environment.');
    return { success: false, message: 'EmailJS not configured for production.' };
  }

  if (serviceId && courseTemplateId && publicKey) {
    try {
      const response = await emailjs.sendForm(
        serviceId,
        courseTemplateId,
        formElement,
        publicKey
      );

      if (response.status === 200 || response.text === 'OK') {
        return { success: true, message: 'Callback requested successfully!' };
      } else {
        return { success: false, message: `EmailJS Error (${response.status}): ${response.text}` };
      }
    } catch (err: any) {
      return { success: false, message: err?.text || err?.message || 'Failed to request callback via EmailJS.' };
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true, message: 'Callback requested successfully (Demo Mode)!' };
}

export async function sendCourseCallback(
  payload: CourseCallbackPayload
): Promise<EmailJSResult> {
  const { serviceId, publicKey, courseTemplateId } = getEnvVars();

  const templateParams = {
    course: payload.courseName,
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    institution: payload.institution || 'N/A',
    preferred_contact_method: payload.preferredContactMethod,
    message: payload.message || 'N/A',
    subject: `Course callback request from ${payload.name}`,
    submission_time: new Date().toLocaleString(),
  };

  if (serviceId && courseTemplateId && publicKey) {
    try {
      const response = await emailjs.send(
        serviceId,
        courseTemplateId,
        templateParams,
        { publicKey }
      );

      if (response.status === 200 || response.text === 'OK') {
        return { success: true, message: 'Callback requested successfully!' };
      } else {
        return { success: false, message: `EmailJS Error (${response.status}): ${response.text}` };
      }
    } catch (err: any) {
      return { success: false, message: err?.text || err?.message || 'Failed to request callback via EmailJS.' };
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true, message: 'Callback requested successfully (Demo Mode)!' };
}
