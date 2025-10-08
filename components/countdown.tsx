'use client'
import { useCountdown } from '@/hooks/use-coundown'
import { CountdownProps } from '@/interfaces/components'

export const Countdown = ({ colorcircle, colorCount }: CountdownProps) => {
  const { count, progress } = useCountdown(5, 5)

  return (
    <div className='relative w-64 h-64'>
      <svg className='w-full h-full' viewBox='0 0 100 100'>
        <circle
          className={colorcircle}
          strokeWidth='8'
          stroke='currentColor'
          fill='transparent'
          r='45'
          cx='50'
          cy='50'
        />
        <circle
          className='text-background transition-all duration-100 ease-linear'
          strokeWidth='8'
          stroke='currentColor'
          fill='transparent'
          r='45'
          cx='50'
          cy='50'
          strokeDasharray={`${(1 - progress / 100) * 283} 283`}
          strokeDashoffset='0'
          transform='rotate(-90 50 50)'
        />
      </svg>
      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
        <span className={`text-6xl font-bold text-background ${colorCount}`}>
          {count}
        </span>
      </div>
    </div>
  )
}
