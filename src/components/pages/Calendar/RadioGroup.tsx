import { useState } from 'react';
import { Radio } from '@/components';

export type TRadio = 'Yes' | 'No';

interface IRadioGroupProps {
  radioGroupValue: TRadio;
  radioGroupOnChange: (value: TRadio) => void;
}

export function RadioGroup({ radioGroupValue, radioGroupOnChange }: IRadioGroupProps) {
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
        <Radio name="Yes" color="yellow" onChange={radioOnChange} isChecked={isYes} />
        <Radio
          name="No"
          color="light_navy"
          onChange={radioOnChange}
          isChecked={activeRadioSt === 'No'}
        />
      </div>

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
