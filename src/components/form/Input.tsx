import { useRef, useState, useEffect } from 'react';
import { Button, Icon } from '@/components';

interface IInputProps {
  id: string;
  value: string;
  isEditable?: boolean;
  handleOnChange?: (value: string) => void;
  handleOnReset?: () => void;
  handleOnSave?: (value: string) => void;
  className?: string;
}

export function Input({
  id,
  value,
  isEditable = false,
  handleOnChange = () => {},
  handleOnReset = () => {},
  handleOnSave = () => {},
  className = 'w-full text-16 font-roobert_regular text-dark_navy bg-sky_blue py-8 pl-16 pr-48 rounded-8 border-2 border-transparent focus:border-light_navy'
}: IInputProps) {
  // inputValueInitial
  const inputValueInitial = useRef(value);

  // inputOnChange
  const [inputValueSt, setInputValueSt] = useState<string>(value);

  const handleInputOnChange = (v: string) => {
    setInputValueSt(v);
  };

  useEffect(() => {
    handleOnChange(inputValueSt);
  }, [inputValueSt]);

  // inputOnEditFocus
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditButtonOnClick = () => {
    inputRef.current?.focus();
  };

  // inputOnReset
  const handleResetButtonOnClick = () => {
    setInputValueSt(inputValueInitial?.current || '');
    handleOnReset();
  };

  // inputOnSave
  const handleSaveButtonOnClick = () => {
    // setInputValueSt(inputValueInitial?.current || '');
    handleOnSave(inputValueSt);
  };

  return (
    <div className="relative flex w-full">
      <input
        ref={inputRef}
        id={id}
        value={inputValueSt}
        onChange={(event) => handleInputOnChange(event.target.value)}
        disabled={!isEditable}
        className={className}
      />
      {isEditable && (
        <div className="absolute top-1/2 -translate-y-1/2 right-16 z-10 flex gap-16 items-center">
          {inputValueSt.length > 1 && inputValueSt !== inputValueInitial.current ? (
            <>
              <Button
                type="button"
                ariaLabel={`Reset ${id} Input`}
                handleOnClick={handleResetButtonOnClick}
              >
                <Icon icon="delete" className="text-red" />
              </Button>
              <Button
                type="button"
                ariaLabel={`Save ${id} Input`}
                handleOnClick={handleSaveButtonOnClick}
              >
                <Icon icon="done" className="text-green" />
              </Button>
            </>
          ) : (
            <Button
              type="button"
              ariaLabel={`Edit ${id} Input`}
              handleOnClick={handleEditButtonOnClick}
            >
              {/* iconColor: inherit; */}
              <Icon icon="edit" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
