import { SetStateAction } from 'react'

export interface CountdownProps {
  count: number
  progress: number
}

export interface ActionButtonsPros {
  definirGanadores: number
  setDefinirGanadores: React.Dispatch<SetStateAction<number>>
  handleRecargar: () => void
  handleEmpezarSorteo: () => void
  cargando: boolean
}
