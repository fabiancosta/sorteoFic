'use client'
import { ActionButtons } from '@/components/action-buttons'
import { useSorteo } from '@/hooks/use-sorteo'
import { CountdownSection } from './components/countdown'
import { LogoSection } from './components/logo'
import { ParticipantsSection } from './components/participants'
import { WinnersSection } from './components/winners'
import { ConfettiSection } from './components/confetti'

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
              participants={participants}
            />
            <WinnersSection showGanadores={showWinners} ganadores={winners} />
            <CountdownSection showContador={showCounter} />
          </article>
        </div>
      </section>
    </>
  )
}
