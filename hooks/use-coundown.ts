import { useEffect, useState } from 'react'

export const useCountdown = (initialCount: number, duration: number) => {
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
