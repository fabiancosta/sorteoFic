import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
