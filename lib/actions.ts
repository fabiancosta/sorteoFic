'use server'
import { ParticipantsList, WinnersList } from '@/interfaces/actions'

const WINNERS_URL = process.env.NEXT_PUBLIC_GET_WINNERS as string
const API_KEY = process.env.NEXT_PUBLIC_API_KEY_WINNERS as string
const PARTICIPANTS_URL = process.env.NEXT_PUBLIC_GET_PARTICIPANTS as string

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
  const response = await fetch(`${WINNERS_URL}?winners=${players}`, {
    headers: {
      'X-Api-Key': API_KEY
    }
  })
    .then((res) => res.json())
    .catch((error) => console.log(error))

  return response
}

export async function reloadParticipants(players: number = 15) {
  const { participants } = await getParticipants(players)
  return participants
}
