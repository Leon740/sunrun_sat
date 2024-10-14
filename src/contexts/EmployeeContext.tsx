import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IEmployee, IEmployeesHashTable } from '../types/Employee';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { EMPLOYEE_API_URI, useAxios } from 'src/hooks';

interface IEmployeeContext {
  employee: IEmployee | undefined;
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
  const [employeeStorageSt, setEmployeeStorageSt] = useLocalStorage<IEmployee | undefined>(
    'employee'
  );

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
        isManager: employeeStorageSt?.position === 'Manager'
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
