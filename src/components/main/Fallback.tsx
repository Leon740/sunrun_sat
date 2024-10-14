interface IFallbackProps {
  gradient: string;
  textColor: string;
  textLabel: string;
}

export function Fallback({ gradient, textColor, textLabel }: IFallbackProps) {
  return (
    <section className={`absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-t ${gradient}`}>
      <h1
        className={`font-roobert_bold text-64 leading-none uppercase absolute bottom-64 left-64 ${textColor}`}
        dangerouslySetInnerHTML={{ __html: textLabel }}
      />
    </section>
  );
}
