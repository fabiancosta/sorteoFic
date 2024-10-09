'use client'
import { Winner } from '@/interfaces/actions'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award } from 'lucide-react'

type WinnerListProp = {
  winners: Winner[]
}
export const WinnerList = ({ winners }: WinnerListProp) => {
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

  const getIcon = (lugar: number) => {
    switch (lugar) {
      case 1:
        return <Trophy className='w-8 h-8 text-yellow-500' />
      case 2:
        return <Medal className='w-7 h-7 text-gray-400' />
      case 3:
        return <Medal className='w-6 h-6 text-amber-800' />
      default:
        return <Award className='w-5 h-5 text-blue-500' />
    }
  }

  return (
    <div className='flex items-center justify-center p-4'>
      <motion.div
        className='bg-white rounded-lg shadow-xl p-8 w-[480px] h-[520px] max-w-2xl'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800'>
          Ganadores del Sorteo
        </h1>
        <motion.ul
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='space-y-4'
        >
          {winners.map((winner) => (
            <motion.li
              key={winner.position}
              variants={itemVariants}
              className={`flex items-center p-4 rounded-lg ${
                winner.position === 1
                  ? 'bg-gradient-to-r from-yellow-300 to-yellow-500'
                  : winner.position === 2
                  ? 'bg-gradient-to-r from-gray-300 to-gray-400 shadow-sm '
                  : winner.position === 3
                  ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 shadow-sm '
                  : 'bg-gray-100 hover:bg-gray-200 transition-colors duration-300'
              }`}
            >
              <span className='text-2xl font-bold mr-4 w-8 text-center'>
                {winner.position}
              </span>
              {getIcon(winner.position)}
              <span
                className={`ml-4 text-gray-800 ${
                  winner.position < 3 ? 'text-xl font-semibold' : 'text-lg'
                }`}
              >
                {winner.lastName + ' ' + winner.firstName}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}
