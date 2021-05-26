import { createContext } from 'react'

export const defaultContext = {
  profile: {}
}

export const AppContext = createContext(defaultContext)
