import { IEmployeesHashTable } from '@/types';
import { Select, SelectOption, Status, TOption } from '@/components';
import { useEmployeeContext } from 'src/contexts';

interface ISelectInnerOptionProps {
  label: string;
  className: string;
}

function SelectInnerOption({ label, className }: ISelectInnerOptionProps) {
  return (
    <div
      className={`cursor-pointer w-full text-16 text-dark_navy font-roobert_regular text-left py-8 px-16 bg-sky_blue border-light_navy ease-in-out duration-300 ${className}`}
    >
      {label}
    </div>
  );
}

interface ICrewSelectProps {
  isEditable?: boolean;
  activeCrew: TOption;
  setActiveCrew?: (newCrew: TOption) => void;
}

interface ICrewSelectInnerProps extends ICrewSelectProps {
  employeesHashTable: IEmployeesHashTable;
}

function CrewSelectInner({
  employeesHashTable,
  isEditable = false,
  activeCrew,
  setActiveCrew = () => {}
}: ICrewSelectInnerProps) {
  const { allEmployees, employeesByPosition } = employeesHashTable;

  const crewsOptions: TOption[] = employeesByPosition.Foreman.reduce((acc, foremanId) => {
    const foreman = allEmployees[foremanId];

    if (foreman.crew !== 'unassigned') {
      acc.push({
        value: foremanId,
        label: `${foreman.crew} - ${foreman.nickname}`
      });
    }

    return acc;
  }, [] as TOption[]);

  return (
    <Select
      isEditable={isEditable}
      options={crewsOptions}
      defaultOption={activeCrew || { label: 'Select Crew', value: 'Select Crew' }}
      setActiveOption={setActiveCrew}
      renderActiveOption={(activeOption) => (
        <SelectInnerOption label={activeOption.label} className="border-t-0" />
      )}
      renderOptions={(options) =>
        options.map((option) => (
          <SelectOption key={`CrewSelectOption_${option.value}`} option={option}>
            <SelectInnerOption label={option.label} className="border-t-2 hover:bg-light_navy" />
          </SelectOption>
        ))
      }
      activeMaxHeightClassName="max-h-[256px]"
    />
  );
}

export function CrewSelect({ isEditable, activeCrew, setActiveCrew = () => {} }: ICrewSelectProps) {
  const { employeesHashTable, status } = useEmployeeContext();

  return employeesHashTable ? (
    <CrewSelectInner
      employeesHashTable={employeesHashTable}
      isEditable={isEditable}
      activeCrew={activeCrew}
      setActiveCrew={setActiveCrew}
    />
  ) : (
    <Status status={status} errorMessage="Error fetching Crews." />
  );
}
