import { Status } from '@/components/form';
import { useEffect, useState } from 'react';
import { APIS } from '@/constants';
import { useAxios } from 'src/hooks';
import { IEmployee, IEmployeesHashTable, ISaturdayHashTable } from 'src/types';
import { Saturday } from './Saturday';
import { useEmployeeContext } from 'src/contexts';

interface ISaturdaysProps {
  saturdaysHashTable: ISaturdayHashTable;
  activeEmployee: IEmployee;
  employeesHashTable: IEmployeesHashTable;
  isManager: boolean;
}

function Saturdays({
  saturdaysHashTable,
  activeEmployee,
  employeesHashTable,
  isManager
}: ISaturdaysProps) {
  const { allEmployees, employeesByPosition } = employeesHashTable;

  // initialCrews
  const initialCrews: Set<IEmployee['crew']> = new Set();

  employeesByPosition.Foreman.forEach((foremanId) => {
    const crew = allEmployees[foremanId].crew;

    if (crew !== 'unassigned') {
      initialCrews.add(crew);
    }
  });

  return (
    <div className="grow flex flex-col gap-32">
      {Object.entries(saturdaysHashTable).map(([_id, { name, date, employees }]) => (
        <Saturday
          key={`${date}_${_id}`}
          _id={_id}
          name={name}
          date={date}
          employees={employees}
          activeEmployee={activeEmployee}
          allEmployees={allEmployees}
          initialCrews={initialCrews}
          isManager={isManager}
        />
      ))}
    </div>
  );
}

export default function Calendar() {
  // getAllSaturdays
  const [saturdayHashTablesSt, setSaturdaysHashTableSt] = useState<ISaturdayHashTable>({});

  const { status, triggerRequest: getAllSaturdays } = useAxios<ISaturdayHashTable>({
    query: 'get',
    url: APIS.SATURDAY_API_URI,
    onSuccess: (data) => {
      setSaturdaysHashTableSt(data);
    }
  });

  useEffect(() => {
    getAllSaturdays();
  }, []);

  // employeeContext
  const { employee: activeEmployee, employeesHashTable, isManager } = useEmployeeContext();

  return saturdayHashTablesSt && employeesHashTable ? (
    <Saturdays
      saturdaysHashTable={saturdayHashTablesSt}
      activeEmployee={activeEmployee}
      employeesHashTable={employeesHashTable}
      isManager={isManager}
    />
  ) : (
    <Status status={status} errorMessage="Error fetching Saturdays" />
  );
}
