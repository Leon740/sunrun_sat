interface IRadioProps {
  name: string;
  color: 'yellow' | 'light_navy';
  onChange: (value: string) => void;
  isChecked: boolean;
  disabled: boolean;
}

export function Radio({ name, color, onChange, isChecked = false, disabled = false }: IRadioProps) {
  const colorIsYellow = color === 'yellow';
  const cursorClassName = `${disabled ? '' : 'cursor-pointer'}`;

  return (
    <label
      className={`flex flex-row items-center gap-8 ${
        colorIsYellow ? 'text-yellow' : 'text-light_navy'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={name}
        checked={isChecked}
        disabled={disabled}
        className="hidden"
        onChange={(event) => onChange(event.target.value)}
      />

      <span
        className={`w-16 h-16 rounded-50 border-2 transition
          ${cursorClassName}
          ${
            colorIsYellow
              ? `border-yellow ${isChecked ? 'bg-yellow' : ''}`
              : `border-light_navy ${isChecked ? 'bg-light_navy' : ''}`
          }
          `}
      />

      <span className={`font-roobert_semibold text-20 capitalize ${cursorClassName}`}>{name}</span>
    </label>
  );
}
