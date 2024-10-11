'use client'
import { ParticipantsList, WinnersList } from '@/interfaces/actions'

const WINNERS_URL = process.env.NEXT_PUBLIC_GET_WINNERS as string
const PARTICIPANTS_URL = process.env.NEXT_PUBLIC_GET_PARTICIPANTS as string

async function getParticipants(players: number): Promise<ParticipantsList> {
  const API_KEY = sessionStorage.getItem('apiKeyValue') as string //process.env.NEXT_PUBLIC_API_KEY_WINNERS as string
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
