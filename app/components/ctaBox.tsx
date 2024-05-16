import Paper from "@mui/material/Paper";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type CtaBoxProps = {
  image: ImageProps["src"];
  header: string;
  body: string;
  icon?: ImageProps["src"];
  internalLink?: {
    href: string;
    label: string;
  };
  externalLink?: {
    href: string;
    label: string;
  };
};

const CtaBox = ({
  image,
  header,
  body,
  icon,
  internalLink,
  externalLink,
}: CtaBoxProps) => {
  return (
    <Paper>
      <div className="flex flex-row gap-6 container px-4 max-w-[956px]">
        <div className="flex flex-col basis-1/2">
          <h2>{header}</h2>
          <p>{body}</p>
          {internalLink && <a href={internalLink.href}>{internalLink.label}</a>}
          {externalLink && <a href={externalLink.href}>{externalLink.label}</a>}
        </div>
        <div className="basis-1/2">
          <Image src={image} alt={header} />
        </div>
      </div>
    </Paper>
  );
};

export default CtaBox;
