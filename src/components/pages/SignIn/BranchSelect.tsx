import { useEffect, useState } from 'react';
import { Select, SelectInnerOption, SelectOption, Status, TOption } from 'src/components/form';
import { useAxios } from '@/hooks';
import { TBranchShort } from '@/types';
import { APIS } from '@/constants';

interface IBranchSelectProps {
  activeBranchOption: TOption;
  setActiveBranchOption: (newBranch: TOption) => void;
}

interface IBranchSelectInnerProps extends IBranchSelectProps {
  branches: TBranchShort[];
}

function BranchSelectInner({
  branches,
  activeBranchOption,
  setActiveBranchOption
}: IBranchSelectInnerProps) {
  const options: TOption[] = branches.map((branch) => ({ value: branch._id, label: branch.name }));

  return (
    <Select
      isEditable
      options={options}
      defaultOption={activeBranchOption || { label: 'Select a Branch', value: 'Select a Branch' }}
      setActiveOption={setActiveBranchOption}
      renderActiveOption={(activeOption) => (
        <SelectInnerOption label={activeOption.label} className="bg-sky_blue border-t-0" />
      )}
      renderOptions={(options) =>
        options.map((option) => (
          <SelectOption key={`${option.label}_${option.value}_Option_BranchSelect`} option={option}>
            <SelectInnerOption
              label={option.label}
              className="bg-sky_blue border-t-2 border-light_navy hover:bg-light_navy"
            />
          </SelectOption>
        ))
      }
    />
  );
}

export function BranchSelect({ activeBranchOption, setActiveBranchOption }: IBranchSelectProps) {
  const [branchesSt, setBranchesSt] = useState<TBranchShort[]>([]);

  const { status: getShortBranchesStatus, triggerRequest: getShortBranches } = useAxios<
    TBranchShort[]
  >({
    query: 'get',
    url: APIS.ALL_BRANCHES_SHORT_API_URI,
    onSuccess: (data) => {
      setBranchesSt(data);
    }
  });

  useEffect(() => {
    getShortBranches();
  }, []);

  return branchesSt.length > 0 ? (
    <BranchSelectInner
      branches={branchesSt}
      activeBranchOption={activeBranchOption}
      setActiveBranchOption={setActiveBranchOption}
    />
  ) : (
    <Status status={getShortBranchesStatus} errorMessage="Error fetching Branches" />
  );
}
