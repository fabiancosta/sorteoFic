import Participants from '@/components/participants'
import { type ParticipantProps } from '@/interfaces/components'
import { AnimatePresence, motion } from 'framer-motion'

export const ParticipantsSection = ({
  hideParticipants,
  participants
}: ParticipantProps) => (
  <AnimatePresence mode='wait'>
    {!hideParticipants && participants.length > 0 ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Participants participants={participants} />
      </motion.div>
    ) : null}
  </AnimatePresence>
)
