export type User = {
  id: number
  nombre: string
}

export interface PromiseParticipants {
  participants: string[]
  winners: Winner[]
}

export interface Winner {
  dni: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  position: number
  timestamp: string
}
