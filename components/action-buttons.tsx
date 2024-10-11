'use client'
import { ActionButtonsPros } from '@/interfaces/components'
import { Button } from './ui/button'
import { SettingsButton } from './config-button'
import { SessionStorageContext } from '@/context/session-provider'
import { useContext } from 'react'

export const ActionButtons = ({
  handleRecargar,
  handleEmpezarSorteo,
  cargando
}: ActionButtonsPros) => {
  const { apiKey } = useContext(SessionStorageContext)

  return (
    <div className='flex space-x-4'>
      <Button
        variant='secondary'
        onClick={handleRecargar}
        className='text-lg font-bold'
        disabled={cargando || apiKey.length < 10}
      >
        Recargar
      </Button>
      <Button
        variant='secondary'
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
