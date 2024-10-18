import { useEffect, useState } from 'react';
import { Label } from '@/components';
import { APIS } from '@/constants';
import { useAxios } from 'src/hooks';
import { IEmployee, IEmployeesHashTable, ISaturday, TEmployeePosition } from 'src/types';
import { POSITIONS } from '@/constants';
import { RadioGroup, TRadio } from './RadioGroup';

const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffInTime = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  return diffInDays;
};

interface ISaturdayProps extends ISaturday {
  activeEmployee: IEmployee;
  allEmployees: IEmployeesHashTable['allEmployees'];
  isManager: boolean;
}

export function Saturday({
  _id: saturdayId,
  name,
  date,
  employees,
  activeEmployee,
  allEmployees,
  isManager
}: ISaturdayProps) {
  // RadioGroupOnChange - employeesIdsSet
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

  // putSaturday
  const { triggerRequest: putSaturday } = useAxios<ISaturday>({
    query: 'put',
    url: `${APIS.SATURDAY_API_URI}/${saturdayId}`
  });

  const employeesIdsArray = Array.from(employeesIdsSet);

  useEffect(() => {
    putSaturday({ reqBody: { name, employees: employeesIdsArray } });
  }, [employeesIdsSet]);

  // sunrunnersComingIn
  const sunrunnersComingIn: IEmployee[] = employeesIdsArray.map((_id) => allEmployees[_id]);

  // sunrunnersComingInByPosition
  const sunrunnersComingInByPosition: { [key in TEmployeePosition]: IEmployee[] } = {
    Foreman: [],
    Lead: [],
    Installer: [],
    Electrician: []
  };

  sunrunnersComingIn.forEach((employee) => {
    sunrunnersComingInByPosition[employee.position as TEmployeePosition].push(employee);
  });

  // disabledVote
  const today = new Date();
  const [year, month, day] = date.split('-').map(Number);
  // new Date(date) will result to previous month, so array destructuring is really needed
  const saturdayDate = new Date(year, month, day);
  const isDisabled = getDaysDifference(today, saturdayDate) < 2;

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

      {sunrunnersComingIn.length > 0 && (
        <>
          <Label name="Sunrunners coming in" text="text-20" />
          {POSITIONS.map((position) => {
            const employeesByPosition = sunrunnersComingInByPosition[position.title];

            return (
              employeesByPosition.length > 0 && (
                <ul
                  key={`${name}_Saturday_${position.title}_Ul`}
                  className="flex flex-row flex-wrap gap-16"
                >
                  {employeesByPosition.map((employee) => (
                    <li
                      key={`${name}_Saturday_${position.title}_Ul_${employee._id}_Li`}
                      className={`font-roobert_regular text-16 text-dark_navy p-8 rounded-8 ${position.color}`}
                    >
                      {employee.nickname}
                    </li>
                  ))}
                </ul>
              )
            );
          })}
        </>
      )}
    </section>
  );
}
