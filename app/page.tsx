'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Countdown from '@/components/countdown'
import { reloadParticipants, startDraw } from '../lib/actions'
import { useCountdown } from '@/hooks/use-coundown'
import { WinnerList } from '@/components/winner-list'
import { User } from '@/interfaces/actions'

export default function Sorteo() {
  const [participantes, setParticipantes] = useState<User[]>([])
  const [ganadores, setGanadores] = useState<User[]>([])
  const [contador, setContador] = useState(5)
  const [cargando, setCargando] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showGanadores, setShowGanadores] = useState(false)
  const [showContador, setShowContador] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const router = useRouter()

  const { count, progress } = useCountdown(
    isCounting ? contador : 0,
    contador,
    isCounting
  )

  useEffect(() => {
    if (contador === 0) {
      setShowConfetti(true)
      setShowContador(false)
      setTimeout(() => {
        setShowGanadores(true)
        setCargando(false) // Habilita el botón de recargar
      }, 500)
    }
  }, [contador])

  const handleRecargar = async () => {
    setShowConfetti(false)
    setShowGanadores(false)
    setShowContador(false)
    setGanadores([])
    setCargando(true)
    setIsCounting(false)
    setContador(5)
    //Simular el pedido a la API
    const nuevosParticipantes = await reloadParticipants()
    setTimeout(() => {
      setParticipantes(nuevosParticipantes)
      setCargando(false)
    }, 2000)
    router.refresh()
  }

  const handleEmpezarSorteo = async () => {
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
    const nuevosGanadores = await startDraw()
    setTimeout(() => {
      setGanadores(nuevosGanadores)
    }, 1200)
  }

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={showConfetti}
        className={`${
          showConfetti === false
            ? 'transition-opacity duration-10000 opacity-0'
            : 'transition-opacity duration-0 opacity-100'
        }`}
      />

      <section className='relative flex flex-col w-full col-start-2'>
        <Image
          src={'/assets/fondo-fic.png'}
          alt='Sponsors FIC Parte 1'
          width={1500}
          height={1080}
          className='absolute h-full w-full object-cover opacity-30 -z-10'
          //bg-fic bg-cover bg-center
        />

        <div className='flex justify-center w-full p-4'>
          <Image
            src='/assets/logo-fic.png'
            alt='Fiesta nacional del inmigrante y las colectividades.'
            width={600}
            height={220}
          />
        </div>

        <div className='w-full min-h-96 flex flex-col items-center gap-y-8'>
          <div className='flex space-x-4'>
            <Button
              variant='secondary'
              onClick={handleRecargar}
              className='text-lg'
              disabled={cargando}
            >
              Recargar
            </Button>
            <Button
              variant='secondary'
              onClick={handleEmpezarSorteo}
              className='text-lg'
              disabled={cargando}
            >
              Empezar
            </Button>
          </div>

          <article>
            <AnimatePresence mode='wait'>
              {showContador && (
                <motion.div
                  key='contador'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  aria-live='polite'
                  className='mt-20'
                >
                  <Countdown count={count} progress={progress} />
                </motion.div>
              )}
              {showGanadores && <WinnerList winners={ganadores} />}
            </AnimatePresence>

            <AnimatePresence>
              {participantes.length > 0 && !cargando && !ganadores && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className='text-xl font-bold mb-2'>Participantes:</h2>
                  <ul>
                    {participantes.map((participante) => (
                      <li key={participante.id}>{participante.nombre}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        </div>
      </section>
    </>
  )
}
