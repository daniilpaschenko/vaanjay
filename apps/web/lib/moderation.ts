const TAMIL_BLOCKLIST = [
  'சகோதரி', 'மூடன்', 'கழுதை', 'பைத்தியம்', 'நாய்', 'பன்றி', 'எருமை',
  'தேவிடியா', 'பொம்பளை', 'லவுடு', 'சண்டை', 'கொலை', 'தற்கொலை',
]

const ENGLISH_BLOCKLIST = [
  'fuck', 'shit', 'ass', 'bitch', 'damn', 'bastard', 'crap', 'dick',
  'whore', 'slut', 'piss', 'cock', 'suck', 'kill yourself', 'die',
]

function checkProfanity(text: string): { flagged: boolean; words: string[] } {
  const lower = text.toLowerCase()
  const found: string[] = []
  for (const word of TAMIL_BLOCKLIST) {
    if (lower.includes(word.toLowerCase())) found.push(word)
  }
  for (const word of ENGLISH_BLOCKLIST) {
    if (lower.includes(word)) found.push(word)
  }
  return { flagged: found.length > 0, words: found }
}

function checkNSFW(imageData: string): { flagged: boolean; confidence: number } {
  try {
    const img = new Image()
    img.src = imageData
    const canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d')
    if (!ctx) return { flagged: false, confidence: 0 }
    ctx.drawImage(img, 0, 0, 100, 100)
    const data = ctx.getImageData(0, 0, 100, 100).data
    let skinPixels = 0
    const total = data.length / 4
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2]
      if (r > 60 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 15) {
        skinPixels++
      }
    }
    const ratio = skinPixels / total
    return { flagged: ratio > 0.5, confidence: Math.round(ratio * 100) }
  } catch {
    return { flagged: false, confidence: 0 }
  }
}

export async function moderateText(text: string): Promise<{ passed: boolean; reasons: string[] }> {
  const profanity = checkProfanity(text)
  if (profanity.flagged) {
    return { passed: false, reasons: [`Profanity detected: ${profanity.words.join(', ')}`] }
  }
  if (text.length > 5000) {
    return { passed: false, reasons: ['Text exceeds maximum length (5000 chars)'] }
  }
  return { passed: true, reasons: [] }
}

export async function moderateImage(imageData: string): Promise<{ passed: boolean; reasons: string[] }> {
  const nsfw = checkNSFW(imageData)
  if (nsfw.flagged) {
    return { passed: false, reasons: [`NSFW content detected (${nsfw.confidence}% confidence)`] }
  }
  return { passed: true, reasons: [] }
}
