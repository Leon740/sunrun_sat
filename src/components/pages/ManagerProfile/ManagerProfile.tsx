import { useEmployeeContext } from '@/contexts';
import { Avatar } from '@/components/general';
import { Input, Group } from '@/components/form';
import { Crews } from './Crews';

export default function ManagerProfile() {
  // managerContext
  const { employee: manager } = useEmployeeContext();

  // name
  const { firstname, lastname } = manager;
  const name = {
    firstname,
    lastname
  };

  return (
    <form className="w-full flex flex-col gap-32">
      <Avatar name={name} isEditable={false} />

      <Group name={'employeeId'}>
        <Input id={'employeeId'} value={manager.employeeId} isEditable={false} />
      </Group>

      <Group name={'branch'}>
        <Input id={'branch'} value={manager.branch} isEditable={false} />
      </Group>

      <Crews />
    </form>
  );
}
