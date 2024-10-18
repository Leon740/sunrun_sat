import { POSITIONS, POSITIONS_OBJECT } from '@/constants';
import { Select, SelectOption, TOption } from './Select';
import { TEmployeePosition } from 'src/types';

interface ISelectInnerOptionProps {
  label: string;
  className: string;
}

function SelectInnerOption({ label, className }: ISelectInnerOptionProps) {
  return (
    <div
      className={`cursor-pointer w-full text-16 text-dark_navy font-roobert_regular text-left py-8 px-16 ${className}`}
    >
      {label}
    </div>
  );
}

interface IPositionSelectProps {
  isEditable?: boolean;
  activePosition: TOption;
  setActivePosition?: (newPosition: TOption) => void;
}

export function PositionSelect({
  isEditable = false,
  activePosition,
  setActivePosition = () => {}
}: IPositionSelectProps) {
  const options = POSITIONS.map((position) => ({
    label: position.title,
    value: position.title
  }));

  return (
    <Select
      isEditable={isEditable}
      options={options}
      defaultOption={activePosition || { label: 'Installer', value: 'Installer' }}
      setActiveOption={setActivePosition}
      renderActiveOption={(activeOption) => (
        <SelectInnerOption
          label={activeOption.label}
          className={POSITIONS_OBJECT[activeOption.value as TEmployeePosition]}
        />
      )}
      renderOptions={(options) =>
        options.map((option) => (
          <SelectOption key={`PositionSelectOption_${option.value}`} option={option}>
            <SelectInnerOption
              label={option.label}
              className={POSITIONS_OBJECT[option.value as TEmployeePosition]}
            />
          </SelectOption>
        ))
      }
      activeMaxHeightClassName="max-h-[164px]"
    />
  );
}
