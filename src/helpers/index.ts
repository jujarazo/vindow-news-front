// Truncates a text with "..." that exceeds the amount of words passed as parameter
export function truncate(text: string, amount: number) {
  const words = text.split(' ');
  if (words.length <= amount) return text;
  return words.slice(0, amount).join(' ') + '...';
}

// Creates an Array of numbers filled with consecutive numbers from the startNumber with then passed length
export function createPaginationArray(startNumber: number, length: number) {
  return Array.from({ length }, (_, i) => startNumber + i);
}
