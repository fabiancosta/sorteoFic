import { User } from './actions'

export interface CountdownProps {
  count: number
  progress: number
}

export interface WinnersProps {
  winners: User[]
}
