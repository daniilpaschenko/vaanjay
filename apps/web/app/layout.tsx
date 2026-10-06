import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'VAANJAY - your world, your voice',
  description: 'VAANJAY - Connect, share, and discover. your world, your voice.',
  icons: { icon: '/favicon.ico' },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('vaanjay_theme');if(t==='dark'||!t)document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}})()`
        }} />
      </head>
      <body className="min-h-screen bg-white text-accent antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
