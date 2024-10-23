import { useEffect, useState } from 'react';
import { IEmployee } from '@/types';
import { APIS } from '@/constants';
import { useAxios } from '@/hooks';
import { Status } from '@/components/form';
import { useParams } from 'react-router-dom';
import { EditInstallerInner } from './EditInstallerInner';
import { useEmployeeContext } from 'src/contexts';

export default function EditInstaller() {
  // managerContext
  const { employee: manager } = useEmployeeContext();

  // router
  // getEmployeeId
  const { id } = useParams();

  // fetchEmployee
  const [employeeSt, setEmployeeSt] = useState<IEmployee>();

  const { status: getEmployeeStatus, triggerRequest: getEmployee } = useAxios<IEmployee>({
    query: 'get',
    url: `${APIS.EMPLOYEE_API_URI(manager.branchId)}/${id}`,
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
    <Status status={getEmployeeStatus} errorMessage="Error fetching Employee" />
  );
}
