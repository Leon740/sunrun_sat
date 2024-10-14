import { useState, useEffect } from 'react';

export interface ITheme {
  isLight: boolean;
}

export function useTheme(): ITheme {
  const [themeSt, setThemeSt] = useState<'dark' | 'light'>(() => 'light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setThemeSt(mediaQuery.matches ? 'dark' : 'light');

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setThemeSt(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  return { isLight: themeSt === 'light' };
}
