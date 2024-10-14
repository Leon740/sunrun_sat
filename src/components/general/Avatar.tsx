import { useState } from 'react';
import { Input } from '@/components';
import { useThemeContext } from '@/contexts';

interface IName {
  firstname: string;
  lastname: string;
}

interface IAvatarProps {
  name: IName;
  handleNameOnChange?: (name: IName) => void;
  isEditable: boolean;
}

export function Avatar({ name, handleNameOnChange = () => {}, isEditable = false }: IAvatarProps) {
  const firstname = name.firstname || 'Firstname';
  const lastname = name.lastname || 'Lastname';

  // nameInputOnChange
  type TName = string;
  const [nameSt, setNameSt] = useState<TName>(`${firstname} ${lastname}`);

  const handleNameInputOnChange = (newName: TName) => {
    setNameSt(newName);

    const names = newName.split(' ');

    if (names.length > 1) {
      handleNameOnChange({
        firstname: names[0],
        lastname: (names[2] ? `${names[1]} ${names[2]}` : names[1]) || ' '
      });
    }
  };

  // theme
  const { isLight } = useThemeContext();
  const textColor = isLight ? 'text-dark_navy' : 'text-white';

  return (
    <div className="w-full flex items-center gap-32">
      <div className="w-64 h-64 bg-sky_blue rounded-8 flex shrink-0 items-center justify-center">
        <p className="text-20 font-roobert_bold text-dark_navy uppercase">{`${firstname[0]}${lastname[0]}`}</p>
      </div>
      <Input
        id="avatar"
        value={nameSt}
        handleOnChange={handleNameInputOnChange}
        className={`w-full text-20 font-roobert_semibold capitalize border-2 border-transparent focus:border-sky_blue ${textColor}`}
        isEditable={isEditable}
      />
    </div>
  );
}
