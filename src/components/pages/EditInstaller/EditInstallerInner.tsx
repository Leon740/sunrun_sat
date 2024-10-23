import { useState } from 'react';
import { IEmployee, TEmployeePosition } from '@/types';
import { APIS } from '@/constants';
import { useAxios } from '@/hooks';
import { Avatar } from '@/components/general';
import {
  Input,
  Group,
  PositionSelect,
  CrewSelect,
  Status,
  FormButton,
  TOption
} from '@/components/form';

interface IEditInstallerInnerProps {
  employee: IEmployee;
}

export function EditInstallerInner({ employee }: IEditInstallerInnerProps) {
  // name
  type TName = Pick<IEmployee, 'firstname' | 'lastname'>;

  const [nameSt, setNameSt] = useState<TName>({
    firstname: employee.firstname,
    lastname: employee.lastname
  });

  const handleNameOnChange = (newName: TName) => {
    setNameSt(newName);
  };

  // employeeId
  type TEmployeeId = IEmployee['employeeId'];
  const [employeeIdSt, setEmployeeIdSt] = useState<TEmployeeId>(employee.employeeId);

  const handleEmployeeIdOnChange = (newEmployeeId: TEmployeeId) => {
    setEmployeeIdSt(newEmployeeId);
  };

  // position
  const [positionOptionSt, setPositionOptionSt] = useState<TOption>({
    label: employee.position,
    value: employee.position
  });

  // crew
  const [crewOptionSt, setCrewOptionSt] = useState<TOption>({
    label: employee.crew,
    value: employee.crew
  });

  // newEmployee
  const newEmployee: Omit<IEmployee, '_id'> = {
    ...employee,
    ...nameSt,
    employeeId: employeeIdSt,
    position: positionOptionSt.value as TEmployeePosition,
    crew: crewOptionSt.label.split(' - ')[0]
  };

  const queryUrl = `${APIS.EMPLOYEE_API_URI(employee.branchId)}/${employee._id}`;

  // handleUpdateButtonOnClick
  const { status: updateEmployeeStatus, triggerRequest: handleUpdateEmployeeButtonOnClick } =
    useAxios({
      query: 'put',
      url: queryUrl,
      body: newEmployee
    });

  // handleDeleteButtonOnClick
  const { status: deleteEmployeeStatus, triggerRequest: handleDeleteEmployeeButtonOnClick } =
    useAxios({
      query: 'delete',
      url: queryUrl
    });

  return (
    <form className="w-full flex flex-col gap-32">
      <Avatar name={nameSt} handleNameOnChange={handleNameOnChange} isEditable />

      <Group name="employeeId">
        <Input
          id="employeeId"
          value={employeeIdSt}
          handleOnChange={handleEmployeeIdOnChange}
          isEditable
        />
      </Group>

      <Group name="position">
        <PositionSelect
          isEditable
          activePositionOption={positionOptionSt}
          setActivePositionOption={setPositionOptionSt}
        />
      </Group>

      <Group name="crew">
        <CrewSelect
          isEditable
          activeCrewOption={crewOptionSt}
          setActiveCrewOption={setCrewOptionSt}
        />
      </Group>

      <Status
        status={updateEmployeeStatus}
        errorMessage="Error updating Employee"
        successMessage="Employee was successfully updated"
        className="mt-32"
      />

      <Status
        status={deleteEmployeeStatus}
        errorMessage="Error deleting Employee"
        successMessage="Employee was successfully deleted"
        className="mt-32"
      />

      <div className="flex flex-row mt-32 justify-between">
        <FormButton
          type="submit"
          ariaLabel="Update Employee"
          bg="bg-green"
          handleOnClick={handleUpdateEmployeeButtonOnClick}
          icon="done"
          label="Update"
        />

        <FormButton
          type="submit"
          ariaLabel="Delete Employee"
          bg="bg-red"
          handleOnClick={handleDeleteEmployeeButtonOnClick}
          icon="delete"
          label="Delete"
        />
      </div>
    </form>
  );
}
