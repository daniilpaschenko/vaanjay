export async function deriveKey(password: string, salt: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encryptMessage(text: string, password: string): Promise<string> {
  try {
    const salt = crypto.randomUUID()
    const key = await deriveKey(password, salt)
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encoder = new TextEncoder()
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(text)
    )
    const combined = new Uint8Array(iv.length + encrypted.byteLength)
    combined.set(iv)
    combined.set(new Uint8Array(encrypted), iv.length)
    const base64 = btoa(String.fromCharCode(...combined))
    return salt + ':' + base64
  } catch {
    return text
  }
}

export async function decryptMessage(encrypted: string, password: string): Promise<string> {
  try {
    const parts = encrypted.split(':')
    if (parts.length !== 2) return encrypted
    const [salt, base64] = parts
    const key = await deriveKey(password, salt)
    const combined = new Uint8Array(atob(base64).split('').map(c => c.charCodeAt(0)))
    const iv = combined.slice(0, 12)
    const data = combined.slice(12)
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    )
    return new TextDecoder().decode(decrypted)
  } catch {
    return encrypted
  }
}

export function generateEncryptionKey(): string {
  return crypto.randomUUID() + crypto.randomUUID()
}
