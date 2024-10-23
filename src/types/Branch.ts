import { IEmployee } from './Employee';
import { ISaturday } from './Saturday';

export interface IBranch {
  _id: string;
  name: string;
  employees: {
    [key: IEmployee['_id']]: IEmployee;
  };
  saturdays: ISaturday[];
}

export type TBranchShort = Pick<IBranch, '_id' | 'name'>;
