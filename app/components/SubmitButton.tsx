import { useFormStatus } from "react-dom";
import Button from "./global/Button";
import { ButtonProps } from "@mui/material";

type SubmitButtonProps = ButtonProps & {
  children: React.ReactNode;
};

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant="contained"
      color="warning"
      type="submit"
      {...props}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
