'use client'
import { TeamParticipants } from '@/interfaces/actions'
import { motion } from 'framer-motion'

export const WinnerList = ({ winners }: { winners: TeamParticipants[] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <div className='flex items-center justify-center p-2'>
      <motion.div
        className='bg-white rounded-lg shadow-xl p-6 w-[520px] h-auto max-w-2xl'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h1 className='text-4xl font-bold text-center mb-4 text-gray-800'>
          Orden de participación
        </h1>
        <motion.ul
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='space-y-2'
        >
          {winners.map((winner) => (
            <motion.li
              key={winner.position}
              variants={itemVariants}
              className={`flex items-center p-3 gap-x-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors duration-300
              `}
            >
              <span className='text-3xl font-bold w-8 text-center'>
                {winner.position}
              </span>
              <span
                className={`flex flex-col text-gray-800 truncate text-3xl font-semibold  
                `}
              >
                <p className='capitalize truncate'>{winner.teamName}</p>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}
