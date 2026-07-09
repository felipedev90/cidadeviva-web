import './globals.css'

import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'

import { QueryProvider } from '@/components/providers/QueryProvider'

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col ">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
