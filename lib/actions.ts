'use server'
import { ParticipantsList, WinnersList } from '@/interfaces/actions'

const WINNERS_URL = process.env.NEXT_PUBLIC_GET_WINNERS as string
const API_KEY = process.env.NEXT_PUBLIC_API_KEY_WINNERS as string
const PARTICIPANTS_URL = process.env.NEXT_PUBLIC_GET_PARTICIPANTS as string

// Simula una llamada a la base de datos para obtener participantes
async function getParticipants(players: number): Promise<ParticipantsList> {
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
  // Aquí normalmente harías una llamada a tu base de datos
  const response = await fetch(`${WINNERS_URL}?winners=${players}`, {
    headers: {
      'X-Api-Key': API_KEY
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))

  return response
}

// Llama a la API para obtener el listado nuevo de participantes.
export async function reloadParticipants(players: number = 15) {
  const { participants } = await getParticipants(players)
  return participants
}
