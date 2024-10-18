import { ReactNode, useEffect, useState } from 'react';
import { Fallback } from 'src/components/main/indexOLD';

interface ILoaderProps {
  children: ReactNode;
}

export function Loader({ children }: ILoaderProps) {
  // loaderData
  const LOADERS: {
    textLabel: string;
    textColor: string;
    gradient: string;
  }[] = [
    {
      textLabel: 'We <br />  love <br /> people',
      textColor: 'text-dark_navy',
      gradient: 'from-sky_blue to-yellow'
    },
    {
      textLabel: 'We <br />  love to <br /> create',
      textColor: 'text-white',
      gradient: 'from-orange to-yellow'
    },
    {
      textLabel: 'We <br />  love <br /> to run',
      textColor: 'text-white',
      gradient: 'from-light_navy to-white'
    }
  ];

  // loaderLogic
  const activeLoaderIndex = Math.floor(Math.random() * 3);
  const activeLoader = LOADERS[activeLoaderIndex];

  const [isLoadingSt, setIsLoadingSt] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoadingSt(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return isLoadingSt ? (
    <Fallback
      gradient={activeLoader.gradient}
      textColor={activeLoader.textColor}
      textLabel={activeLoader.textLabel}
    />
  ) : (
    children
  );
}
