import { useEffect, useState } from 'react';
import { IEmployee } from '@/types';
import { APIS } from '@/constants';
import { useAxios } from '@/hooks';
import { Status } from '@/components/form';
import { useParams } from 'react-router-dom';
import { EditInstallerInner } from './EditInstallerInner';

export default function EditInstaller() {
  // router
  const { id } = useParams();

  // fetchEmployee
  const [employeeSt, setEmployeeSt] = useState<IEmployee>();

  const { status, triggerRequest: getEmployee } = useAxios<IEmployee>({
    query: 'get',
    url: `${APIS.EMPLOYEE_API_URI}/${id}`,
    onSuccess: (data) => {
      setEmployeeSt(data);
    }
  });

  useEffect(() => {
    getEmployee();
  }, []);

  return employeeSt ? (
    <EditInstallerInner employee={employeeSt} />
  ) : (
    <Status status={status} errorMessage="Error fetching Employee." />
  );
}
