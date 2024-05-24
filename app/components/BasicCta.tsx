import { PropsWithChildren } from "react";
import Button from "./global/Button";
import { OpenInNew } from "@mui/icons-material";

type BasicCtaProps = {
  button: {
    text: string;
  };
  className?: string;
};

const BasicCta = ({
  children,
  button: { text },
  ...props
}: PropsWithChildren<BasicCtaProps>) => {
  return (
    <div className={props.className}>
      <div className="bg-white p-4">
        <p className="text-navy-primary text-lg">{children}</p>
        <Button color="warning" variant="text" endIcon={<OpenInNew />}>
          {text}
        </Button>
      </div>
    </div>
  );
};

export default BasicCta;
