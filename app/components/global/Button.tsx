import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type ButtonProps = MuiButtonProps & {
  text: string;
};

const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <MuiButton
      className="rounded-tr-full rounded-tl-md rounded-bl-full rounded-br-md"
      {...props}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
