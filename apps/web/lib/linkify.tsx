import Link from 'next/link'

export function linkifyText(text: string): React.ReactNode {
  if (!text) return null
  const parts = text.split(/(#\w+)/g)
  return parts.map((part, i) => {
    if (part.startsWith('#')) {
      const tag = part.slice(1)
      return <Link key={i} href={`/explore/tags/${tag}`} className="text-primary hover:underline">#{tag}</Link>
    }
    return part
  })
}
