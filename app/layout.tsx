import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FIC 2024',
  description: 'Sorteo para la FIC.',
  icons: {
    icon: {
      url: '/favicon.ico'
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.className} antialiased`}>
        <Image
          src={'/assets/fondo-fic.png'}
          alt='Sponsors FIC Parte 1'
          width={1920}
          height={1080}
          className='absolute h-full w-full object-cover opacity-30 -z-10'
        />

        {children}
      </body>
    </html>
  )
}
