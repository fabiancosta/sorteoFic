'use client'
import React, { createContext, useState, useEffect } from 'react'

// Creamos el contexto
export const SessionStorageContext = createContext({})

// Proveedor del contexto
export const SessionStorageProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [winners, setWinners] = useState('3')
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    const storedNumber = sessionStorage.getItem('winnersValue')
    const storedPassword = sessionStorage.getItem('apiKeyValue')

    if (storedNumber) {
      setWinners(storedNumber)
    }
    if (storedPassword) {
      setApiKey(storedPassword)
    }
  }, [])

  const updateNumberValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setWinners(newValue)
    sessionStorage.setItem('winnersValue', newValue)
  }

  const updatePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setApiKey(newValue)
    sessionStorage.setItem('apiKeyValue', newValue)
  }

  return (
    <SessionStorageContext.Provider
      value={{
        winners,
        apiKey,
        updateNumberValue,
        updatePasswordValue
      }}
    >
      {children}
    </SessionStorageContext.Provider>
  )
}
