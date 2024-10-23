import { IEmployeesHashTable } from '@/types';
import { Select, SelectOption, TOption, SelectInnerOption } from './Select';
import { Status } from './Status';
import { useEmployeeContext } from 'src/contexts';

interface ICrewSelectProps {
  isEditable?: boolean;
  activeCrewOption: TOption;
  setActiveCrewOption?: (newCrew: TOption) => void;
}

interface ICrewSelectInnerProps extends ICrewSelectProps {
  employeesHashTable: IEmployeesHashTable;
}

function CrewSelectInner({
  employeesHashTable,
  isEditable = false,
  activeCrewOption,
  setActiveCrewOption = () => {}
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
      defaultOption={activeCrewOption || { label: 'Select Crew', value: 'Select Crew' }}
      setActiveOption={setActiveCrewOption}
      renderActiveOption={(activeOption) => (
        <SelectInnerOption label={activeOption.label} className="bg-sky_blue border-t-0" />
      )}
      renderOptions={(options) =>
        options.map((option) => (
          <SelectOption key={`CrewSelectOption_${option.value}`} option={option}>
            <SelectInnerOption
              label={option.label}
              className="bg-sky_blue border-t-2 border-light_navy hover:bg-light_navy"
            />
          </SelectOption>
        ))
      }
    />
  );
}

export function CrewSelect({
  isEditable,
  activeCrewOption,
  setActiveCrewOption = () => {}
}: ICrewSelectProps) {
  const { employeesHashTable, employeesHashTableStatus } = useEmployeeContext();

  return employeesHashTable ? (
    <CrewSelectInner
      employeesHashTable={employeesHashTable}
      isEditable={isEditable}
      activeCrewOption={activeCrewOption}
      setActiveCrewOption={setActiveCrewOption}
    />
  ) : (
    <Status status={employeesHashTableStatus} errorMessage="Error fetching Crews" />
  );
}
