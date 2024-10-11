'use client'
import Image from 'next/image'
import { ParticipantsList } from '@/interfaces/actions'
import { useMemo } from 'react'

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
}: ParticipantsList) {
  const participantsWithFlags = useMemo(() => {
    return participants.map((participant) => {
      const randomCountryCode =
        countryCodes[Math.floor(Math.random() * countryCodes.length)]
      const flagUrl = `https://flagsapi.com/${randomCountryCode}/flat/64.png`

      return {
        ...participant,
        flagUrl
      }
    })
  }, [participants])

  return (
    <div className='w-full p-4 overflow-hidden'>
      <h2 className='text-3xl font-bold mb-4'>{`Últimos ${participants.length} participantes:`}</h2>
      <div className='grid grid-flow-dense gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5'>
        {participantsWithFlags.map((participant) => (
          <div
            key={participant.dni}
            className='relative w-32 h-20 rounded-md shadow-md bg-transparent'
          >
            <Image
              src={participant.flagUrl}
              width={112}
              height={64}
              alt={`Bandera para ${participant.firstName}`}
              className='absolute h-full w-full object-cover opacity-70 -z-10'
            />
            <div className='absolute inset-0 flex items-center bg-black bg-opacity-20 justify-center p-1'>
              <span
                className='text-white text-base font-bold text-center line-clamp-2 break-words text-ellipsis overflow-hidden p-1'
                lang='es'
              >
                {participant.lastName + ' ' + participant.firstName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
