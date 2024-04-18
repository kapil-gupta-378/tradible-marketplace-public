import { createContext, useContext, useState, ReactNode } from 'react'

import { ThemeContextType } from 'contexts/interface'
import { LOCAL_THEME } from 'utils'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<string>(localStorage.getItem(LOCAL_THEME) || 'light')

  const handleToggleThemeMode = () => {
    setThemeMode(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return <ThemeContext.Provider value={{ themeMode, handleToggleThemeMode }}>{children}</ThemeContext.Provider>
}

const useSwitchThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useSwitchThemeContext must be used within a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useSwitchThemeContext }
