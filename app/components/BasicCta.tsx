import { PropsWithChildren } from "react";
import Button from "./global/Button";
import { KeyboardArrowRight, OpenInNew } from "@mui/icons-material";
import { ButtonProps, Paper } from "@mui/material";

type BasicCtaProps = {
  button: {
    text: string;
    url: string;
    isExternal?: boolean;
    variant?: ButtonProps["variant"];
  };
  className?: string;
};

const BasicCta = ({
  children,
  button: { text, variant = "text", url, isExternal = false },
  ...props
}: PropsWithChildren<BasicCtaProps>) => {
  return (
    <Paper elevation={2} className={props.className}>
      <div className="bg-white p-4">
        <p className="text-navy-primary text-lg">{children}</p>
        <Button
          color="warning"
          variant={variant}
          className="mt-2"
          href={url}
          target={isExternal ? "_blank" : "_self"}
          endIcon={isExternal ? <OpenInNew /> : <KeyboardArrowRight />}
        >
          {text}
        </Button>
      </div>
    </Paper>
  );
};

export default BasicCta;
