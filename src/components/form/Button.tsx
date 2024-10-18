import { ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
  handleOnClick?: (event?: MouseEvent) => void;
  handleOnFocus?: () => void;
  handleOnBlur?: () => void;
}

export function Button({
  children,
  type = 'button',
  ariaLabel = '',
  disabled = false,
  className = '',
  handleOnClick = () => {},
  handleOnFocus = () => {},
  handleOnBlur = () => {}
}: IButtonProps) {
  const handleButtonOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event.target);
    handleOnClick();
  };

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={(event) => handleButtonOnClick(event)}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      className={`flex ${className}`}
      tabIndex={0}
    >
      {children}
    </button>
  );
}
