export const dateFormatter = (date: Date) =>
  Intl.DateTimeFormat('kr', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
