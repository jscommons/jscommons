import { createContext } from 'react'

export const defaultContext = {
  account: {}
}

export const AppContext = createContext(defaultContext)
