'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { reloadParticipants, startDraw, User } from '../lib/actions'
import { motion, AnimatePresence } from 'framer-motion'

export default function Sorteo() {
  const [participantes, setParticipantes] = useState<User[]>([])
  const [ganadores, setGanadores] = useState<User[]>([])
  const [contador, setContador] = useState(5)
  const [cargando, setCargando] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showGanadores, setShowGanadores] = useState(false)
  const [showContador, setShowContador] = useState(false)
  const router = useRouter()

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
    const nuevosParticipantes = await reloadParticipants()
    //Simular el pedido a la API
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
    const interval = setInterval(() => {
      setContador((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
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
    <main className='container mx-auto p-4'>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={showConfetti}
        className={`${
          showConfetti === false
            ? 'transition-opacity duration-4000 opacity-0'
            : 'transition-opacity duration-4000 opacity-100'
        }`}
      />
      <Card className='flex flex-col items-center min-h-screen p-4 gap-y-8'>
        <CardHeader>
          <CardTitle className='text-7xl'>Gran Sorteo FIC 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex space-x-4 mb-4'>
            <Button onClick={handleRecargar} disabled={cargando}>
              Recargar
            </Button>
            <Button onClick={handleEmpezarSorteo} disabled={cargando}>
              Empezar
            </Button>
          </div>
          <AnimatePresence mode='wait'>
            {showContador && (
              <motion.div
                key='contador'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='text-center text-4xl font-bold mb-4'
                aria-live='polite'
              >
                {contador}
              </motion.div>
            )}
            {showGanadores && (
              <motion.div
                key='ganadores'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <h2 className='text-2xl font-bold mb-2'>Ganadores:</h2>
                <ol className='list-decimal list-inside'>
                  {ganadores.map((ganador, index) => (
                    <li
                      key={ganador.id}
                      className={`mb-2 ${
                        index === 0
                          ? 'text-2xl font-bold'
                          : index === 1
                          ? 'text-xl font-semibold'
                          : 'text-lg'
                      }`}
                    >
                      {ganador.nombre}
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
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
        </CardContent>
      </Card>
    </main>
  )
}
