import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  //Cambiar todo por variables a un objeto que modifique segun la necesidad de textos.
  title: 'Inscripcion al Sorteo',
  description: 'Inscripcion para el sorteo.'
}

export default function SorteoLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex min-h-screen w-full flex-col items-center p-4 space-y-4 relative bg-muted'>
      <Image
        src={'/assets/logo-form-sorteo.jpg'}
        alt='Logo para el formulario del sorteo.'
        width={1024}
        height={512}
        className='rounded-lg'
      />
      {children}
    </main>
  )
}
