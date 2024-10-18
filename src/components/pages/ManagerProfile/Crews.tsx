import { useRef, useState } from 'react';
import { Group, Status, FormButton } from '@/components/form';
import { POSITIONS, ROUTES, APIS } from '@/constants';
import { IEmployee, IEmployeesHashTable, TEmployeePosition } from 'src/types';
import { useAxios } from 'src/hooks';
import { EmployeeButton, EmployeePositionSelect } from './EmployeePositionSelect';
import { useEmployeeContext } from 'src/contexts';
import { useNavigate } from 'react-router-dom';

interface ICrewsInnerProps {
  employeesHashTable: IEmployeesHashTable;
}

function CrewsInner({ employeesHashTable }: ICrewsInnerProps) {
  // employeesState
  const { allEmployees, employeesByPosition } = employeesHashTable;
  const [employeesSt, setEmployeesSt] = useState(allEmployees);

  // crews
  const unassignedCrew = 'unassigned';

  // initialCrews
  // create crews based on foremans { [crewId = foreman._id]: crewName = foreman.crew }
  const initialCrews: { [key: IEmployee['_id']]: IEmployee['crew'] } = {};

  employeesByPosition.Foreman.forEach((foremanId) => {
    const crew = employeesSt[foremanId].crew;

    // do not include unassigned crew
    if (crew !== unassignedCrew) {
      initialCrews[foremanId] = crew;
    }
  });

  // initialCrews
  // add new crew
  initialCrews['New'] = 'New';

  // employeesArrayByPosition
  // get employees data by position
  const employeesArrayByPosition: { [key in TEmployeePosition]: IEmployee[] } = {
    Foreman: [],
    Lead: [],
    Installer: [],
    Electrician: []
  };

  POSITIONS.forEach((position) => {
    employeesArrayByPosition[position.title] = employeesByPosition[position.title].map(
      (_id) => employeesSt[_id]
    );
  });

  // handleCrewsOnChange
  // store pending data in ref
  const crewsRef = useRef(initialCrews);

  const handleCrewsOnChange = (_id: IEmployee['_id'], newCrewName: IEmployee['crew']) => {
    crewsRef.current[_id] = newCrewName;
    // console.log(_id);
    // console.log(newCrewName);
    // console.log(crewsRef.current);
  };

  // handleCrewsOnSave
  // store final data in state
  const [crewsSt, setCrewsSt] = useState(initialCrews);

  const handleCrewsOnSave = (_id: IEmployee['_id'], newCrewName: IEmployee['crew']) => {
    setCrewsSt(crewsRef.current);

    // get old crew name of selected foreman
    const crewForeman = employeesSt[_id];
    const oldCrewName = crewForeman?.crew || unassignedCrew;

    POSITIONS.forEach((position) => {
      // get crew employee in each position
      const crewEmployee = employeesArrayByPosition[position.title].find(
        (employee) => employee.crew === oldCrewName
      );

      // update employee with newCrewName
      if (crewEmployee) {
        setEmployeesSt((prevEmployees) => ({
          ...prevEmployees,
          [crewEmployee._id]: { ...crewEmployee, crew: newCrewName }
        }));
      }
    });
  };

  // handleEmployeeSelectOnChange
  const handleEmployeeSelectOnChange = (
    prevId: IEmployee['_id'],
    newId: IEmployee['_id'],
    crew: IEmployee['crew']
  ) => {
    if (prevId !== newId) {
      // {
      //   prev: Leo,
      //   new: Leo
      // }

      setEmployeesSt((prev) => {
        const prevEmployee = prev[prevId];
        const newEmployee = prev[newId];

        if (!prevId && newId) {
          // {
          //   prev: Add,
          //   new: Leo
          // }
          console.log('1. (!prevId && newId)');
          return {
            ...prev,
            [newId]: { ...newEmployee, crew }
          };
        }
        if (prevId && !newId) {
          // {
          //   prev: Leo,
          //   new: Add
          // }
          console.log('2. (prevId && !newId)');
          return {
            ...prev,
            [prevId]: { ...prevEmployee, crew: unassignedCrew }
          };
        }
        if (prevId && newId) {
          // {
          //   prev: Jon,
          //   new: Leo
          // }
          console.log('3. (prevId && newId)');

          if (prevEmployee.position === 'Foreman' && newEmployee.position === 'Foreman') {
            // if ForemanOnChange swap Foremans
            console.log('ForemanOnChange');
            return {
              ...prev,
              [prevId]: { ...prevEmployee, crew: newEmployee.crew },
              [newId]: { ...newEmployee, crew: prevEmployee.crew }
            };
          }

          return {
            ...prev,
            [prevId]: { ...prevEmployee, crew: unassignedCrew },
            [newId]: { ...newEmployee, crew }
          };
        }

        return prev;
      });
    }
  };

  // isEditInProgress
  const [isEditInProgress, setIsEditInProgress] = useState<boolean>(false);

  const { status, triggerRequest: putEmployees } = useAxios<IEmployeesHashTable>({
    query: 'put',
    url: APIS.EMPLOYEE_API_URI
  });

  const handleEditButtonOnClick = () => {
    setIsEditInProgress(true);
  };

  // router
  const navigate = useNavigate();

  const handleNewEmployeeButtonOnClick = () => {
    navigate(ROUTES.newEmployee);
  };

  const handleResetButtonOnClick = () => {
    setIsEditInProgress(false);

    // restore employees state
    setEmployeesSt(employeesHashTable.allEmployees);
  };
  const handleSaveButtonOnClick = () => {
    setIsEditInProgress(false);

    // send employees
    putEmployees({
      reqBody: Object.values(employeesSt)
    });
  };

  return (
    <>
      <div className="py-32 flex flex-col gap-32">
        <div className="flex flex-row justify-between">
          {isEditInProgress ? (
            <>
              <FormButton
                type="button"
                ariaLabel="Reset Crews"
                bg="bg-red"
                handleOnClick={handleResetButtonOnClick}
                icon="delete"
                label="Reset Crews"
              />
              <FormButton
                type="button"
                ariaLabel="Save Crews"
                bg="bg-green"
                handleOnClick={handleSaveButtonOnClick}
                icon="done"
                label="Save Crews"
              />
            </>
          ) : (
            <>
              <FormButton
                type="button"
                ariaLabel="Edit Crews"
                bg="bg-yellow"
                handleOnClick={handleEditButtonOnClick}
                icon="edit"
                label="Edit Crews"
              />
              <FormButton
                type="button"
                ariaLabel="New Employee"
                bg="bg-white"
                handleOnClick={handleNewEmployeeButtonOnClick}
                icon="profile"
                label="New Employee"
              />
            </>
          )}
        </div>

        <Status
          status={status}
          errorMessage="Error updating Employees."
          successMessage="Employees updated successfully."
        />
      </div>

      {Object.entries(crewsSt).map(([_id, crew]) => (
        <Group
          key={`${crew}_Crew`}
          name={crew}
          // unassignedCrew should not get into crewsSt onChange
          isEditable={isEditInProgress && crew !== unassignedCrew}
          handleOnChange={(crewName) => handleCrewsOnChange(_id, crewName)}
          handleOnSave={(crewName) => handleCrewsOnSave(_id, crewName)}
        >
          <div className="flex flex-row flex-wrap gap-16">
            {POSITIONS.map((position) => (
              <EmployeePositionSelect
                key={`${crew}_Crew_${position.title}_Select`}
                employees={employeesArrayByPosition[position.title]}
                crew={crew}
                color={position.color}
                title={position.title}
                handleOnChange={handleEmployeeSelectOnChange}
                isEditable={isEditInProgress}
              />
            ))}
          </div>
        </Group>
      ))}
      <div className="pt-32">
        <Group name="unassigned employees">
          {POSITIONS.map((position) => {
            const unassignedEmployeesByPosition = employeesArrayByPosition[position.title].filter(
              (employee) => employee.crew === unassignedCrew
            );

            return (
              unassignedEmployeesByPosition.length > 0 && (
                <div
                  key={`${unassignedCrew}_Crew_${position.title}_List`}
                  className="flex flex-row flex-wrap gap-16"
                >
                  {unassignedEmployeesByPosition.map((employee) => (
                    <div
                      key={`${unassignedCrew}_Crew_${position.title}_List_${employee._id}_Item`}
                      className="basis-128"
                    >
                      <EmployeeButton
                        _id={employee._id}
                        label={employee.nickname}
                        color={position.color}
                      />
                    </div>
                  ))}
                </div>
              )
            );
          })}
        </Group>
      </div>
    </>
  );
}

export function Crews() {
  const { employeesHashTable, status } = useEmployeeContext();

  return employeesHashTable ? (
    <CrewsInner employeesHashTable={employeesHashTable} />
  ) : (
    <Status status={status} errorMessage="Error fetching Employees." />
  );
}
