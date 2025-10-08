import Image from 'next/image'

export default function SorteoLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Image
        src={'/assets/fondo.jpg'}
        alt='Imagen de fondo para el sorteo'
        width={1920}
        height={900}
        className='absolute object-cover -z-10'
      />
      {children}
    </>
  )
}
