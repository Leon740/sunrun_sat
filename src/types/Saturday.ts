import { IEmployee } from '@/types';

export interface ISaturday {
  name: string;
  date: string;
  employees: IEmployee['_id'][];
}
