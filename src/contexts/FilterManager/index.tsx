import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react'

interface State {
  data: Record<string, any>
}

type Action =
  | { type: 'UPDATE_DATA'; payload: Record<string, any> }
  | { type: 'RESET_DATA' }
  | { type: 'UPDATE_PROPERTY'; payload: { key: string; value: any } }

const initialState: State = {
  data: {},
}

const DataStateContext = createContext<State | undefined>(undefined)
const DataDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined)

function dataReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: action.payload }
    case 'RESET_DATA':
      return initialState
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.key]: action.payload.value,
        },
      }
    default:
      return state
  }
}

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState)

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_DATA' })
    }
  }, [])

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>{children}</DataDispatchContext.Provider>
    </DataStateContext.Provider>
  )
}

const useDataState = () => {
  const context = useContext(DataStateContext)
  if (context === undefined) {
    throw new Error('useDataState must be used within a DataProvider')
  }
  return context
}

const useDataDispatch = () => {
  const context = useContext(DataDispatchContext)
  if (context === undefined) {
    throw new Error('useDataDispatch must be used within a DataProvider')
  }
  return context
}

const useResetDispatch = () => {
  const context = useContext(DataDispatchContext)

  return context
}

export { DataProvider, useDataState, useDataDispatch }
