import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react'

import { OverlayContextType } from 'contexts/interface'
import useToggle from 'hooks/useToggle'

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [overlayVisible, , , turnOnOverlay, turnOffOverlay] = useToggle(false)

  const handleOnOverlay = useCallback(() => {
    turnOnOverlay()
  }, [overlayVisible])

  const handleOffOverlay = useCallback(() => {
    turnOffOverlay()
  }, [overlayVisible])

  return (
    <OverlayContext.Provider value={{ overlayVisible, handleOffOverlay, handleOnOverlay }}>
      {children}
    </OverlayContext.Provider>
  )
}
const useOverlayContext = () => {
  const context = useContext(OverlayContext)
  if (!context) {
    throw new Error('useOverlayContext must be used within an OverlayProvider')
  }
  return context
}

export { OverlayProvider, useOverlayContext }
