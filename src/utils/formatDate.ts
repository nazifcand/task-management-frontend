import { DateTime } from 'luxon';

export const formatDate = (date: string, format = 'dd.MM.yyyy HH:mm') => {
  const unFormattedDate = DateTime.fromISO(date);
  return unFormattedDate.toFormat(format);
};
