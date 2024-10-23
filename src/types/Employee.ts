export type TEmployeePosition = Exclude<IEmployee['position'], 'Manager'>;

export interface IEmployee {
  _id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  branchId: string;
  branchName: string;
  crew: string;
  position: 'Manager' | 'Foreman' | 'Lead' | 'Installer' | 'Electrician';
  employeeId: string;
}

export interface IEmployeesHashTable {
  allEmployees: {
    [key: IEmployee['_id']]: IEmployee;
  };
  employeesByPosition: {
    [key in TEmployeePosition]: IEmployee['_id'][];
  };
}
