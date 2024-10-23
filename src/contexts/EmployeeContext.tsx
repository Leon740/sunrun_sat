import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IEmployee, IEmployeesHashTable } from '@/types';
import { APIS } from 'src/constants';
import { useLocalStorage, useAxios } from '@/hooks';

interface IEmployeeContext {
  employee: IEmployee;
  setEmployee: (employee: IEmployee) => void;
  employeesHashTable: IEmployeesHashTable | undefined;
  employeesHashTableStatus: number;
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
    branchName: '',
    branchId: '',
    crew: '',
    employeeId: ''
  });

  const setEmployee = (newEmployee: IEmployee) => {
    setEmployeeStorageSt(newEmployee);
  };

  // allEmployees
  const [fetchedEmployeesHashTableSt, setFetchedEmployeesHashTableSt] =
    useState<IEmployeesHashTable>();

  const { status: getEmployeesHashTableStatus, triggerRequest: getEmployeesHashTable } =
    useAxios<IEmployeesHashTable>({
      query: 'get',
      url: APIS.ALL_EMPLOYEES_API_URI(employeeStorageSt.branchId),
      onSuccess: (data) => {
        setFetchedEmployeesHashTableSt(data);
      }
    });

  useEffect(() => {
    if (employeeStorageSt.branchId) {
      getEmployeesHashTable();
    }
  }, [employeeStorageSt]);

  return (
    <EmployeeContext.Provider
      value={{
        employee: employeeStorageSt,
        setEmployee,
        employeesHashTable: fetchedEmployeesHashTableSt,
        employeesHashTableStatus: getEmployeesHashTableStatus,
        isManager: employeeStorageSt.position === 'Manager'
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
