import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'
import './globals.css'

const TITLE = process.env.META_TITLE
const DESCRIPTION = process.env.META_TITLE
// const montserrat = Montserrat({ subsets: ['latin'] })
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] })
export const metadata: Metadata = {
  //Cambiar todo por variables a un objeto que modifique segun la necesidad de textos.
  title: TITLE,
  description: DESCRIPTION,
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
      <body className={`${bebas.className} antialiased relative text-marron`}>
        {children}
      </body>
    </html>
  )
}
