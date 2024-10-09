import { User } from './actions'

export interface CountdownProps {
  count: number
  progress: number
}

export interface WinnersProps {
  winners: User[]
}

export interface ActionButtonsPros {
  handleRecargar: () => void
  handleEmpezarSorteo: () => void
  cargando: boolean
}

export interface ParticipantFlagsProps {
  participants: User[]
}
