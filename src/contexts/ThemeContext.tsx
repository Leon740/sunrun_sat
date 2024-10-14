import { createContext, ReactNode, useContext } from 'react';
import { ITheme, useTheme } from '../hooks/useTheme';

const ThemeContext = createContext<ITheme | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
};

interface IThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: IThemeProviderProps) {
  const { isLight } = useTheme();

  return <ThemeContext.Provider value={{ isLight }}>{children}</ThemeContext.Provider>;
}
