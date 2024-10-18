import { Button } from './Button';
import { Icon, TIcons } from '@/components/general';

interface IFormButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  ariaLabel: string;
  disabled?: boolean;
  className?: string;
  bg: 'bg-white' | 'bg-orange' | 'bg-yellow' | 'bg-green' | 'bg-red';
  handleOnClick: () => void;
  icon: TIcons;
  iconClassName?: string;
  label: string;
}

export function FormButton({
  type,
  ariaLabel,
  disabled = false,
  className = '',
  bg,
  handleOnClick,
  icon,
  iconClassName = '',
  label
}: IFormButtonProps) {
  return (
    <Button
      type={type}
      ariaLabel={ariaLabel}
      disabled={disabled}
      handleOnClick={handleOnClick}
      className={`flex flex-row items-center gap-8 py-8 px-16 rounded-8 max-w-max text-16 text-dark_navy ${bg} ${className}`}
    >
      <Icon icon={icon} className={iconClassName} />
      <span>{label}</span>
    </Button>
  );
}
