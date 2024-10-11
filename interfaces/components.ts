export interface CountdownProps {
  count: number
  progress: number
}

export interface ActionButtonsPros {
  handleRecargar: () => void
  handleEmpezarSorteo: () => void
  cargando: boolean
}
