import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  //Cambiar todo por variables a un objeto que modifique segun la necesidad de textos.
  title: 'Festival Patagónico de la Empanada',
  description: 'Sorteo para el Festival Patagónico de la Empanada.',
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
      <body className={`${montserrat.className} antialiased relative`}>
        <Image
          src={'/assets/fondo.png'}
          alt='Imagen de fondo para el sorteo'
          width={1920}
          height={968}
          className='absolute h-full w-full object-cover -z-10'
        />

        {children}
      </body>
    </html>
  )
}
