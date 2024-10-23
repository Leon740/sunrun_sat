import { IEmployee } from './Employee';

export interface IBranch {
  _id: string;
  name: string;
  employees: {
    [key: IEmployee['_id']]: IEmployee;
  };
}

export type TBranchShort = Pick<IBranch, '_id' | 'name'>;
