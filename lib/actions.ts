'use server'
import { PromiseParticipants } from '@/interfaces/actions'

const GET_WINNERS_URL = process.env.NEXT_PUBLIC_GET_WINNERS as string
const GET_WINNERS_API_KEY = process.env.NEXT_PUBLIC_API_KEY_WINNERS as string

// Lista de usuarios proporcionada
const users = [
  { id: 1, nombre: 'Kevin soria' },
  { id: 2, nombre: 'Emilia granata' },
  { id: 3, nombre: 'conquiista desierta' },
  { id: 4, nombre: 'gran general roca' },
  { id: 5, nombre: 'urquiza e iriburu' },
  { id: 6, nombre: 'don rodolfo buenaparte' }
]

// Simula una llamada a la base de datos para obtener participantes
async function getParticipants() {
  return users
}

export async function getWinners(
  players: number
): Promise<PromiseParticipants> {
  // Aquí normalmente harías una llamada a tu base de datos
  const response = await fetch(`${GET_WINNERS_URL}?winners=${players}`, {
    headers: {
      'X-Api-Key': GET_WINNERS_API_KEY
    }
  }).then((res) => res.json())

  return response
}

// Llama a la API para obtener el listado nuevo de participantes.
export async function reloadParticipants() {
  const participants = await getParticipants()
  return participants
}
