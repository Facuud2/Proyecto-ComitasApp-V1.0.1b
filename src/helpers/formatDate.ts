export function formatDate(isoString: string): string {
  if (!isoString) return '';
  const [datePart, timePart] = isoString.split('T');
  if (!datePart || !timePart) return isoString;
  const [year, month, day] = datePart.split('-');
  return `${day}-${month}-${year} ${timePart}`;
}

