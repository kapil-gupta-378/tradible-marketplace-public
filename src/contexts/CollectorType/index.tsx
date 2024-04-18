import { createContext, useContext, useState, ReactNode } from 'react'

// Define the collector type enum
export enum CollectorType {
  PRO = 'PRO',
  COLLECTOR = 'COLLECTOR',
}

// Define the context type
interface CollectorTypeContextType {
  collectorType: CollectorType
  setCollectorType: (type: CollectorType) => void
}

// Create the context
const CollectorTypeContext = createContext<CollectorTypeContextType | undefined>(undefined)

const CollectorTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collectorType, setCollectorType] = useState<CollectorType>(CollectorType.COLLECTOR)

  return (
    <CollectorTypeContext.Provider value={{ collectorType, setCollectorType }}>
      {children}
    </CollectorTypeContext.Provider>
  )
}

const useCollectorTypeContext = () => {
  const context = useContext(CollectorTypeContext)
  if (!context) {
    throw new Error('useCollectorTypeContext must be used within a CollectorTypeProvider')
  }
  return context
}

export { CollectorTypeProvider, useCollectorTypeContext }
