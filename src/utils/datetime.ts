export const formatDate = (date: Date | string): string => Intl.DateTimeFormat('pt-br', {
  timeStyle: undefined,
  dateStyle: 'full'
}).format(date instanceof Date ? date : new Date(date));

export const formatDateTime = (date: Date | string): string => Intl.DateTimeFormat('pt-br', {
  timeStyle: 'full',
  dateStyle: 'full'
}).format(date instanceof Date ? date : new Date(date));
