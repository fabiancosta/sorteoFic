import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  //Cambiar todo por variables a un objeto que modifique segun la necesidad de textos.
  title: 'Festival Patagónico de la Empanada',
  description: 'Sorteo para el Festival Patagónico de la Empanada.'
}

export default function SorteoLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Image
        src={'/assets/fondo.png'}
        alt='Imagen de fondo para el sorteo'
        width={1920}
        height={968}
        className='absolute h-full w-full object-cover -z-10'
      />
      {children}
    </>
  )
}
