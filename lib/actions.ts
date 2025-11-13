'use client'
import type {
  AddParticipantError,
  AddParticipantResponse,
  ParticipantsList,
  TeamParticipants
} from '@/interfaces/actions'
import { type ParticipantSchemaType } from '@/schemas/form-sorteo'

const API_VAR = {
  PARTICIPANTS_URL: process.env.NEXT_PUBLIC_GET_PARTICIPANTS as string,
  ADD_PARTICIPANT: process.env.NEXT_PUBLIC_ADD_PARTICIPANT as string,
  LIST_ORDER: process.env.NEXT_PUBLIC_GET_TEAMS_ORDER as string
}

export async function addParticipant(
  data: ParticipantSchemaType
): Promise<AddParticipantError | AddParticipantResponse> {
  try {
    const response = await fetch(API_VAR.ADD_PARTICIPANT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      const newParticipant = (await response.json()) as AddParticipantResponse
      return newParticipant
    } else {
      const errorAdding = (await response.json()) as AddParticipantError
      return errorAdding
    }
  } catch (error) {
    throw error
  }
}
export async function getWinners(
  players: number = 3
): Promise<TeamParticipants[]> {
  const API_KEY = sessionStorage.getItem('apiKeyValue') as string

  const response = await fetch(API_VAR.LIST_ORDER, {
    method: 'POST',
    headers: {
      'X-Api-Key': API_KEY
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))

  console.log(response, players)

  return response
}

async function getParticipants(players: number): Promise<ParticipantsList> {
  const API_KEY = sessionStorage.getItem('apiKeyValue') as string
  const response = await fetch(
    `${API_VAR.PARTICIPANTS_URL}?quantity=${players}`,
    {
      headers: {
        'X-Api-Key': API_KEY
      }
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error))

  return response
}

export async function reloadParticipants(players: number = 15) {
  const { participants } = await getParticipants(players)
  return participants
}
