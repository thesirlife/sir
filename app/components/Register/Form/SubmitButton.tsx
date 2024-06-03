import { useFormStatus } from "react-dom";
import Button from "../../global/Button";
import { PropsWithChildren } from "react";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant="contained"
      color="warning"
      type="submit"
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
