import { useState } from 'react';
import { IEmployee } from '@/types';
import { APIS } from '@/constants';
import { useAxios } from '@/hooks';
import { useEmployeeContext } from '@/contexts';
import { Avatar, Input, Group, PositionSelect, CrewSelect, Status, FormButton } from '@/components';

export default function InstallerProfile() {
  // employeeContext
  const { employee, setEmployee } = useEmployeeContext();

  // const ALL_FIELDS = Object.keys(employee);
  const FIELDS: Array<keyof IEmployee> = ['branch', 'employeeId'];

  // name
  const { firstname, lastname } = employee;
  const name = {
    firstname,
    lastname
  };

  // nickname
  type TNickname = IEmployee['nickname'];
  const [nicknameSt, setNicknameSt] = useState<TNickname>(employee.nickname || firstname);

  const handleNicknameOnChange = (newNickname: TNickname) => {
    setNicknameSt(newNickname);
  };

  // position
  const { position } = employee;
  const activePosition = {
    label: position,
    value: position
  };

  // crew
  const { crew } = employee;
  const activeCrew = {
    label: crew,
    value: crew
  };

  // newEmployee
  const newEmployee: Omit<IEmployee, '_id'> = {
    ...employee,
    nickname: nicknameSt
  };

  // handleUpdateButtonOnClick
  const { status, triggerRequest: handleUpdateButtonOnClick } = useAxios<IEmployee>({
    query: 'put',
    url: `${APIS.EMPLOYEE_API_URI}/${employee._id}`,
    body: newEmployee,
    onSuccess: (data) => {
      setEmployee(data);
    }
  });

  return (
    <form className="w-full flex flex-col gap-32">
      <Avatar name={name} isEditable={false} />

      <Group name={'nickname'}>
        <Input
          id={'nickname'}
          value={nicknameSt}
          handleOnChange={handleNicknameOnChange}
          isEditable
        />
      </Group>

      <Group name={'position'}>
        <PositionSelect activePosition={activePosition} isEditable={false} />
      </Group>

      <Group name={'crew'}>
        <CrewSelect activeCrew={activeCrew} isEditable={false} />
      </Group>

      {FIELDS.map((field) => (
        <Group key={`field_${field}`} name={field}>
          <Input id={field} value={employee[field]} isEditable={false} />
        </Group>
      ))}

      <Status
        status={status}
        errorMessage="Error updating Employee."
        successMessage="Employee was successfully updated."
        className="mt-32"
      />

      <FormButton
        type="submit"
        ariaLabel="Update my data"
        bg="bg-white"
        className="mt-32"
        handleOnClick={handleUpdateButtonOnClick}
        icon="done"
        label="Update"
      />
    </form>
  );
}
