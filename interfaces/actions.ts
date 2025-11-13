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

export interface AddParticipantResponse {
  identificador: string
  status: string
}
export interface AddParticipantError {
  message: string
  statusCode: string
}

export interface TeamParticipants {
  position: number
  teamId: number
  teamName: string
}
