export function formattedDate(dateString: string): string {
  const date = new Date(dateString)
  return date
    .toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ de /g, ' ')
    .replace('.', '')
}
