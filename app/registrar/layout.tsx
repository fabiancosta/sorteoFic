import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Inscripción',
  description: 'Inscripción para el sorteo.'
}

export default function RegisterLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex min-h-screen w-full flex-col items-center p-4 space-y-4 relative bg-muted'>
      <Image
        src={'/assets/logo-form-sorteo.png'}
        alt='Logo para el formulario del sorteo.'
        width={1024}
        height={512}
        className='rounded-lg'
      />
      {children}
    </main>
  )
}
