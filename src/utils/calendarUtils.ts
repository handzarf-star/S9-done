/**
 * Calendar utilities for Shape9 Native Meeting Scheduler
 */

export interface MeetingDetails {
  title: string;
  description: string;
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // HH:mm
  durationMinutes: number;
  attendeeName: string;
  attendeeEmail: string;
  companyName: string;
  productContext?: string;
}

export const MEETING_CONFIG = {
  durationMinutes: 25,
  workingHours: { start: '09:30', end: '17:00' },
  timezone: 'Europe/Sarajevo',
  timeSlots: ['09:30', '10:30', '11:30', '13:30', '14:30', '15:30', '16:30'],
};

/**
 * Returns the next N business days (Monday to Friday), skipping weekends.
 */
export function getUpcomingBusinessDays(count = 14): { date: Date; dateStr: string; labelBs: string; labelEn: string; dayNameBs: string; dayNameEn: string }[] {
  const days: { date: Date; dateStr: string; labelBs: string; labelEn: string; dayNameBs: string; dayNameEn: string }[] = [];
  const current = new Date();
  current.setDate(current.getDate() + 1);

  const dayNamesBs = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
  const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNamesBs = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  while (days.length < count) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const yyyy = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, '0');
      const dd = String(current.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const dayNameBs = dayNamesBs[dayOfWeek];
      const dayNameEn = dayNamesEn[dayOfWeek];
      const monthBs = monthNamesBs[current.getMonth()];
      const monthEn = monthNamesEn[current.getMonth()];
      const dayNum = current.getDate();

      days.push({
        date: new Date(current),
        dateStr,
        dayNameBs,
        dayNameEn,
        labelBs: `${dayNameBs}, ${dayNum}. ${monthBs}`,
        labelEn: `${dayNameEn}, ${monthEn} ${dayNum}`,
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return days;
}

/**
 * Generates a pre-filled Google Calendar web link.
 */
export function getGoogleCalendarLink(details: MeetingDetails): string {
  const [year, month, day] = details.dateStr.split('-').map(Number);
  const [hours, minutes] = details.timeStr.split(':').map(Number);

  const startDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const endDate = new Date(startDate.getTime() + details.durationMinutes * 60 * 1000);

  const formatUtc = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');

  const startIso = formatUtc(startDate);
  const endIso = formatUtc(endDate);

  const title = encodeURIComponent(details.title);
  const description = encodeURIComponent(details.description);
  const location = encodeURIComponent('Google Meet / Video Call');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${description}&location=${location}`;
}

/**
 * Generates and triggers download of a standardized .ics iCalendar file.
 */
export function downloadIcsFile(details: MeetingDetails) {
  const [year, month, day] = details.dateStr.split('-').map(Number);
  const [hours, minutes] = details.timeStr.split(':').map(Number);

  const startDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const endDate = new Date(startDate.getTime() + details.durationMinutes * 60 * 1000);

  const formatUtc = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
  const nowIso = formatUtc(new Date());
  const uid = `shape9-meeting-${Date.now()}@shape9.agency`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shape9//Meeting Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowIso}`,
    `DTSTART:${formatUtc(startDate)}`,
    `DTEND:${formatUtc(endDate)}`,
    `SUMMARY:${details.title}`,
    `DESCRIPTION:${details.description.replace(/\n/g, '\\n')}`,
    'LOCATION:Google Meet / Video Call',
    'STATUS:CONFIRMED',
    'ORGANIZER;CN=Shape9 Team:mailto:hello@shape9.agency',
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${details.attendeeName}:mailto:${details.attendeeEmail}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Shape9-Meeting-${details.dateStr}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
