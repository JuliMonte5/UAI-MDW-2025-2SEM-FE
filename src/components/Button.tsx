interface ButtonProps {
  handleClick?: () => void;
  label: string;
}

export const Button = (props: ButtonProps) => {
  const { handleClick, label } = props;
  return <button onClick={handleClick}>{label}</button>;
};
