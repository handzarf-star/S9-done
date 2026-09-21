import React, { useState, useId, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, Rocket, Handshake, Users, LifeBuoy, Calendar, ChevronDown } from 'lucide-react';
import { WEB3FORMS_KEY, FORM_IS_LIVE, CONTACT } from '../config';

interface ContactFormProps {
  productChip?: string;
}

type InquiryCategory = 'project' | 'partnership' | 'career' | 'support';
type FormStatus = 'idle' | 'sending' | 'sent' | 'error' | 'mailto';

interface CategoryOption {
  id: InquiryCategory;
  titleBs: string;
  titleEn: string;
  descBs: string;
  descEn: string;
  icon: React.FC<{ className?: string }>;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'project',
    titleBs: 'Započnite projekat',
    titleEn: 'Start a Project',
    descBs: 'Imate ideju? Hajde da razgovaramo kako je možemo pretvoriti u stvarnost.',
    descEn: 'Have an idea? Let\'s discuss how we can help bring it to life.',
    icon: Rocket,
  },
  {
    id: 'partnership',
    titleBs: 'Partnerstvo',
    titleEn: 'Partnership',
    descBs: 'Zainteresovani za saradnju? Istražimo mogućnosti zajedničkog rasta.',
    descEn: 'Interested in partnering with us? We\'d love to explore opportunities.',
    icon: Handshake,
  },
  {
    id: 'career',
    titleBs: 'Karijera i tim',
    titleEn: 'Career Inquiry',
    descBs: 'Želite postati dio našeg tima? Pošaljite nam svoj CV i portfolio.',
    descEn: 'Looking to join our team? Send us your resume and portfolio.',
    icon: Users,
  },
  {
    id: 'support',
    titleBs: 'Podrška',
    titleEn: 'Support',
    descBs: 'Već sarađujemo? Zatražite brzu pomoć za Vaš aktuelni projekat ili servis.',
    descEn: 'Existing client? Get help with your current project or service.',
    icon: LifeBuoy,
  },
];

