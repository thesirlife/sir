import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type ButtonProps = MuiButtonProps & {
  text: string;
};

const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <MuiButton
      className="rounded-tr-xl rounded-tl-sm rounded-bl-xl rounded-br-sm  py-2 px-3"
      {...props}
    >
      <span>{text}</span>
    </MuiButton>
  );
};

export default Button;
