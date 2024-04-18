/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import { ReactNode, createContext, useReducer } from 'react'

interface LoaderState {
  isLoad: boolean
}

const initialValues: LoaderState = {
  isLoad: false,
}

function authReducer(state: LoaderState, action: boolean): LoaderState {
  return { ...state, isLoad: action }
}

export const LoaderContext = createContext<{
  state: LoaderState
  showLoader: React.Dispatch<boolean>
}>({ state: initialValues, showLoader: () => {} })

export const LoaderContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, showLoader] = useReducer(authReducer, initialValues)

  return <LoaderContext.Provider value={{ state, showLoader }}>{children}</LoaderContext.Provider>
}
