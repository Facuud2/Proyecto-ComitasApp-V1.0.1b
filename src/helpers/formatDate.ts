
export function formatDate(dateString: string): string {
  if (!dateString) return '';

  // Si es formato ISO (2025-08-13T03:00:00.000Z)
  if (dateString.includes('T')) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  // Si es formato '13-08-2025 03:00:00.000Z' o '13-08-2025 03:00'
  const match = dateString.match(/(\d{2}-\d{2}-\d{4})[ T](\d{2}:\d{2})/);
  if (match) {
    return `${match[1]} ${match[2]}`;
  }

  return dateString;
}

