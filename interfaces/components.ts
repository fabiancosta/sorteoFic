import { type ParticipantData } from './actions'

export interface ActionButtonsPros {
  handleRecargar: () => void
  handleEmpezarSorteo: () => void
  cargando: boolean
}

export type ParticipantProps = {
  hideParticipants: boolean
  participants: ParticipantData[]
}

export type ConfettiProps = {
  offConfeti: boolean
  showConfetti: boolean
}

export type WinnersProps = {
  showGanadores: boolean
  ganadores: ParticipantData[]
}

export type CountdownProps = {
  colorcircle: string
  colorCount: string
}
