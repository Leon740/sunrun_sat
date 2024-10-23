import { ReactNode, useEffect, useState } from 'react';
import { Group, Label } from '@/components/form';
import { IPosition } from '@/constants';
import { IEmployee, IEmployeesHashTable, ISaturday, TEmployeePosition } from 'src/types';
import { POSITIONS } from '@/constants';
import { RadioGroup, TRadio } from './RadioGroup';

const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffInTime = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  return diffInDays;
};

interface IEmployeePositionUlProps {
  children: ReactNode;
}

function EmployeePositionUl({ children }: IEmployeePositionUlProps) {
  return children ? <ul className="flex flex-row flex-wrap gap-16">{children}</ul> : null;
}

interface IEmployeePositionLiProps {
  children: ReactNode;
  color: IPosition['color'];
}

function EmployeePositionLi({ children, color }: IEmployeePositionLiProps) {
  return (
    <li className={`font-roobert_regular text-16 text-dark_navy p-8 rounded-8 ${color}`}>
      {children}
    </li>
  );
}

interface ISaturdayProps extends ISaturday {
  saturdayOnChange: (saturday: ISaturday) => void;
  activeEmployee: IEmployee;
  allEmployees: IEmployeesHashTable['allEmployees'];
  initialCrews: Set<IEmployee['crew']>;
  isManager: boolean;
}

export function Saturday({
  name,
  date,
  employees,
  saturdayOnChange,
  activeEmployee,
  allEmployees,
  initialCrews,
  isManager
}: ISaturdayProps) {
  // RadioGroupOnChange
  // employeesIdsSet
  const [employeesIdsSet, setEmployeesIdsSet] = useState(new Set(employees));

  const [activeRadioSt, setActiveRadioSt] = useState<TRadio>(
    employeesIdsSet.has(activeEmployee._id) ? 'Yes' : 'No'
  );

  useEffect(() => {
    setEmployeesIdsSet((prevEmployeesIdsSet) => {
      const newEmployeesIdsSet = new Set(prevEmployeesIdsSet);
      if (activeRadioSt === 'Yes') {
        newEmployeesIdsSet.add(activeEmployee._id);
      } else {
        newEmployeesIdsSet.delete(activeEmployee._id);
      }
      return newEmployeesIdsSet;
    });
  }, [activeRadioSt]);

  const employeesIdsArray = Array.from(employeesIdsSet);

  useEffect(() => {
    if (employeesIdsArray.length !== employees.length) {
      saturdayOnChange({ name, date, employees: employeesIdsArray });
    }
  }, [employeesIdsArray]);

  // disabledVote
  const today = new Date();
  const [year, month, day] = date.split('-').map(Number);
  const isDisabled = getDaysDifference(today, new Date(year, month - 1, day)) < 2;

  // sunrunnersComingIn
  // crews
  const crews: {
    [key: IEmployee['crew']]: {
      [key in TEmployeePosition]: IEmployee | Record<string, never>;
    };
  } = {};

  initialCrews.forEach((initialCrew) => {
    crews[initialCrew] = {
      Foreman: {},
      Lead: {},
      Installer: {},
      Electrician: {}
    };
  });

  // sunrunnersComingInByPosition
  const sunrunnersComingInByPosition: { [key in TEmployeePosition]: IEmployee[] } = {
    Foreman: [],
    Lead: [],
    Installer: [],
    Electrician: []
  };

  employeesIdsArray.forEach((_id) => {
    const employee = allEmployees[_id];

    // crews
    if (employee.crew !== 'unassigned') {
      crews[employee.crew][employee.position as TEmployeePosition] = employee;
    }

    // sunrunnersComingInByPosition
    sunrunnersComingInByPosition[employee.position as TEmployeePosition].push(employee);

    return employee;
  });

  // activeCrews
  const activeCrews: IEmployee['crew'][] = [];

  Object.entries(crews).forEach(([crew, positions]) => {
    if (
      (positions.Foreman?._id && positions.Lead?._id) ||
      (positions.Foreman?._id && positions.Electrician?._id)
    ) {
      activeCrews.push(crew);
    }
  });

  // keys
  const keyBase = date;

  return (
    <section className="flex flex-col gap-32" aria-label={name}>
      <h2 aria-label={name} className="flex justify-center">
        <Label name={name} text="text-20" />
      </h2>

      {!isManager && (
        <RadioGroup
          radioGroupValue={activeRadioSt}
          radioGroupOnChange={setActiveRadioSt}
          disabled={isDisabled}
        />
      )}

      {employeesIdsArray.length > 0 && (
        <>
          <Label name="Sunrunners coming in" text="text-20" />

          {activeCrews.length > 0 &&
            activeCrews.map((crewName) => {
              const currentCrew = crews[crewName];
              const keyCrew = `${keyBase}_${crewName}`;

              return (
                <Group key={keyCrew} name={crewName}>
                  <EmployeePositionUl>
                    {POSITIONS.map((position) => {
                      const employee = currentCrew[position.title];

                      if (employee._id) {
                        return (
                          <EmployeePositionLi
                            key={`${keyCrew}_${employee._id}`}
                            color={position.color}
                          >
                            {employee.nickname}
                          </EmployeePositionLi>
                        );
                      }
                    })}
                  </EmployeePositionUl>
                </Group>
              );
            })}

          <Group name="Crews to be determined">
            {POSITIONS.map((position) => {
              const employeesByPosition = sunrunnersComingInByPosition[position.title].filter(
                (employee) => !activeCrews.includes(employee.crew)
              );
              const keyPosition = `${keyBase}_${position.title}`;

              return (
                employeesByPosition.length > 0 && (
                  <EmployeePositionUl key={keyPosition}>
                    {employeesByPosition.map((employee) => (
                      <EmployeePositionLi
                        key={`${keyPosition}_${employee._id}`}
                        color={position.color}
                      >
                        {employee.nickname}
                      </EmployeePositionLi>
                    ))}
                  </EmployeePositionUl>
                )
              );
            })}
          </Group>
        </>
      )}
    </section>
  );
}
