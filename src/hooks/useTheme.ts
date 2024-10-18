import { useState, useEffect } from 'react';

export interface ITheme {
  isLight: boolean;
  textColor: 'text-dark_navy' | 'text-white';
}

export function useTheme(): ITheme {
  const [themeSt, setThemeSt] = useState<'dark' | 'light'>('light');
  const isLight = themeSt === 'light';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setThemeSt(mediaQuery.matches ? 'dark' : 'light');

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setThemeSt(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  return { isLight, textColor: isLight ? 'text-dark_navy' : 'text-white' };
}
