import { Status } from '@/components/form';
import { useEffect, useState } from 'react';
import { APIS } from '@/constants';
import { useAxios } from 'src/hooks';
import { IEmployee, IEmployeesHashTable, ISaturday } from 'src/types';
import { Saturday } from './Saturday';
import { useEmployeeContext } from 'src/contexts';

const getCurrentSaturdays = () => {
  const start = new Date();
  const end = new Date(`${start.getFullYear()}-${start.getMonth() + 2}-${start.getDate()}`);
  const saturdays: ISaturday[] = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    if (date.getDay() === 6) {
      const saturdayName = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      });

      const saturday: ISaturday = {
        name: saturdayName,
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        employees: []
      };

      saturdays.push(saturday);
    }
  }

  return saturdays;
};

const getActiveSaturdays = (existingSaturdays: ISaturday[] | undefined) => {
  const currentSaturdays = getCurrentSaturdays();

  if (existingSaturdays) {
    const today = new Date();

    const activeSaturdays = existingSaturdays.filter(
      (existingSat) => today < new Date(existingSat.date)
    );

    const newSaturdays = currentSaturdays.map((currentSat) => {
      const newSat = activeSaturdays.find((activeSat) => activeSat.date === currentSat.date);

      if (newSat) {
        return newSat;
      }

      return currentSat;
    });

    return newSaturdays;
  }

  return currentSaturdays;
};

interface ICalendarInnerProps {
  activeEmployee: IEmployee;
  employeesHashTable: IEmployeesHashTable;
  isManager: boolean;
}

interface ISaturdaysProps extends ICalendarInnerProps {
  existingSaturdays: ISaturday[] | undefined;
}

function Saturdays({
  existingSaturdays,
  activeEmployee,
  employeesHashTable,
  isManager
}: ISaturdaysProps) {
  // employees
  const { allEmployees, employeesByPosition } = employeesHashTable;

  // initialCrews
  const initialCrews: Set<IEmployee['crew']> = new Set();

  employeesByPosition.Foreman.forEach((foremanId) => {
    const crew = allEmployees[foremanId].crew;

    if (crew !== 'unassigned') {
      initialCrews.add(crew);
    }
  });

  // activeSaturdays
  const [activeSaturdaysSt, setActiveSaturdaysSt] = useState(() =>
    getActiveSaturdays(existingSaturdays)
  );

  const { status: putActiveSaturdaysStatus, triggerRequest: putActiveSaturdays } = useAxios<
    ISaturday[]
  >({
    query: 'put',
    url: `${APIS.SATURDAYS_API_URI(activeEmployee.branchId)}`
  });

  const saturdayOnChange = (saturday: ISaturday) => {
    setActiveSaturdaysSt((prevSaturdays) =>
      prevSaturdays.map((prevSat) => {
        if (prevSat.date === saturday.date) {
          return saturday;
        }

        return prevSat;
      })
    );
  };

  useEffect(() => {
    putActiveSaturdays({
      reqBody: activeSaturdaysSt
    });
    console.log('putActiveSaturdaysStatus', putActiveSaturdaysStatus);
  }, [activeSaturdaysSt]);

  return (
    <div className="grow flex flex-col gap-32">
      {activeSaturdaysSt.map(({ name, date, employees }) => (
        <Saturday
          key={`${date}_Saturday`}
          name={name}
          date={date}
          employees={employees}
          saturdayOnChange={saturdayOnChange}
          activeEmployee={activeEmployee}
          allEmployees={allEmployees}
          initialCrews={initialCrews}
          isManager={isManager}
        />
      ))}
    </div>
  );
}

function CalendarInner({ activeEmployee, employeesHashTable, isManager }: ICalendarInnerProps) {
  // existingSaturdaysSt
  const [existingSaturdaysSt, setExistingSaturdaysSt] = useState<ISaturday[] | undefined>();

  const { status: getExistingSaturdaysStatus, triggerRequest: getExistingSaturdays } = useAxios<
    ISaturday[] | undefined
  >({
    query: 'get',
    url: `${APIS.SATURDAYS_API_URI(activeEmployee.branchId)}`,
    onSuccess: (data) => {
      setExistingSaturdaysSt(data);
    }
  });

  useEffect(() => {
    getExistingSaturdays();
  }, []);

  return existingSaturdaysSt ? (
    <Saturdays
      existingSaturdays={existingSaturdaysSt}
      activeEmployee={activeEmployee}
      employeesHashTable={employeesHashTable}
      isManager={isManager}
    />
  ) : (
    <Status status={getExistingSaturdaysStatus} errorMessage="Error fetching Saturdays" />
  );
}

export default function Calendar() {
  // employeeContext
  const {
    employee: activeEmployee,
    employeesHashTable,
    employeesHashTableStatus,
    isManager
  } = useEmployeeContext();

  return employeesHashTable ? (
    <CalendarInner
      activeEmployee={activeEmployee}
      employeesHashTable={employeesHashTable}
      isManager={isManager}
    />
  ) : (
    <Status status={employeesHashTableStatus} errorMessage="Error fetching Employees" />
  );
}
