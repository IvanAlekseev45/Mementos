interface IconSvgProps {
  size: number;
  name: string;
}

const IconSvg = ({ size, name }: IconSvgProps) => {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" aria-hidden="true">
      <use href={`/symbol-defs.svg#${name}`} />
    </svg>
  );
};

export default IconSvg;
