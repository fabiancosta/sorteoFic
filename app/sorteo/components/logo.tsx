import Image from 'next/image'

export const LogoSection = () => (
  <div className='flex justify-center w-full'>
    <Image
      src='/assets/logo.png'
      alt='Fiesta nacional del inmigrante y las colectividades.'
      width={260}
      height={250}
    />
  </div>
)
