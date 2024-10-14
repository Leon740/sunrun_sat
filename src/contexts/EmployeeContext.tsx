import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IEmployee, IEmployeesHashTable } from '@/types';
import { useLocalStorage, EMPLOYEE_API_URI, useAxios } from '@/hooks';

interface IEmployeeContext {
  employee: IEmployee;
  setEmployee: (employee: IEmployee) => void;
  employeesHashTable: IEmployeesHashTable | undefined;
  status: number;
  isManager: boolean;
}

const EmployeeContext = createContext<IEmployeeContext | undefined>(undefined);

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error('useEmployeeContext must be used within a EmployeeProvider');
  }

  return context;
};

interface IEmployeeProviderProps {
  children: ReactNode;
}

export function EmployeeProvider({ children }: IEmployeeProviderProps) {
  // currentUser
  const [employeeStorageSt, setEmployeeStorageSt] = useLocalStorage<IEmployee>('employee', {
    _id: '',
    firstname: '',
    lastname: '',
    nickname: '',
    position: 'Installer',
    branch: '',
    crew: '',
    employeeId: ''
  });

  const setEmployee = (newEmployee: IEmployee) => {
    setEmployeeStorageSt(newEmployee);
  };

  // allEmployees
  const [fetchedEmployeesHashTableSt, setFetchedEmployeesHashTableSt] =
    useState<IEmployeesHashTable>();

  const { status, triggerRequest: getEmployees } = useAxios<IEmployeesHashTable>({
    query: 'get',
    url: EMPLOYEE_API_URI,
    onSuccess: (data) => {
      setFetchedEmployeesHashTableSt(data);
    }
  });

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employee: employeeStorageSt,
        setEmployee,
        employeesHashTable: fetchedEmployeesHashTableSt,
        status,
        isManager: employeeStorageSt.position === 'Manager'
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
