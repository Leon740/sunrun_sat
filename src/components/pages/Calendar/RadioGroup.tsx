import { useState } from 'react';
import { Radio } from '@/components';

export type TRadio = 'Yes' | 'No';

interface IRadioGroupProps {
  radioGroupValue: TRadio;
  radioGroupOnChange: (value: TRadio) => void;
  disabled: boolean;
}

export function RadioGroup({
  radioGroupValue,
  radioGroupOnChange,
  disabled = false
}: IRadioGroupProps) {
  // onChange
  const [activeRadioSt, setActiveRadioSt] = useState<TRadio>(radioGroupValue);

  const radioOnChange = (value: string) => {
    setActiveRadioSt(value as TRadio);
    radioGroupOnChange(value as TRadio);
  };

  // color
  const isYes = activeRadioSt === 'Yes';

  return (
    <div className="w-full flex flex-col gap-16">
      <div className="flex flex-row justify-center gap-64">
        <Radio
          name="Yes"
          color="yellow"
          onChange={radioOnChange}
          isChecked={isYes}
          disabled={disabled}
        />
        <Radio
          name="No"
          color="light_navy"
          onChange={radioOnChange}
          isChecked={activeRadioSt === 'No'}
          disabled={disabled}
        />
      </div>

      {disabled && (
        <p className="font-roobert_regular text-16 text-red text-center">
          Can't update your vote since it's less than 1 day notice.
        </p>
      )}

      {activeRadioSt && (
        <div
          className={`w-full font-roobert_semibold text-16 text-center p-8 rounded-8 ${
            isYes ? 'text-dark_navy bg-yellow' : 'text-sky_blue bg-light_navy'
          }`}
        >
          {isYes ? 'Let’s knock it out.' : 'Recharge and do it next time.'}
        </div>
      )}
    </div>
  );
}
