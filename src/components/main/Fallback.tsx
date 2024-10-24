import { useState } from 'react';

interface IFallbackProps {
  isLoading: boolean;
  errorLabel?: string;
}

export function Fallback({ isLoading = true, errorLabel }: IFallbackProps) {
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

  // () =>
  // makes state do not update between renders
  const [activeLoaderIndexSt] = useState(() => Math.floor(Math.random() * 3));
  const activeLoader = LOADERS[activeLoaderIndexSt];

  return (
    <section
      className={`absolute top-0 left-0 w-full h-full z-50 transition duration-500 ${
        isLoading ? '' : '-translate-y-full'
      } bg-gradient-to-t ${activeLoader.gradient}`}
    >
      <h1
        className={`font-roobert_bold text-48 leading-none uppercase absolute bottom-64 left-64 ${activeLoader.textColor}`}
        dangerouslySetInnerHTML={{ __html: errorLabel ? errorLabel : activeLoader.textLabel }}
      />
    </section>
  );
}
