import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Image from 'next/image'

const montserrat = Montserrat({ subsets: ['latin'] })
// Pasar el año como parametro Date()

export const metadata: Metadata = {
  //Cambiar todo por variables a un objeto que modifique segun la necesidad de textos.
  title: 'Festival de la Empanada',
  description: 'Sorteo para el Festival Patagonico de la Empanada.',
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
          src={'/assets/fondo.png'} //Definir un nombre generico de imagen, en este caso "fondo" esta perfecto. Solo cambiar de imagen
          alt='Sponsors FIC Parte 1' //Pasar por variable.
          width={1920}
          height={968}
          className='absolute h-full w-full object-cover -z-10'
        />

        {children}
      </body>
    </html>
  )
}
