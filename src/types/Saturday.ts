import { IEmployee } from '@/types';

export interface ISaturday {
  _id: string;
  name: string;
  employees: IEmployee['_id'][];
}

export interface ISaturdayHashTable {
  [key: string]: {
    name: ISaturday['name'];
    employees: ISaturday['employees'];
  };
}
