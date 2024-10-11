export interface SessionStorageContextType {
  winners: number
  apiKey: string
  updateWinnersValue: (value: number) => void
  updateKeyValue: (value: string) => void
}
