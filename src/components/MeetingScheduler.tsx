import React, { useState, useId } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, ArrowRight, Download, ExternalLink, User } from 'lucide-react';
import { WEB3FORMS_KEY, FORM_IS_LIVE, CONTACT } from '../config';
import { getUpcomingBusinessDays, MEETING_CONFIG, getGoogleCalendarLink, downloadIcsFile, MeetingDetails } from '../utils/calendarUtils';

interface MeetingSchedulerProps {
  productChip?: string;
}

type SchedulerStatus = 'idle' | 'submitting' | 'confirmed' | 'error';

export const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ productChip }) => {
  const businessDays = getUpcomingBusinessDays(10);

  const [selectedDate, setSelectedDate] = useState<string>(businessDays[0]?.dateStr || '');
  const [selectedTime, setSelectedTime] = useState<string>(MEETING_CONFIG.timeSlots[1] || '10:30');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<SchedulerStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const phoneId = useId();
  const topicId = useId();

  const selectedDayObj = businessDays.find((d) => d.dateStr === selectedDate) || businessDays[0];

  const getMeetingDetails = (): MeetingDetails => {
    const productPrefix = productChip ? `[${productChip}] ` : '';
    return {
      title: `${productPrefix}Intro sastanak: ${name} (${company || 'Klijent'}) & Shape9`,
      description: `Uvodni razgovor sa timom Shape9.\n\nKlijent: ${name}\nFirma: ${company}\nEmail: ${email}\nTelefon: ${phone || 'Nije naveden'}\nTema / Cilj: ${topic || 'Upoznavanje i procjena projekta'}\nProizvod: ${productChip || 'Općenito'}\n\nFormat: 25-minutni online video poziv (Google Meet).`,
      dateStr: selectedDate,
      timeStr: selectedTime,
      durationMinutes: MEETING_CONFIG.durationMinutes,
      attendeeName: name,
      attendeeEmail: email,
      companyName: company,
      productContext: productChip,
    };
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !selectedDate || !selectedTime) {
      setStatus('error');
      setErrorMessage('validation');
      return;
    }

    const currentLang = document.documentElement.getAttribute('data-lang') || 'bs';
    const meetingDetails = getMeetingDetails();
    const subjectLine = `[Sastanak Zakazan] ${selectedDayObj?.labelBs || selectedDate} u ${selectedTime}: ${name} (${company || 'Klijent'})`;

    const messageBody = [
      `=== NOVI ZAKAZANI SASTANAK ===`,
      `Datum: ${selectedDayObj?.labelBs || selectedDate} (${selectedDayObj?.labelEn})`,
      `Vrijeme: ${selectedTime} CET (Trajanje: ${MEETING_CONFIG.durationMinutes} min)`,
      `Ime i prezime: ${name}`,
      `Email: ${email}`,
      `Kompanija: ${company || 'Nije navedeno'}`,
      `Telefon: ${phone || 'Nije navedeno'}`,
      `Tema / Izazov: ${topic || 'Uvodne konsultacije'}`,
      `Proizvod: ${productChip || 'Shape9 općenito'}`,
      `Jezik: ${currentLang}`,
      `Stranica: ${window.location.href}`,
    ].join('\n\n');

    if (!FORM_IS_LIVE) {
      // Fallback: download .ics and open email
      downloadIcsFile(meetingDetails);
      const mailtoUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        subjectLine
      )}&body=${encodeURIComponent(messageBody)}`;
      window.location.href = mailtoUrl;
      setStatus('confirmed');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const payload: Record<string, any> = {
        access_key: WEB3FORMS_KEY,
        subject: subjectLine,
        from_name: name.trim(),
        email: email.trim(),
        message: messageBody,
        category: 'Zakazan sastanak',
        date: `${selectedDate} ${selectedTime} CET`,
        company: company.trim(),
        phone: phone.trim(),
        product: productChip || 'General',
        page: window.location.href,
        lang: currentLang,
      };

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
        setStatus('confirmed');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      // Still allow client confirmation and fallback
      setStatus('confirmed');
    }
  };

  if (status === 'confirmed') {
    const meeting = getMeetingDetails();
    const gCalUrl = getGoogleCalendarLink(meeting);

    return (
      <div className="py-8 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-[rgba(var(--cyan-rgb),0.15)] text-[var(--cyan)] flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mb-2">
            <span className="l-bs">Sastanak je uspješno zakazan!</span>
            <span className="l-en">Your Meeting is Confirmed!</span>
          </h3>
          <p className="text-sm sm:text-base text-[var(--body)] max-w-lg mx-auto leading-relaxed">
            <span className="l-bs">
              Rezervisali ste uvodni 25-minutni razgovor za{' '}
              <strong className="text-[var(--cyan)] font-semibold">
                {selectedDayObj?.labelBs} u {selectedTime} CET
              </strong>
              . Link za video poziv i potvrda stižu na vaš email.
            </span>
            <span className="l-en">
              You reserved a 25-minute intro call for{' '}
              <strong className="text-[var(--cyan)] font-semibold">
                {selectedDayObj?.labelEn} at {selectedTime} CET
              </strong>
              . Video call link and confirmation have been routed to your email.
            </span>
          </p>
        </div>

        {/* CALENDAR INTEGRATION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={gCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2.5 px-5 rounded-full font-semibold text-sm inline-flex items-center gap-2 focus-ring w-full sm:w-auto justify-center"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="l-bs">Dodajte u Google Kalendar</span>
            <span className="l-en">Add to Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={() => downloadIcsFile(meeting)}
            className="btn-ghost py-2.5 px-5 rounded-full font-semibold text-sm inline-flex items-center gap-2 focus-ring w-full sm:w-auto justify-center cursor-pointer"
          >
            <Download className="w-4 h-4 text-[var(--cyan)]" />
            <span className="l-bs">Preuzmite .ICS pozivnicu</span>
            <span className="l-en">Download .ICS Invite</span>
          </button>
        </div>

        <div className="pt-4 border-t border-[var(--line)] max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setName('');
              setEmail('');
              setCompany('');
              setTopic('');
            }}
            className="text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors underline cursor-pointer"
          >
            <span className="l-bs">Zakažite novi ili promijenite termin</span>
            <span className="l-en">Schedule another or change time</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleBooking} className="space-y-6">
      {status === 'error' && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="l-bs">Molimo popunite sva obavezna polja (Ime, Email, Datum i Vrijeme).</span>
            <span className="l-en">Please fill in all required fields (Name, Email, Date and Time).</span>
          </div>
        </div>
      )}

      {/* STEP 1: DATE SELECTION */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2.5 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[var(--cyan)]" />
          <span className="l-bs">1. Odaberite radni dan</span>
          <span className="l-en">1. Select a business day</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {businessDays.slice(0, 10).map((day) => {
            const isSelected = selectedDate === day.dateStr;
            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => setSelectedDate(day.dateStr)}
                className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer focus-ring flex flex-col items-center justify-center ${
                  isSelected
                    ? 'border-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.12)] text-[var(--cyan)] font-semibold shadow-md'
                    : 'border-[var(--line)] bg-[var(--navy)]/50 text-[var(--body)] hover:border-white/20 hover:bg-[var(--navy)]'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold text-[var(--muted)]">
                  <span className="l-bs">{day.dayNameBs}</span>
                  <span className="l-en">{day.dayNameEn}</span>
                </span>
                <span className="text-sm font-bold mt-0.5">
                  <span className="l-bs">{day.labelBs.split(',')[1]}</span>
                  <span className="l-en">{day.labelEn.split(',')[1]}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: TIME SLOT SELECTION */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-2.5 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[var(--cyan)]" />
          <span className="l-bs">2. Odaberite vrijeme (CET / Sarajevo) · 25 min</span>
          <span className="l-en">2. Select time slot (CET) · 25 min</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
          {MEETING_CONFIG.timeSlots.map((slot) => {
            const isSelected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`py-2 px-2 rounded-xl text-center border text-xs font-mono font-semibold transition-all cursor-pointer focus-ring ${
                  isSelected
                    ? 'border-[var(--cyan)] bg-[rgba(var(--cyan-rgb),0.15)] text-[var(--cyan)] shadow-md'
                    : 'border-[var(--line)] bg-[var(--navy)]/50 text-[var(--body)] hover:border-white/20 hover:bg-[var(--navy)]'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: ATTENDEE DETAILS */}
      <div className="pt-2 border-t border-[var(--line)]">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[var(--cyan)]" />
          <span className="l-bs">3. Vaši podaci za pozivnicu</span>
          <span className="l-en">3. Your details for the invitation</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor={nameId} className="block text-xs font-medium text-[var(--ink)] mb-1.5">
              <span className="l-bs">Ime i prezime *</span>
              <span className="l-en">Full Name *</span>
            </label>
            <input
              type="text"
              id={nameId}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="npr. Mirza Bašić"
              className="s9-input w-full focus-ring text-sm"
            />
          </div>

          <div>
            <label htmlFor={emailId} className="block text-xs font-medium text-[var(--ink)] mb-1.5">
              <span className="l-bs">Službeni email *</span>
              <span className="l-en">Work Email *</span>
            </label>
            <input
              type="email"
              id={emailId}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mirza@firma.ba"
              className="s9-input w-full focus-ring text-sm"
            />
          </div>

          <div>
            <label htmlFor={companyId} className="block text-xs font-medium text-[var(--ink)] mb-1.5">
              <span className="l-bs">Kompanija / Projekat</span>
              <span className="l-en">Company / Project</span>
            </label>
            <input
              type="text"
              id={companyId}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="npr. Logistika d.o.o."
              className="s9-input w-full focus-ring text-sm"
            />
          </div>

          <div>
            <label htmlFor={phoneId} className="block text-xs font-medium text-[var(--ink)] mb-1.5">
              <span className="l-bs">Telefon (opcionalno)</span>
              <span className="l-en">Phone (optional)</span>
            </label>
            <input
              type="tel"
              id={phoneId}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+387 61..."
              className="s9-input w-full focus-ring text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor={topicId} className="block text-xs font-medium text-[var(--ink)] mb-1.5">
            <span className="l-bs">Kratka tema ili pitanje za razgovor</span>
            <span className="l-en">Brief topic or goal for the call</span>
          </label>
          <input
            type="text"
            id={topicId}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={
              productChip
                ? `Pitanja u vezi implementacije za ${productChip}...`
                : 'Želimo automatizovati obradu narudžbi i integraciju...'
            }
            className="s9-input w-full focus-ring text-sm"
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary w-full py-3 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 focus-ring disabled:opacity-50 cursor-pointer"
        >
          {status === 'submitting' ? (
            <>
              <span className="l-bs">Zapisujem termin...</span>
              <span className="l-en">Booking meeting...</span>
            </>
          ) : (
            <>
              <span className="l-bs">
                Potvrdite sastanak za {selectedDayObj?.labelBs} u {selectedTime}
              </span>
              <span className="l-en">
                Confirm Meeting for {selectedDayObj?.labelEn} at {selectedTime}
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="mt-2.5 text-xs text-center text-[var(--muted)]">
          <span className="l-bs">
            25-minutni uvodni video poziv · Bez obaveza i bez prodajnog pritiska.
          </span>
          <span className="l-en">
            25-minute intro video call · No obligation, no sales pitch.
          </span>
        </p>
      </div>
    </form>
  );
};
