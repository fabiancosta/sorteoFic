'use client'
import { SessionStorageContext } from '@/context/session-provider'
import { ActionButtonsPros } from '@/interfaces/components'
import { useContext } from 'react'
import { SettingsButton } from './config-button'
import { Button } from './ui/button'

export const ActionButtons = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRecargar,
  handleEmpezarSorteo,
  cargando
}: ActionButtonsPros) => {
  const { apiKey } = useContext(SessionStorageContext)

  return (
    <div className='flex space-x-4'>
      {/* <Button
        variant='outline'
        onClick={handleRecargar}
        className='text-lg font-bold'
        disabled={cargando || apiKey.length < 10}
      >
        Recargar
      </Button> */}
      <Button
        variant='outline'
        onClick={handleEmpezarSorteo}
        className='text-lg font-bold'
        disabled={cargando || apiKey.length < 10}
      >
        Empezar
      </Button>
      <SettingsButton />
    </div>
  )
}
