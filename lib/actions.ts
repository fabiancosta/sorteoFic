'use client'
import type {
  AddParticipantError,
  AddParticipantResponse,
  ParticipantsList,
  WinnersList
} from '@/interfaces/actions'
import { type ParticipantSchemaType } from '@/schemas/form-sorteo'

const WINNERS_URL = process.env.NEXT_PUBLIC_GET_WINNERS as string
const PARTICIPANTS_URL = process.env.NEXT_PUBLIC_GET_PARTICIPANTS as string
const ADD_PARTICIPANT = process.env.NEXT_PUBLIC_ADD_PARTICIPANT as string

export async function addParticipant(
  data: ParticipantSchemaType
): Promise<AddParticipantError | AddParticipantResponse> {
  const API_KEY = sessionStorage.getItem('apiKeyValue') as string
  try {
    const response = await fetch(ADD_PARTICIPANT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY
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

async function getParticipants(players: number): Promise<ParticipantsList> {
  const API_KEY = sessionStorage.getItem('apiKeyValue') as string
  const response = await fetch(`${PARTICIPANTS_URL}?quantity=${players}`, {
    headers: {
      'X-Api-Key': API_KEY
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))

  return response
}

export async function getWinners(players: number = 3): Promise<WinnersList> {
  const API_KEY = sessionStorage.getItem('apiKeyValue') as string

  const response = await fetch(`${WINNERS_URL}?winners=${Number(players)}`, {
    headers: {
      'X-Api-Key': API_KEY
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))

  console.log(response?.winners)

  return response
}

export async function reloadParticipants(players: number = 15) {
  const { participants } = await getParticipants(players)
  return participants
}
