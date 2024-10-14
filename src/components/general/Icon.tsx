export type TIcons = 'arrow' | 'calendar' | 'delete' | 'done' | 'edit' | 'profile';

interface IIconProps {
  icon: TIcons;
  size?: string;
  className?: string;
}

export function Icon({ icon, size = 'text-16', className = '' }: IIconProps) {
  return <i className={`icon-${icon} ${size} ${className}`} />;
}
