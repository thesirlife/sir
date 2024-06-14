import { LinkProps } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { PropsWithChildren } from "react";

type ButtonProps = MuiButtonProps & Pick<LinkProps, "target">;

const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <MuiButton {...props}>
      <span>{children}</span>
    </MuiButton>
  );
};

export default Button;
