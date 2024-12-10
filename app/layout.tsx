import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'
import './globals.css'

// const montserrat = Montserrat({ subsets: ['latin'] })
const Bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] })
export const metadata: Metadata = {
  //Cambiar todo por variables a un objeto que modifique segun la necesidad de textos.
  title: 'Festival de los Food Trucks',
  description: 'Sorteo para el Festival de los Food Trucks.',
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
      <body className={`${Bebas.className} antialiased relative`}>
        {children}
      </body>
    </html>
  )
}
