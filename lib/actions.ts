'use server'
import { setTimeout } from 'timers/promises'

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
  // Aquí normalmente harías una llamada a tu base de datos
  return users
}

async function getWinners(winners: number) {
  // Aquí normalmente harías una llamada a tu base de datos
  return users.slice(0, winners)
}

// Llama a la API para obtener el listado nuevo de participantes.
export async function reloadParticipants() {
  const participants = await getParticipants()
  return participants
}

export async function startDraw() {
  const participants = await getWinners(5)
  await setTimeout(5000) // Espera 10 segundos

  // Selecciona 5 ganadores al azar.
  const winners = []
  const availableParticipants = [...participants]
  while (winners.length < 5 && availableParticipants.length > 0) {
    const index = Math.floor(Math.random() * availableParticipants.length)
    winners.push(availableParticipants[index])
    availableParticipants.splice(index, 1)
  }

  return winners
}
