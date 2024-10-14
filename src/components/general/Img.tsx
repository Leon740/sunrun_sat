interface IImgProps {
  src: string;
  alt?: string;
  parentClassName?: string;
  innerClassName?: string;
}

export function Img({ src, alt = 'Sunrun', parentClassName = '', innerClassName = '' }: IImgProps) {
  return (
    <div className={parentClassName}>
      <img src={src} alt={alt} className={innerClassName} />
    </div>
  );
}
