import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

type ButtonProps = MuiButtonProps & {
  text: string;
};

const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <MuiButton
      variant="contained"
      color="warning"
      className="rounded-tr-xl rounded-tl-sm rounded-bl-xl rounded-br-sm text-white py-2 px-4"
      {...props}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
