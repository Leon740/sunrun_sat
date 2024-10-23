import { POSITIONS, POSITIONS_OBJECT } from '@/constants';
import { Select, SelectInnerOption, SelectOption, TOption } from './Select';
import { TEmployeePosition } from 'src/types';

interface IPositionSelectProps {
  isEditable?: boolean;
  activePositionOption: TOption;
  setActivePositionOption?: (newPosition: TOption) => void;
}

export function PositionSelect({
  isEditable = false,
  activePositionOption,
  setActivePositionOption = () => {}
}: IPositionSelectProps) {
  const options = POSITIONS.map((position) => ({
    label: position.title,
    value: position.title
  }));

  return (
    <Select
      isEditable={isEditable}
      options={options}
      defaultOption={activePositionOption || { label: 'Installer', value: 'Installer' }}
      setActiveOption={setActivePositionOption}
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
