import { SessionStorageProvider } from '@/context/session-provider'
import Image from 'next/image'
import { Suspense } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative container min-h-screen w-full grid grid-cols-small-fic xl:grid-cols-fic'>
      <article className='col-start-1 place-self-center'>
        <Image
          src={'/assets/sponsors-izq.png'}
          alt='Sponsors FIC Parte 1'
          width={300}
          height={800}
        />
      </article>
      <Suspense
        fallback={
          <div className='min-h-screen grid place-content-center text-7xl font-bold'>
            Cargando...
          </div>
        }
      >
        <SessionStorageProvider>{children}</SessionStorageProvider>
      </Suspense>
      <article className='col-start-3 place-self-center'>
        <Image
          src={'/assets/sponsors-der.png'}
          alt='Sponsors FIC Parte 2'
          width={300}
          height={800}
        />
      </article>
    </main>
  )
}
