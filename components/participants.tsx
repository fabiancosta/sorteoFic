'use client'
import { ParticipantsList } from '@/interfaces/actions'
import Image from 'next/image'
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

export default function Participants({ participants }: ParticipantsList) {
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
        {/* {participants.map((participant) => ( */}
        {participantsWithFlags.map((participant) => (
          <div
            key={participant.dni}
            className='relative w-52 h-32 rounded-md bg-transparent border-1 border-red-500'
          >
            <Image
              src={participant.flagUrl}
              // src={'/assets/fdo-nombres.png'}
              width={208}
              height={128}
              alt={`Bandera para ${participant.firstName}`}
              className='absolute h-full w-full -z-10'
            />

            <div className='absolute inset-0 flex items-center bg-opacity-20 justify-center p-1'>
              <p
                className='text-3xl font-bold text-center line-clamp-2 break-words capitalize text-ellipsis overflow-hidden px-7 pt-4 text-white text-outline-black'
                lang='es'
              >
                {participant.lastName + ' ' + participant.firstName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
