export function formatDate(dateString: string | null): string {
  if (!dateString) return "投稿日未定"
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

