export function truncate(text: string, amount: number) {
  const words = text.split(' ');
  if (words.length <= amount) return text;
  return words.slice(0, amount).join(' ') + '...';
}
