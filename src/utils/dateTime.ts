/**
 * Utilities for Date & Time calculation respecting 'America/Sao_Paulo' timezone.
 */

export interface SaoPauloNow {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hours: number; // 0-23
  minutes: number; // 0-59
  dateString: string; // YYYY-MM-DD
}

export function getSaoPauloNow(): SaoPauloNow {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getPart = (t: string) => parts.find((p) => p.type === t)?.value || '';

  const day = parseInt(getPart('day') || '1', 10);
  const month = parseInt(getPart('month') || '1', 10);
  const year = parseInt(getPart('year') || '2026', 10);
  const hours = parseInt(getPart('hour') || '0', 10);
  const minutes = parseInt(getPart('minute') || '0', 10);

  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const dateString = `${year}-${mm}-${dd}`;

  return { year, month, day, hours, minutes, dateString };
}

/**
 * Checks if a specific date string (YYYY-MM-DD) is in the past relative to America/Sao_Paulo.
 */
export function isDateInPast(dateStr: string): boolean {
  const nowSP = getSaoPauloNow();
  return dateStr < nowSP.dateString;
}

/**
 * Checks if a specific slot time (HH:mm) on a given date (YYYY-MM-DD) has already passed.
 */
export function isSlotPassed(dateStr: string, timeStr: string): boolean {
  const nowSP = getSaoPauloNow();
  if (dateStr < nowSP.dateString) {
    return true;
  }
  if (dateStr === nowSP.dateString) {
    const [h, m] = timeStr.split(':').map(Number);
    const slotTotalMinutes = h * 60 + m;
    const nowTotalMinutes = nowSP.hours * 60 + nowSP.minutes;
    // If current time is past or equal to slot start
    return slotTotalMinutes <= nowTotalMinutes;
  }
  return false;
}

/**
 * Generates slotKey in format: YYYY-MM-DD_HH-mm
 */
export function createSlotKey(dateStr: string, timeStr: string): string {
  const safeTime = timeStr.replace(':', '-');
  return `${dateStr}_${safeTime}`;
}

/**
 * Formats phone string with Brazilian mask: (99) 99999-9999 or (99) 9999-9999
 */
export function applyPhoneMask(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 11);
  if (!cleaned) return '';

  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  }
  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
}

/**
 * Validates Brazilian phone number: at least 10 digits (DDD + 8 or 9 digits)
 */
export function isValidBrazilianPhone(value: string): boolean {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}
