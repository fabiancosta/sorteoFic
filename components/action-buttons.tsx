import { ActionButtonsPros } from '@/interfaces/components'
import { Button } from './ui/button'

export const ActionButtons = ({
  handleRecargar,
  handleEmpezarSorteo,
  cargando
}: ActionButtonsPros) => {
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
    </div>
  )
}
