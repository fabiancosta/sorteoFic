export interface ParticipantData {
  dni: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  position: number
  timestamp: string
}

export interface WinnersList {
  participants: string[]
  winners: ParticipantData[]
}

export interface ParticipantsList {
  participants: ParticipantData[]
}
