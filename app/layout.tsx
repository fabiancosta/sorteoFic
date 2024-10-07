import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Municipalidad de Zapala',
  description: 'Sorteo para la FIC.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
