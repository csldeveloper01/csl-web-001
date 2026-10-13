interface CustomImportMetaEnv {
  readonly VITE_ONLINE_ASSESSMENT_URL?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_INTERNSHIP_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_GENERAL_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_COURSE_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_CONTACT_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: CustomImportMetaEnv;
}
