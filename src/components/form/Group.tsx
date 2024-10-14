import { ReactNode } from 'react';
import { Label } from '@/components';

interface IGroupProps {
  children: ReactNode;
  name: string;
  isEditable?: boolean;
  handleOnChange?: (value: string) => void;
  handleOnReset?: () => void;
  handleOnSave?: (value: string) => void;
}

export function Group({
  children,
  name,
  isEditable = false,
  handleOnChange = () => {},
  handleOnReset = () => {},
  handleOnSave = () => {}
}: IGroupProps) {
  return (
    <div className="flex flex-col gap-16">
      <Label
        name={name}
        isEditable={isEditable}
        handleOnChange={handleOnChange}
        handleOnReset={handleOnReset}
        handleOnSave={handleOnSave}
      />
      {children}
    </div>
  );
}
