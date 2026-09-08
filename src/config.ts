// WEB3FORMS KEY Configuration
// To enable live form delivery:
// 1. Go to https://web3forms.com
// 2. Enter hello@shape9.agency
// 3. Copy the key from the email
// 4. Set VITE_WEB3FORMS_KEY in your environment or paste it below.

export const WEB3FORMS_KEY: string =
  (import.meta as any).env?.VITE_WEB3FORMS_KEY || 'PASTE_YOUR_WEB3FORMS_KEY_HERE';

export const FORM_IS_LIVE = Boolean(
  WEB3FORMS_KEY && WEB3FORMS_KEY !== 'PASTE_YOUR_WEB3FORMS_KEY_HERE',
);

export const CONTACT = {
  email: 'hello@shape9.agency',
  address: 'Hadžiabdinica 15, 71000 Sarajevo',
  country: 'Bosna i Hercegovina',
  phone: '', // deliberately empty, never invent one
  linkedin: 'https://www.linkedin.com/company/shape9agency',
};

export const COMPANY = {
  legalName: 'Shape9 d.o.o. Sarajevo',
  idNumber: '', // fill in, buyers check it
  vatNumber: '',
  foundedYear: 2015,
};

export const SITE_URL = 'https://shape9.agency';

// NOTE: GA4 sets cookies and legally requires a consent banner in the EU,
// which is a bad look for a company selling GDPR compliance.
// A cookieless tool (Plausible, Fathom, Simple Analytics) is the better choice.
export const ANALYTICS = {
  ga4Id: (import.meta as any).env?.VITE_GA4_ID || '',
  apolloId: (import.meta as any).env?.VITE_APOLLO_ID || '',
};
