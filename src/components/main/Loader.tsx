import { ReactNode, useEffect, useState } from 'react';
import { Fallback } from './Fallback';

interface ILoaderProps {
  children: ReactNode;
}

export function Loader({ children }: ILoaderProps) {
  const [isLoadingSt, setIsLoadingSt] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoadingSt(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Fallback isLoading={isLoadingSt} />

      {children}
    </>
  );
}
