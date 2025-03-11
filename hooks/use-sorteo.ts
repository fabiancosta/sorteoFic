import { SessionStorageContext } from '@/context/session-provider'
import { type ParticipantData } from '@/interfaces/actions'
import { getWinners, reloadParticipants } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export const useSorteo = () => {
  const [participants, setParticipants] = useState<ParticipantData[]>([])
  const [winners, setWinners] = useState<ParticipantData[]>([])
  const [counter, setCounter] = useState(5)
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showWinners, setShowWinners] = useState(false)
  const [showCounter, setShowCounter] = useState(false)

  const [hideParticipants, setHideParticipants] = useState(false)
  const [offConfeti, setOffConfeti] = useState(false)
  const router = useRouter()
  const context = useContext(SessionStorageContext)

  useEffect(() => {
    if (counter === 0) {
      setOffConfeti(true)
      setShowConfetti(true)
      setShowCounter(false)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [counter])

  const handleReload = async () => {
    setParticipants([])
    setTimeout(() => {
      setHideParticipants(false)
    }, 2000)
    setShowConfetti(false)
    setShowWinners(false)
    setShowCounter(false)
    setWinners([])
    setLoading(true)
    setCounter(5)

    const newParticipants = await reloadParticipants()
    setTimeout(() => {
      setParticipants(newParticipants)
      setLoading(false)
    }, 500)
    router.refresh()
  }

  const handleStart = async () => {
    setHideParticipants(true)

    const countdownPromise = new Promise((resolve) => {
      setTimeout(() => {
        setLoading(true)
        setCounter(5)
        setWinners([])
        setShowWinners(false)
        setShowCounter(true)

        const interval = setInterval(() => {
          setCounter((prev) => {
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

    const [winnersResult] = await Promise.all([
      getWinners(Number(context.winners)),
      countdownPromise
    ])

    setWinners(winnersResult.winners)
    setShowWinners(true)
  }

  return {
    participants,
    winners,
    counter,
    loading,
    showConfetti,
    showWinners,
    showCounter,
    hideParticipants,
    offConfeti,
    handleReload,
    handleStart
  }
}
