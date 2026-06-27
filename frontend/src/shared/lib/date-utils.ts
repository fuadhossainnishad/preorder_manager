/**
 * Enterprise-grade date formatting utilities
 */
export const formatDateTime = (date: string | null | undefined): string => {
  if (!date) return '';
  
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return '';
  }
};

export const formatDateForInput = (date: string | null): string => {
  if (!date) return '';
  // Format for datetime-local input: YYYY-MM-DDTHH:mm
  return date.slice(0, 16);
};

/**
 * Format date for API - converts to ISO-8601 with timezone
 */
export const formatDateForAPI = (date: string): string => {
  if (!date) return '';
  
  // If it's already a valid ISO string, return it
  try {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return d.toISOString();
    }
  } catch {
    // Fall through
  }
  
  // If it's a datetime-local format (YYYY-MM-DDTHH:mm), convert to ISO
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (match) {
    const [, year, month, day, hours, minutes] = match;
    const d = new Date(Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    ));
    return d.toISOString();
  }
  
  // If it's just a date (YYYY-MM-DD), add time
  const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    const d = new Date(Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    ));
    return d.toISOString();
  }
  
  return date;
};

export const formatPreorderWhen = (value: string): string => {
  return value.replace(/_/g, '-');
};

export const isValidDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};