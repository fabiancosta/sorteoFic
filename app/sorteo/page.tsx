'use client'
import { ActionButtons } from '@/components/action-buttons'
import { useSorteo } from '@/hooks/use-sorteo'
import { ConfettiSection } from './components/confetti'
import { CountdownSection } from './components/countdown'
import { LogoSection } from './components/logo'
import { ParticipantsSection } from './components/participants'
import { WinnersSection } from './components/winners'

export default function Sorteo() {
  const {
    participants,
    winners,
    loading,
    showConfetti,
    showWinners,
    showCounter,
    hideParticipants,
    offConfeti,
    handleReload,
    handleStart
  } = useSorteo()

  const participantes = [
    {
      position: 0,
      timestamp: null,
      firstName: 'Sandra ',
      lastName: 'Peloc',
      dni: '34022801',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Dalma Judith ',
      lastName: 'Acuña ',
      dni: '40294851',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Samira ',
      lastName: 'Luna ',
      dni: '40068111',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Luis ',
      lastName: 'Romero ',
      dni: '25975023',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Gladys',
      lastName: 'Huenupay',
      dni: '18497732',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Edith',
      lastName: 'Quilaqueo ',
      dni: '33942809',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Daniela ',
      lastName: 'Campos',
      dni: '38811605',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Carla',
      lastName: 'Alarcon',
      dni: '39039644',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Nadia',
      lastName: 'Laveilhe ',
      dni: '36376431',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Nelida Beatriz ',
      lastName: 'Lezana',
      dni: '21381744',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Fernanda',
      lastName: 'Gimenez',
      dni: '38583418',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Neyen',
      lastName: 'Vejare',
      dni: '44684640',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Maribel ',
      lastName: 'COLQUE',
      dni: '41903345',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Cesar',
      lastName: 'Muñoz',
      dni: '28691194',
      phoneNumber: null,
      email: null
    },
    {
      position: 0,
      timestamp: null,
      firstName: 'Adela',
      lastName: 'Rodríguez',
      dni: '16349884',
      phoneNumber: null,
      email: null
    }
  ]

  return (
    <>
      <ConfettiSection offConfeti={offConfeti} showConfetti={showConfetti} />
      <section className='relative flex flex-col w-full col-start-2'>
        <LogoSection />
        <div className='w-full min-w-96 min-h-96 flex flex-col items-center gap-y-4'>
          <ActionButtons
            handleRecargar={handleReload}
            handleEmpezarSorteo={handleStart}
            cargando={loading}
          />
          <article className='flex flex-col items-center w-full gap-y-4'>
            <ParticipantsSection
              hideParticipants={hideParticipants}
              participants={participantes}
            />
            <WinnersSection showGanadores={showWinners} ganadores={winners} />
            <CountdownSection showContador={showCounter} />
          </article>
        </div>
      </section>
    </>
  )
}
