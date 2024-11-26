'use client'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { Countdown1 } from '@/components/countdown'
import { getWinners, reloadParticipants } from '../../lib/actions'
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
  const [hideParticipants, setHideParticipants] = useState(false)
  const [offConfeti, setOffConfeti] = useState(false)
  const router = useRouter()

  const context = useContext(SessionStorageContext)

  useEffect(() => {
    if (contador === 0) {
      setOffConfeti(true)
      setShowConfetti(true)
      setShowContador(false)
      setTimeout(() => {
        setCargando(false) // Habilita el botón de recargar
      }, 1000)
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

    const countdownPromise = new Promise((resolve) => {
      setTimeout(() => {
        setCargando(true)
        setContador(5)
        setGanadores([])
        setShowGanadores(false)
        setShowContador(true)

        const interval = setInterval(() => {
          setContador((prev) => {
            if (prev <= 0) {
              clearInterval(interval)
              resolve(true)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }, 1500)
    })

    // Ejecutar ambas operaciones en paralelo
    const [winnersResult] = await Promise.all([
      getWinners(Number(context.winners)),
      countdownPromise
    ])

    setGanadores(winnersResult.winners)
    setShowGanadores(true)
  }

  return (
    <>
      <Confetti
        width={1920}
        height={968}
        run={offConfeti}
        recycle={showConfetti}
        numberOfPieces={400}
        className='absolute'
      />

      <section className='relative flex flex-col w-full col-start-2'>
        <div className='flex justify-center w-full p-2'>
          <Image
            src='/assets/logo.png'
            alt='Fiesta nacional del inmigrante y las colectividades.'
            width={400}
            height={350}
          />
        </div>

        <div className='w-full min-w-96 min-h-96 flex flex-col items-center gap-y-4'>
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
                  transition={{ duration: 0.5, delay: 0.2 }}
                  aria-live='polite'
                  className='mt-20'
                >
                  <Countdown1 />
                  {/* <Countdown2 count={count} progress={progress} /> */}
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        </div>
      </section>
    </>
  )
}
