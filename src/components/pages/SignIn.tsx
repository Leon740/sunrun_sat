import { useEffect, useState } from 'react';
import { IEmployee } from '@/types';
import { useEmployeeContext } from '@/contexts';
import { SIGNIN_API_URI, useAxios } from '@/hooks';
import { Input, Group, Status, FormButton } from '@/components';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/constants';

export default function SignIn() {
  // id
  const [idSt, setIdSt] = useState<IEmployee['_id']>('');

  const handleIdOnChange = (newId: string) => {
    setIdSt(newId);
  };

  const isId = idSt.length > 1;

  // employeeContext
  const { employee, setEmployee } = useEmployeeContext();

  // handleSignInButtonOnClick
  const { status, triggerRequest: handleSignInButtonOnClick } = useAxios<IEmployee>({
    query: 'get',
    url: `${SIGNIN_API_URI}/${idSt}`,
    onSuccess: (data) => {
      setEmployee(data);
    }
  });

  // router
  const navigate = useNavigate();

  useEffect(() => {
    if (employee) {
      navigate(routes.profile);
    }
  }, [employee]);

  return (
    <div className="grow flex items-center">
      <form className="w-full flex flex-col gap-32">
        <Group name={'id'}>
          <Input isEditable id={'id'} value={idSt} handleOnChange={handleIdOnChange} />
        </Group>

        <Status status={status} errorMessage="No employee found." successMessage="Signing in ..." />

        <FormButton
          type="submit"
          ariaLabel="Sign In"
          disabled={!isId}
          className={isId ? 'opacity-1' : 'opacity-75'}
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