export const ContactForm: React.FC<ContactFormProps> = ({ productChip }) => {
  const [selectedCategory, setSelectedCategory] = useState<InquiryCategory>('project');

  /* Everywhere else on this site both languages are in the DOM and CSS hides
     one. That cannot work inside <option>: its text is not styleable, so a
     span would print both labels into the same line. The language therefore
     has to be read in JavaScript, and it has to react, because the toggle
     only flips an attribute on <html>. */
  const [uiLang, setUiLang] = useState<'bs' | 'en'>(
    () => (typeof document !== 'undefined' && document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'bs'),
  );
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setUiLang(root.getAttribute('data-lang') === 'en' ? 'en' : 'bs');
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ['data-lang'] });
    return () => obs.disconnect();
  }, []);

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategory);
  const [problem, setProblem] = useState('');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [botCheck, setBotCheck] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const problemId = useId();
  const companyId = useId();
  const contactId = useId();
  const botCheckId = useId();

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const triggerMeetingModal = () => {
    window.dispatchEvent(new CustomEvent('open-meeting-modal'));
  };

  const buildMessage = (currentLang: string) => {
    const categoryLabel = currentLang === 'en' ? currentCategoryObj.titleEn : currentCategoryObj.titleBs;
    return [
      `Tip upita: ${categoryLabel}`,
      `Detalji / Poruka: ${problem}`,
      `Firma / Ime: ${company}`,
      `Kontakt (Email/Tel): ${contact}`,
      `Proizvod / Kontekst: ${productChip || 'Shape9 općenito'}`,
      `Stranica: ${window.location.href}`,
      `Jezik: ${currentLang}`,
    ].join('\n\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (botCheck) {
      setStatus('sent');
      return;
    }

    if (!problem.trim() || !company.trim() || !contact.trim()) {
      setStatus('error');
      setErrorMessage('validation');
      return;
    }

    const currentLang = document.documentElement.getAttribute('data-lang') || 'bs';
    const categoryLabel = currentLang === 'en' ? currentCategoryObj.titleEn : currentCategoryObj.titleBs;
    const messageBody = buildMessage(currentLang);
    const subjectLine = `[${categoryLabel}] Upit: ${company.trim()} (${productChip || 'Shape9'})`;

    if (!FORM_IS_LIVE) {
      const mailtoUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        subjectLine
      )}&body=${encodeURIComponent(messageBody)}`;
      window.location.href = mailtoUrl;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const isEmail = contact.includes('@');
      const payload: Record<string, any> = {
        access_key: WEB3FORMS_KEY,
        subject: subjectLine,
        from_name: company.trim(),
        message: messageBody,
        category: categoryLabel,
        problem: problem.trim(),
        company: company.trim(),
        contact: contact.trim(),
        product: productChip || 'General',
        page: window.location.href,
        lang: currentLang,
      };

      if (isEmail) {
        payload.email = contact.trim();
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('sent');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('network');
    }
  };

  // No mx-auto here either, same reason as the Accordion: the caller
  // wraps this in .section-body now and decides where it sits.
  return (
    <div className="w-full max-w-3xl">
      <div className="s9-card p-6 sm:p-12 relative rounded-3xl">
        {productChip && (
          <div className="mb-6 flex justify-center">
            <div className="s9-badge text-xs font-semibold text-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.08)] border border-[rgba(var(--cyan-rgb),0.2)]">
              <span className="l-bs">Kontekst: {productChip}</span>
              <span className="l-en">Context: {productChip}</span>
            </div>
          </div>
        )}

        {/* The enquiry type was four cards in a two column grid: eight
            lines of copy and 260px of height to pick one of four things,
            and on a phone it stacked into four full width blocks the
            visitor had to scroll past before reaching the first field.
            It is a select now, the same control as every other field in
            this form, and the chosen option's explanation stays visible
            underneath so nothing that was written is lost. */}
        <div className="mb-8">
          <label
            htmlFor="inquiry-type"
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2"
          >
            <span className="l-bs">Odaberite vrstu upita</span>
            <span className="l-en">Select Inquiry Type</span>
          </label>

          <div className="relative">
            <select
              id="inquiry-type"
              name="inquiry-type"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as InquiryCategory)}
              /* `appearance: none` so the native arrow does not sit next to
                 the one drawn below it, which is what makes a select look
                 like a select on one platform and like two on another. */
              className="s9-select cursor-pointer appearance-none pr-11"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {uiLang === 'en' ? cat.titleEn : cat.titleBs}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
            />
          </div>

          {activeCategory && (
            <p className="mt-2.5 flex items-start gap-2 text-xs leading-relaxed text-[var(--muted)]">
              <activeCategory.icon
                aria-hidden="true"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cyan)]"
              />
              <span>
                <span className="l-bs">{activeCategory.descBs}</span>
                <span className="l-en">{activeCategory.descEn}</span>
              </span>
            </p>
          )}
        </div>

        {status === 'sent' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[rgba(var(--cyan-rgb),0.15)] text-[var(--cyan)] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--ink)]">
              <span className="l-bs">Uspješno poslano</span>
              <span className="l-en">Successfully Received</span>
            </h3>
            <p className="text-sm sm:text-base text-[var(--body)] max-w-md mx-auto leading-relaxed">
              <span className="l-bs">
                Hvala Vam na poruci. Ako je hitno, pišite direktno na {CONTACT.email}.
              </span>
              <span className="l-en">
                Thank you for your message. If urgent, please email {CONTACT.email} directly.
              </span>
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setProblem('');
                setCompany('');
                setContact('');
              }}
              className="btn-ghost mt-4 px-5 py-2 text-xs font-semibold uppercase tracking-wider focus-ring cursor-pointer"
            >
              <span className="l-bs">Pošaljite novu poruku</span>
              <span className="l-en">Send another enquiry</span>
            </button>
          </div>
        )}

        {status === 'mailto' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[rgba(var(--cyan-rgb),0.15)] text-[var(--cyan)] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--ink)]">
              <span className="l-bs">Otvorili smo Vaš email klijent</span>
              <span className="l-en">We opened your mail client</span>
            </h3>
            <p className="text-sm sm:text-base text-[var(--body)] max-w-md mx-auto leading-relaxed">
              <span className="l-bs">
                Vaš tekst je pripremljen u novoj poruci. Pošaljite je i odgovaramo u roku od jednog radnog dana.
              </span>
              <span className="l-en">
                Your text has been drafted in your email app. Send it and we will reply within one working day.
              </span>
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="btn-ghost mt-4 px-5 py-2 text-xs font-semibold uppercase tracking-wider focus-ring cursor-pointer"
            >
              <span className="l-bs">Nazad na kontakt formu</span>
              <span className="l-en">Back to contact form</span>
            </button>
          </div>
        )}

        {status !== 'sent' && status !== 'mailto' && (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot field for bot detection */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor={botCheckId}>Do not fill this</label>
              <input
                type="checkbox"
                id={botCheckId}
                checked={botCheck}
                onChange={(e) => setBotCheck(e.target.checked)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {status === 'error' && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-[rgba(var(--danger-rgb),0.10)] border border-[rgba(var(--danger-rgb),0.20)] text-[rgba(var(--danger-rgb),0.92)] text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-[var(--danger)] shrink-0 mt-0.5" />
                <div>
                  {errorMessage === 'validation' ? (
                    <>
                      <span className="l-bs">Molimo popunite sva obavezna polja.</span>
                      <span className="l-en">Please fill in all required fields.</span>
                    </>
                  ) : (
                    <>
                      <span className="l-bs">
                        Slanje nije uspjelo. Pišite nam direktno na {CONTACT.email}.
                      </span>
                      <span className="l-en">
                        Sending failed. Email us directly at {CONTACT.email}.
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* PROBLEM / MESSAGE FIELD */}
            <div>
              <label htmlFor={problemId} className="block text-sm font-semibold text-[var(--ink)] mb-2.5">
                {selectedCategory === 'project' && (
                  <>
                    <span className="l-bs">Opišite Vaš projekat ili ideju</span>
                    <span className="l-en">Describe your project or idea</span>
                  </>
                )}
                {selectedCategory === 'partnership' && (
                  <>
                    <span className="l-bs">Detalji o mogućoj saradnji</span>
                    <span className="l-en">Partnership details</span>
                  </>
                )}
                {selectedCategory === 'career' && (
                  <>
                    <span className="l-bs">Poruka i link do CV-ja / portfolija</span>
                    <span className="l-en">Message & link to resume / portfolio</span>
                  </>
                )}
                {selectedCategory === 'support' && (
                  <>
                    <span className="l-bs">Opis zahtjeva za podršku</span>
                    <span className="l-en">Support request details</span>
                  </>
                )}
              </label>
              <textarea
                id={problemId}
                rows={4}
                required
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder={
                  selectedCategory === 'project'
                    ? 'Opišite šta želite izgraditi, ključne ciljeve i okvirni vremenski plan...'
                    : selectedCategory === 'partnership'
                    ? 'Predstavite vašu firmu i kako vidite potencijalnu saradnju...'
                    : selectedCategory === 'career'
                    ? 'Napišite za koju poziciju ste zainteresovani i priložite link na LinkedIn/portfolio...'
                    : 'Navedite projekat i opišite pitanje ili asistenciju koja vam je potrebna...'
                }
                className="s9-input w-full focus-ring"
              />
            </div>

            {/* TWO COLUMN INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor={companyId} className="block text-sm font-semibold text-[var(--ink)] mb-2.5">
                  <span className="l-bs">Ime i prezime / Kompanija</span>
                  <span className="l-en">Name / Company name</span>
                </label>
                <input
                  type="text"
                  id={companyId}
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="npr. Adnan Hadžić ili Firma d.o.o."
                  className="s9-input w-full focus-ring"
                />
              </div>

              <div>
                <label htmlFor={contactId} className="block text-sm font-semibold text-[var(--ink)] mb-2.5">
                  <span className="l-bs">Email adresa ili telefon</span>
                  <span className="l-en">Email or phone number</span>
                </label>
                <input
                  type="text"
                  id={contactId}
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="adnan@firma.ba ili +387..."
                  className="s9-input w-full focus-ring"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full py-3 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 focus-ring disabled:opacity-50 cursor-pointer"
              >
                {status === 'sending' ? (
                  <>
                    <span className="l-bs">Šaljem poruku...</span>
                    <span className="l-en">Sending message...</span>
                  </>
                ) : (
                  <>
                    <span className="l-bs">Pošaljite upit</span>
                    <span className="l-en">Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="mt-3 text-xs text-center text-[var(--muted)]">
                <span className="l-bs">Bez neželjene pošte. Odgovaramo u roku od jednog radnog dana.</span>
                <span className="l-en">No spam. No obligation. We reply within one working day.</span>
              </p>
            </div>
          </form>
        )}

        {/* ALTERNATIVE: SCHEDULE A CALL DIRECTLY */}
        <div className="mt-8 pt-6 border-t border-[var(--line)] text-center">
          <p className="text-xs sm:text-sm text-[var(--muted)] mb-2">
            <span className="l-bs">Ipak želite odmah zakazati online video razgovor?</span>
            <span className="l-en">Prefer to schedule an intro video call right away?</span>
          </p>
          <button
            type="button"
            onClick={triggerMeetingModal}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--cyan)] hover:underline focus-ring cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="l-bs">Zakažite 25-minutni sastanak u kalendaru</span>
            <span className="l-en">Schedule a 25-minute call in calendar</span>
          </button>
        </div>
      </div>

      {/* FALLBACK CONTACT ROW */}
      <div className="mt-8 text-center text-xs sm:text-sm text-[var(--muted)] flex items-center justify-center gap-5 flex-wrap">
        <span>
          <span className="l-bs">Preferirate direktan kontakt?</span>
          <span className="l-en">Prefer direct contact?</span>
        </span>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-[var(--cyan)] font-semibold transition-colors focus-ring"
        >
          <Mail className="w-3.5 h-3.5 text-[var(--cyan)]" />
          <span>{CONTACT.email}</span>
        </a>

        {CONTACT.phone && (
          <a
            href={`tel:${CONTACT.phone}`}
            className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-[var(--cyan)] font-semibold transition-colors focus-ring"
          >
            <Phone className="w-3.5 h-3.5 text-[var(--cyan)]" />
            <span>{CONTACT.phone}</span>
          </a>
        )}
      </div>
    </div>
  );
};
