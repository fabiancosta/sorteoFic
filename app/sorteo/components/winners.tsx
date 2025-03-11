import { WinnerList } from '@/components/winner-list'
import { WinnersProps } from '@/interfaces/components'
import { AnimatePresence } from 'framer-motion'

export const WinnersSection = ({ showGanadores, ganadores }: WinnersProps) => (
  <AnimatePresence mode='wait'>
    {showGanadores && <WinnerList winners={ganadores} />}
  </AnimatePresence>
)
