'use client'
import { SessionStorageContextType } from '@/interfaces/contexts'
import React, { createContext, useState, useEffect } from 'react'

// Creamos el contexto
export const SessionStorageContext = createContext<SessionStorageContextType>({
  winners: 3,
  apiKey: '',
  updateWinnersValue: () => {},
  updateKeyValue: () => {}
})

// Proveedor del contexto
export const SessionStorageProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [winners, setWinners] = useState(3)
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    const storedNumber = sessionStorage.getItem('winnersValue')
    const storedPassword = sessionStorage.getItem('apiKeyValue')

    if (storedNumber) {
      setWinners(Number(storedNumber))
    }
    if (storedPassword) {
      setApiKey(storedPassword)
    }
  }, [])

  const updateWinnersValue = (value: number) => {
    const newValue = value
    setWinners(value)
    sessionStorage.setItem('winnersValue', String(newValue))
  }

  const updateKeyValue = (value: string) => {
    const newValue = value
    setApiKey(value)
    sessionStorage.setItem('apiKeyValue', newValue)
  }

  return (
    <SessionStorageContext.Provider
      value={{
        winners,
        apiKey,
        updateWinnersValue,
        updateKeyValue
      }}
    >
      {children}
    </SessionStorageContext.Provider>
  )
}
