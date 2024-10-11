'use client'
import { ActionButtonsPros } from '@/interfaces/components'
import { Button } from './ui/button'
import { Input } from './ui/input'
// import { SettingsButton } from './config-button'

export const ActionButtons = ({
  definirGanadores,
  setDefinirGanadores,
  handleRecargar,
  handleEmpezarSorteo,
  cargando
}: ActionButtonsPros) => {
  const handleWinners = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefinirGanadores(Number(e.target.value))
  }
  return (
    <div className='flex space-x-4'>
      <Button
        variant='secondary'
        onClick={handleRecargar}
        className='text-lg font-bold'
        disabled={cargando}
      >
        Recargar
      </Button>
      <Button
        variant='secondary'
        onClick={handleEmpezarSorteo}
        className='text-lg font-bold'
        disabled={cargando}
      >
        Empezar
      </Button>
      {/* <SettingsButton /> */}
      <Input
        type='number'
        className='text-lg font-bold max-w-16'
        defaultValue={definirGanadores}
        onChange={(e) => handleWinners(e)}
      />
    </div>
  )
}
