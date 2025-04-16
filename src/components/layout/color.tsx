import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeColors, ThemeColorStateParams } from '@/types/theme-types'
import { ThemeProviderProps } from 'next-themes'
import setGlobalColorTheme from '@/lib/theme-colors'
import { useTheme } from './theme'

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams
)

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = () => {
    try {
      return (localStorage.getItem('themeColor') as ThemeColors) || 'Telegram'
    } catch {
      return 'Telegram' as ThemeColors
    }
  }

  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSavedThemeColor() as ThemeColors
  )
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor)
    setGlobalColorTheme(theme as 'light' | 'dark', themeColor)

    if (!isMounted) {
      setIsMounted(true)
    }
    // eslint-disable-next-line
  }, [themeColor, theme])

  if (!isMounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  )
}
// eslint-disable-next-line
export function useThemeContext() {
  return useContext(ThemeContext)
}
