import { Status } from '@/components';
import { useEffect, useState } from 'react';
import { SATURDAY_API_URI, useAxios } from 'src/hooks';
import { ISaturdayHashTable } from 'src/types';
import { Saturday } from './Saturday';

interface ISaturdaysProps {
  saturdaysHashTable: ISaturdayHashTable;
}

function Saturdays({ saturdaysHashTable }: ISaturdaysProps) {
  return (
    <div className="grow flex flex-col gap-32">
      {Object.entries(saturdaysHashTable).map(([_id, { name, employees }]) => (
        <Saturday key={`${name}_${_id}_Saturday`} _id={_id} name={name} employees={employees} />
      ))}
    </div>
  );
}

export default function Calendar() {
  const [saturdayHashTablesSt, setSaturdaysHashTableSt] = useState<ISaturdayHashTable>({});

  const { status, triggerRequest: getAllSaturdays } = useAxios<ISaturdayHashTable>({
    query: 'get',
    url: SATURDAY_API_URI,
    onSuccess: (data) => {
      setSaturdaysHashTableSt(data);
    }
  });

  useEffect(() => {
    getAllSaturdays();
  }, []);

  return saturdayHashTablesSt ? (
    <Saturdays saturdaysHashTable={saturdayHashTablesSt} />
  ) : (
    <Status status={status} errorMessage="Error fetching Saturdays." />
  );
}
