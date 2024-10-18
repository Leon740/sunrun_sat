import { IEmployee } from '@/types';

export interface ISaturday {
  _id: string;
  name: string;
  date: string;
  employees: IEmployee['_id'][];
}

export interface ISaturdayHashTable {
  [key: string]: {
    name: ISaturday['name'];
    date: ISaturday['date'];
    employees: ISaturday['employees'];
  };
}
