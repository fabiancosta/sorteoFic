import { Countdown } from '@/components/countdown'
import { AnimatePresence, motion } from 'framer-motion'

export const CountdownSection = ({
  showContador
}: {
  showContador: boolean
}) => (
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
        <Countdown colorCount='text-azul' colorcircle='text-verde' />
      </motion.div>
    )}
  </AnimatePresence>
)
