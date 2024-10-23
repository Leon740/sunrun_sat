import { useEffect, useState } from 'react';
import { IEmployee } from '@/types';
import { useEmployeeContext } from '@/contexts';
import { APIS, ROUTES } from '@/constants';
import { useAxios } from '@/hooks';
import { Input, Group, Status, FormButton, TOption } from '@/components/form';
import { useNavigate } from 'react-router-dom';
import { BranchSelect } from './BranchSelect';

export default function SignIn() {
  // branch
  const [branchOptionSt, setBranchOptionSt] = useState<TOption>({
    value: 'Select a Branch',
    label: 'Select a Branch'
  });

  // employeeId
  type TEmployeeId = IEmployee['_id'];

  const [employeeIdSt, setEmployeeIdSt] = useState<TEmployeeId>('');

  const handleEmployeeIdOnChange = (newEmployeeId: TEmployeeId) => {
    setEmployeeIdSt(newEmployeeId);
  };

  const isEmployeeId = employeeIdSt.length > 1;

  // employeeContext
  const { employee, setEmployee } = useEmployeeContext();

  // handleSignInButtonOnClick
  const { status: signInStatus, triggerRequest: handleSignInButtonOnClick } = useAxios<IEmployee>({
    query: 'get',
    url: `${APIS.EMPLOYEE_API_URI(branchOptionSt.value)}/${employeeIdSt}`,
    onSuccess: (data) => {
      setEmployee(data);
    }
  });

  // router
  // navigateToProfile
  const navigate = useNavigate();

  useEffect(() => {
    if (employee._id) {
      navigate(ROUTES.profile);
    }
  }, [employee]);

  return (
    <div className="grow flex items-center">
      <form className="w-full flex flex-col gap-32">
        <Group name="branch">
          <BranchSelect
            activeBranchOption={branchOptionSt}
            setActiveBranchOption={setBranchOptionSt}
          />
        </Group>

        <Group name="employeeId">
          <Input
            isEditable
            id="employeeId"
            value={employeeIdSt}
            handleOnChange={handleEmployeeIdOnChange}
          />
        </Group>

        <Status
          status={signInStatus}
          errorMessage="No employee found"
          successMessage="Signing in ..."
        />

        <FormButton
          type="submit"
          ariaLabel="Sign In"
          disabled={!isEmployeeId}
          className={isEmployeeId ? 'opacity-1' : 'opacity-75'}
          bg="bg-white"
          handleOnClick={handleSignInButtonOnClick}
          icon="arrow"
          iconClassName="-rotate-90 order-1"
          label="Sign In"
        />
      </form>
    </div>
  );
}
