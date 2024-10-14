import { TEmployeePosition } from '../types/Employee';

export interface IPosition {
  title: TEmployeePosition;
  color: string;
}

export const POSITIONS: IPosition[] = [
  {
    title: 'Foreman',
    color: 'bg-orange'
  },
  {
    title: 'Lead',
    color: 'bg-yellow'
  },
  {
    title: 'Installer',
    color: 'bg-sky_blue'
  },
  {
    title: 'Electrician',
    color: 'bg-light_navy'
  }
];

export const POSITIONS_OBJECT: { [key in TEmployeePosition]: IPosition['color'] } = {
  Foreman: 'bg-orange',
  Lead: 'bg-yellow',
  Installer: 'bg-sky_blue',
  Electrician: 'bg-light_navy'
};
