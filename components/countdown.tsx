'use client'
import { CountdownProps } from '@/interfaces/components'

export default function Countdown({ count, progress }: CountdownProps) {
  const showNumber = count >= 0 || progress < 100 // Ajustamos el umbral para ocultar el número

  return (
    <div className='relative w-64 h-64'>
      <svg className='w-full h-full' viewBox='0 0 100 100'>
        <circle
          className='text-gray-500'
          strokeWidth='8'
          stroke='currentColor'
          fill='transparent'
          r='45'
          cx='50'
          cy='50'
        />
        <circle
          className='text-azul-foreground transition-all duration-20 ease-linear'
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
        {showNumber && (
          <span className='text-7xl font-bold text-azul-foreground'>
            {count}
          </span>
        )}
      </div>
    </div>
  )
}
