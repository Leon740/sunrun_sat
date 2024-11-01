import { useState } from 'react';
import { IEmployee } from '@/types';
import { APIS } from '@/constants';
import { useAxios } from '@/hooks';
import { useEmployeeContext } from '@/contexts';
import { Avatar } from '@/components/general';
import { Input, Group, PositionSelect, CrewSelect, Status, FormButton } from '@/components/form';

export default function InstallerProfile() {
  // employeeContext
  const { employee, setEmployee } = useEmployeeContext();

  // const ALL_FIELDS = Object.keys(employee);
  const FIELDS: Array<keyof IEmployee> = ['employeeId', '_id'];

  // name
  const { firstname, lastname } = employee;
  const name = {
    firstname,
    lastname
  };

  // nickname
  type TNickname = IEmployee['nickname'];
  const initialNickname = employee.nickname;
  const [nicknameSt, setNicknameSt] = useState<TNickname>(initialNickname || firstname);

  const handleNicknameOnChange = (newNickname: TNickname) => {
    setNicknameSt(newNickname);
  };

  // position
  const { position } = employee;
  const activePositionOption = {
    label: position,
    value: position
  };

  // crew
  const { crew } = employee;
  const activeCrewOption = {
    label: crew,
    value: crew
  };

  // newEmployee
  const newEmployee: Omit<IEmployee, '_id'> = {
    ...employee,
    nickname: nicknameSt
  };

  // handleUpdateEmployeeButtonOnClick
  const { status: updateEmployeeStatus, triggerRequest: handleUpdateEmployeeButtonOnClick } =
    useAxios<IEmployee>({
      query: 'put',
      url: `${APIS.EMPLOYEE_API_URI(employee.branchId)}/${employee._id}`,
      body: newEmployee,
      onSuccess: (data) => {
        setEmployee(data);
      }
    });

  return (
    <form className="w-full flex flex-col gap-32">
      <Avatar name={name} isEditable={false} />

      <Group name="nickname">
        <Input
          id="nickname"
          value={nicknameSt}
          handleOnChange={handleNicknameOnChange}
          isEditable
        />
      </Group>

      <Group name="position">
        <PositionSelect activePositionOption={activePositionOption} isEditable={false} />
      </Group>

      <Group name="crew">
        <CrewSelect activeCrewOption={activeCrewOption} isEditable={false} />
      </Group>

      <Group name="branch">
        <Input id="branch" value={employee.branchName} isEditable={false} />
      </Group>

      {FIELDS.map((field) => (
        <Group key={`field_${field}`} name={field}>
          <Input id={field} value={employee[field]} isEditable={false} />
        </Group>
      ))}

      <Status
        status={updateEmployeeStatus}
        errorMessage="Error updating Employee"
        successMessage="Employee was successfully updated"
        className="mt-32"
      />

      {nicknameSt !== initialNickname && (
        <FormButton
          type="submit"
          ariaLabel="Update"
          bg="bg-green"
          className="mt-32"
          handleOnClick={handleUpdateEmployeeButtonOnClick}
          icon="done"
          label="Update"
        />
      )}
    </form>
  );
}
