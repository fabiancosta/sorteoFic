'use client'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import Countdown from '@/components/countdown'
import { getWinners, reloadParticipants } from '../lib/actions'
import { useCountdown } from '@/hooks/use-coundown'
import { WinnerList } from '@/components/winner-list'
import { ParticipantData } from '@/interfaces/actions'
import { ActionButtons } from '@/components/action-buttons'
import ParticipantWhitFlags from '@/components/participants'
import { SessionStorageContext } from '@/context/session-provider'

export default function Sorteo() {
  const [participantes, setParticipantes] = useState<ParticipantData[]>([])
  const [ganadores, setGanadores] = useState<ParticipantData[]>([])
  const [contador, setContador] = useState(5)
  const [cargando, setCargando] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showGanadores, setShowGanadores] = useState(false)
  const [showContador, setShowContador] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [hideParticipants, setHideParticipants] = useState(false)
  const [offConfeti, setOffConfeti] = useState(false)
  const router = useRouter()

  const { count, progress } = useCountdown(
    isCounting ? contador : 0,
    contador,
    isCounting
  )

  const context = useContext(SessionStorageContext)

  useEffect(() => {
    if (contador === 0) {
      setOffConfeti(true)
      setShowConfetti(true)
      setShowContador(false)
      setTimeout(() => {
        setShowGanadores(true)
        setCargando(false) // Habilita el botón de recargar
      }, 500)
    }
  }, [contador])

  const handleRecargar = async () => {
    setParticipantes([])
    setTimeout(() => {
      setHideParticipants(false)
    }, 2000)
    setShowConfetti(false)
    setShowGanadores(false)
    setShowContador(false)
    setGanadores([])
    setCargando(true)
    setIsCounting(false)
    setContador(5)

    const nuevosParticipantes = await reloadParticipants()
    setTimeout(() => {
      setParticipantes(nuevosParticipantes)
      setCargando(false)
    }, 500)
    router.refresh()
  }

  const handleEmpezarSorteo = async () => {
    setHideParticipants(true)
    setTimeout(() => {
      setCargando(true)
      setContador(5)
      setGanadores([])
      setShowGanadores(false)
      setShowContador(true)
      setIsCounting(true)

      const interval = setInterval(() => {
        setContador((prev) => {
          if (prev <= 0) {
            clearInterval(interval)
            setIsCounting(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 1000)

    const { winners } = await getWinners(Number(context.winners))
    setTimeout(() => {
      setGanadores(winners)
    }, 500)
  }

  return (
    <>
      <Confetti
        width={1920}
        height={968}
        run={offConfeti}
        recycle={showConfetti}
        numberOfPieces={400}
      />

      <section className='relative flex flex-col w-full col-start-2'>
        <div className='flex justify-center w-full p-4'>
          <Image
            src='/assets/logo-fic.png'
            alt='Fiesta nacional del inmigrante y las colectividades.'
            width={600}
            height={220}
          />
        </div>

        <div className='w-full min-w-96 min-h-96 flex flex-col items-center gap-y-8'>
          <ActionButtons
            handleRecargar={handleRecargar}
            handleEmpezarSorteo={handleEmpezarSorteo}
            cargando={cargando}
          />
          <article className='flex flex-col items-center w-full gap-y-4'>
            <AnimatePresence mode='wait'>
              {!hideParticipants && participantes.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ParticipantWhitFlags participants={participantes} />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              {showGanadores && <WinnerList winners={ganadores} />}
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              {showContador && (
                <motion.div
                  key='contador'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  aria-live='polite'
                  className='mt-20'
                >
                  <Countdown count={count} progress={progress} />
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        </div>
      </section>
    </>
  )
}
