interface IRadioProps {
  name: string;
  color: 'yellow' | 'light_navy';
  onChange: (value: string) => void;
  isChecked: boolean;
}

export function Radio({ name, color, onChange, isChecked = false }: IRadioProps) {
  const colorIsYellow = color === 'yellow';

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
        className="hidden"
        onChange={(event) => onChange(event.target.value)}
      />

      <span
        className={`w-16 h-16 rounded-50 border-2 transition ${
          colorIsYellow
            ? `border-yellow ${isChecked ? 'bg-yellow' : ''}`
            : `border-light_navy ${isChecked ? 'bg-light_navy' : ''}`
        }`}
      />

      <span className="font-roobert_semibold text-20 capitalize">{name}</span>
    </label>
  );
}
