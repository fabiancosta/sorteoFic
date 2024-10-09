import Image from 'next/image'
import { Suspense } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className='container min-h-screen w-full grid grid-cols-fic'>
      <article className='col-start-1 place-self-center'>
        <Image
          src={'/assets/sponsors-izq.png'}
          alt='Sponsors FIC Parte 1'
          width={220}
          height={400}
        />
      </article>
      <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
      <article className='col-start-3 place-self-center'>
        <Image
          src={'/assets/sponsors-der.png'}
          alt='Sponsors FIC Parte 2'
          width={220}
          height={400}
        />
      </article>
    </main>
  )
}
