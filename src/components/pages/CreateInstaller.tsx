import { useState } from 'react';
import { IEmployee, TEmployeePosition } from '@/types';
import { useEmployeeContext } from '@/contexts';
import { EMPLOYEE_API_URI, useAxios } from '@/hooks';
import {
  Avatar,
  Input,
  Group,
  PositionSelect,
  CrewSelect,
  Status,
  FormButton,
  TOption
} from '@/components';

export default function CreateInstaller() {
  // managerContext
  const { employee: manager } = useEmployeeContext();

  // name
  type TName = Pick<IEmployee, 'firstname' | 'lastname'>;

  const [nameSt, setNameSt] = useState<TName>({
    firstname: 'Firstname',
    lastname: 'Lastname'
  });

  const handleNameOnChange = (newName: TName) => {
    setNameSt(newName);
  };

  // employeeId
  type TEmployeeId = IEmployee['employeeId'];
  const [employeeIdSt, setEmployeeIdSt] = useState<TEmployeeId>('');

  const handleEmployeeIdOnChange = (newEmployeeId: TEmployeeId) => {
    setEmployeeIdSt(newEmployeeId);
  };

  // position
  const [positionOptionSt, setPositionOptionSt] = useState<TOption>({
    label: 'Installer',
    value: 'Installer'
  });

  // crew
  const [crewOptionSt, setCrewOptionSt] = useState<TOption>({
    label: 'Select crew',
    value: 'Select crew'
  });

  // _id
  const [idSt, setIdSt] = useState<IEmployee['_id']>('');

  // newEmployee
  const newEmployee: Omit<IEmployee, '_id'> = {
    ...nameSt,
    nickname: nameSt.firstname,
    employeeId: employeeIdSt,
    position: positionOptionSt.value as TEmployeePosition,
    crew: crewOptionSt.label.split(' - ')[0],
    branch: manager.branch
  };

  // handleCreateButtonOnClick
  const { status, triggerRequest: handleCreateButtonOnClick } = useAxios<IEmployee>({
    query: 'post',
    url: EMPLOYEE_API_URI,
    body: newEmployee,
    onSuccess: (data) => {
      setIdSt(data._id);
    }
  });

  return (
    <form className="w-full flex flex-col gap-32">
      <Avatar name={nameSt} handleNameOnChange={handleNameOnChange} isEditable />

      <Group name={'employeeId'}>
        <Input
          id={'employeeId'}
          value={employeeIdSt}
          handleOnChange={handleEmployeeIdOnChange}
          isEditable
        />
      </Group>

      <Group name={'position'}>
        <PositionSelect
          isEditable
          activePosition={positionOptionSt}
          setActivePosition={setPositionOptionSt}
        />
      </Group>

      <Group name={'crew'}>
        <CrewSelect isEditable activeCrew={crewOptionSt} setActiveCrew={setCrewOptionSt} />
      </Group>

      <Status
        status={status}
        errorMessage="Error creating Employee."
        successMessage={`Employee was successfully created. <br /> Copy this id and share it with the employee to SignIn. <br /> ${idSt}`}
        className="mt-32"
      />

      <FormButton
        type="submit"
        ariaLabel="Create Employee"
        bg="bg-white"
        className="mt-32"
        handleOnClick={handleCreateButtonOnClick}
        icon="done"
        label="Create"
      />
    </form>
  );
}
