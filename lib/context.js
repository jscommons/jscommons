import { createContext } from 'react'

export const defaultContext = {
  profile: null
}

export const AppContext = createContext(defaultContext)
