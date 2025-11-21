interface IconProps {
  children: React.ReactNode;
  stroke?: string;
  width?: string;
  height?: string;
}

const Icon: React.FC<IconProps> = ({
  children,
  stroke = "var(--text-color-primary)",
  width = "16",
  height = "16",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    stroke={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export default Icon;
