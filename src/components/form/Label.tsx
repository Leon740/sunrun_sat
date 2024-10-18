import { useThemeContext } from '@/contexts';
import { Input } from '@/components';

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
  const { textColor } = useThemeContext();

  return (
    <label
      htmlFor={name}
      className={`font-roobert_semibold ${text} capitalize flex items-center justify-between
        ${textColor}
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
          editIconColor={textColor}
        />
      ) : (
        name
      )}
    </label>
  );
}
