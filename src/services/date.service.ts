import { DateTime } from 'luxon';

export const formatDate = (date: string): string => {
    return DateTime.fromISO(date).toFormat('dd MMM y, HH:mm');
}
