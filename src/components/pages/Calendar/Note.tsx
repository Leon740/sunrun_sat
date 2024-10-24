interface INotesProps {
  label: string;
}

export function Note({ label }: INotesProps) {
  return <p className="font-roobert_regular text-16 text-red text-center">{label}</p>;
}
