import Image from 'next/image'
import { ParticipantFlagsProps } from '@/interfaces/components'

const countryCodes = [
  'AR',
  'BE',
  'BO',
  'BR',
  'CN',
  'HR',
  'SE',
  'SY',
  'CL',
  'CO',
  'DE',
  'ES',
  'FR',
  'MX',
  'KR',
  'IT',
  'IL',
  'JP',
  'PY',
  'PE',
  'US',
  'UY',
  'VE'
]

export default function ParticipantWhitFlags({
  participants
}: ParticipantFlagsProps) {
  return (
    <div className='w-full p-4 overflow-hidden'>
      <h2 className='text-3xl font-bold mb-4'>Participantes:</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {participants.map((participant) => {
          const randomCountryCode =
            countryCodes[Math.floor(Math.random() * countryCodes.length)]
          const flagUrl = `https://flagsapi.com/${randomCountryCode}/flat/64.png`

          return (
            <div
              key={participant.id}
              className='relative w-32 h-20 rounded-md shadow-md '
            >
              <Image
                src={flagUrl}
                width={128}
                height={80}
                alt={`Bandera para ${participant.nombre}`}
                className='absolute h-full w-full object-cover opacity-60 -z-10'
              />
              <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-1'>
                <span className='text-white text-sm font-bold text-center break-words'>
                  {participant.nombre}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
