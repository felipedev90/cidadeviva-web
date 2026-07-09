import './globals.css'

import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
  weight: ['500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cidade Viva',
  description: 'Cultura urbana, ciclismo e lifestyle de Jundiaí, contados por quem vive a cidade.',

  openGraph: {
    title: 'Cidade Viva',
    description:
      'Cultura urbana, ciclismo e lifestyle de Jundiaí, contados por quem vive a cidade.',
    url: 'https://cidadeviva-web.vercel.app',
    siteName: 'Cidade Viva',
    images: [
      {
        url: 'https://cidadeviva-web.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt-BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col ">{children}</body>
    </html>
  )
}
