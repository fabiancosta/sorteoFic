import { type ConfettiProps } from '@/interfaces/components'
import Confetti from 'react-confetti'

export const ConfettiSection = ({
  offConfeti,
  showConfetti
}: ConfettiProps) => (
  <Confetti
    width={1920}
    height={1080}
    run={offConfeti}
    recycle={showConfetti}
    numberOfPieces={400}
    className='absolute'
  />
)
