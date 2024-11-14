import { useState, useEffect } from 'react'

export const useCountdownV1 = (initialCount: number, duration: number) => {
  const [count, setCount] = useState(initialCount)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [count])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 100 / (duration * 60)
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(interval)
  }, [duration])

  return { count, progress }
}

export const useCountdownV2 = (
  initialCount: number,
  duration: number,
  isCounting: boolean
) => {
  const [count, setCount] = useState(initialCount)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isCounting) {
      setProgress(0) // Reiniciar el progreso
      return // Solo contar cuando isCounting sea true
    }
    setCount(initialCount) // Reiniciar el contador al valor inicial

    const countInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1
        }
        clearInterval(countInterval)
        return prevCount
      })
    }, 1000)

    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        // Ajustamos la velocidad para que termine un poco antes
        const newProgress = oldProgress + 100 / ((duration + 2) * 60)
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 1000 / 60) // 60 FPS

    return () => {
      clearInterval(countInterval)
      clearInterval(progressInterval)
    }
  }, [initialCount, duration, isCounting])

  return { count, progress }
}
