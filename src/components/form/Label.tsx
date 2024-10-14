import { useThemeContext } from '@/contexts';
import { Input } from './Input';

interface ILabelProps {
  name: string;
  text?: 'text-16' | 'text-20';
  isEditable?: boolean;
  handleOnChange?: (value: string) => void;
  handleOnReset?: () => void;
  handleOnSave?: (value: string) => void;
  className?: string;
}

export function Label({
  name,
  text = 'text-16',
  isEditable = false,
  handleOnChange = () => {},
  handleOnReset = () => {},
  handleOnSave = () => {},
  className = ''
}: ILabelProps) {
  const { isLight } = useThemeContext();

  return (
    <label
      htmlFor={name}
      className={`font-roobert_semibold ${text} capitalize flex items-center justify-between
        ${isLight ? 'text-dark_navy' : 'text-white'}
        ${className}
      `}
    >
      {isEditable ? (
        <Input
          id={name}
          value={name}
          isEditable={isEditable}
          handleOnChange={handleOnChange}
          handleOnReset={handleOnReset}
          handleOnSave={handleOnSave}
          className="w-full border-2 border-transparent focus:border-light_navy"
        />
      ) : (
        name
      )}
    </label>
  );
}
