import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { Icon } from '@/components/general';
import { Button } from './Button';

export interface TOption {
  label: string;
  value: string;
}
type TOptions = TOption[];

interface ISelectContext {
  options: TOptions;
  activeOption: TOption;
  setActiveOption: Dispatch<SetStateAction<TOption>>;
}

export const SelectContext = createContext<ISelectContext>({
  options: [],
  activeOption: { label: '', value: '' },
  setActiveOption: () => {}
});

interface ISelectInnerOptionProps {
  label: string;
  className: string;
}

export function SelectInnerOption({ label, className }: ISelectInnerOptionProps) {
  return (
    <div
      className={`w-full cursor-pointer font-roobert_regular text-16 text-dark_navy text-left py-8 px-16 ease-in-out duration-300 ${className}`}
    >
      {label}
    </div>
  );
}

interface ISelectOptionProps {
  children: ReactNode;
  option: TOption;
  handleOnFocus?: () => void;
  handleOnBlur?: () => void;
}

export function SelectOption({
  children,
  option,
  handleOnFocus,
  handleOnBlur
}: ISelectOptionProps) {
  const { setActiveOption } = useContext(SelectContext);

  const handleOnClick = () => {
    setActiveOption(option);
  };

  return (
    <Button
      type="button"
      ariaLabel={`Switch to ${option.label}`}
      handleOnClick={handleOnClick}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      className="w-full"
    >
      {children}
    </Button>
  );
}

interface ISelectProps {
  isEditable?: boolean;
  isUpdatesBetweenRenders?: boolean;
  options: TOptions | undefined;
  defaultOption: TOption;
  setActiveOption: (option: TOption) => void;
  renderActiveOption: (activeOption: TOption) => ReactNode;
  renderOptions: (option: TOptions) => ReactNode;
  activeMaxHeightClassName?: string;
}

export function Select({
  isEditable = true,
  isUpdatesBetweenRenders = false,
  options = [],
  defaultOption,
  setActiveOption,
  renderActiveOption,
  renderOptions,
  activeMaxHeightClassName = 'max-h-[256px]'
}: ISelectProps) {
  const optionsLength = options?.length || 0;

  // handleSelectOnChange
  const [activeOptionSt, setActiveOptionSt] = useState(defaultOption);

  useEffect(() => {
    if (isUpdatesBetweenRenders) {
      setActiveOptionSt(defaultOption);
    }
  }, [defaultOption]);

  useEffect(() => {
    if (activeOptionSt.value !== defaultOption.value) {
      setActiveOption(activeOptionSt);
    }
  }, [activeOptionSt]);

  // handleSelectOnFocusBlur
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectOnFocus = () => {
    selectRef.current?.classList.replace('max-h-full', activeMaxHeightClassName);
    if (optionsLength > 5) {
      selectRef.current?.classList.replace('overflow-hidden', 'overflow-auto');
    }
    selectRef.current?.classList.add('z-30');
    selectRef.current?.classList.replace('border-transparent', 'border-light_navy');
  };
  const handleSelectOnBlur = () => {
    setTimeout(() => {
      selectRef.current?.classList.replace(activeMaxHeightClassName, 'max-h-full');
      if (optionsLength > 5) {
        selectRef.current?.classList.replace('overflow-auto', 'overflow-hidden');
      }
      selectRef.current?.classList.remove('z-30');
      selectRef.current?.classList.replace('border-light_navy', 'border-transparent');
    }, 100);
  };

  return optionsLength ? (
    <SelectContext.Provider
      value={{
        options,
        activeOption: activeOptionSt,
        setActiveOption: setActiveOptionSt
      }}
    >
      <div className="relative h-[44px]">
        <div
          ref={selectRef}
          className="w-full absolute top-0 left-0
        rounded-8 border-2 border-transparent ease-in-out duration-300 max-h-full overflow-hidden"
        >
          <SelectOption
            key={`${activeOptionSt.label}_${activeOptionSt.value}_SelectOptionActive`}
            option={activeOptionSt}
            handleOnFocus={() => isEditable && handleSelectOnFocus()}
            handleOnBlur={() => isEditable && handleSelectOnBlur()}
          >
            {renderActiveOption(activeOptionSt)}
          </SelectOption>

          {isEditable && optionsLength > 1 && (
            <Button
              type="button"
              ariaLabel="Toggle Select"
              handleOnFocus={handleSelectOnFocus}
              handleOnBlur={handleSelectOnBlur}
              className="cursor-pointer absolute z-20 top-[12px] right-16 text-dark_navy"
            >
              <Icon icon="arrow" />
            </Button>
          )}

          <div className="flex flex-col">
            {renderOptions(options.filter((option) => option.value !== activeOptionSt.value))}
          </div>
        </div>
      </div>
    </SelectContext.Provider>
  ) : null;
}
