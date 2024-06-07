import Paper, { PaperProps } from "@mui/material/Paper";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { PropsWithChildren } from "react";
import LinkWithIcon from "../LinkWithIcon";

type CtaBoxWideProps = PaperProps & {
  image: ImageProps["src"];
  imageWidth: number;
  imageHeight: number;
  header?: string;
  link?: {
    href: string;
    label?: string;
    isExternal?: boolean;
  };
};

const CtaBoxWide = ({
  image,
  header,
  link,
  imageHeight,
  imageWidth,
  children,
  ...props
}: PropsWithChildren<CtaBoxWideProps>) => {
  return (
    <Paper elevation={2} square {...props}>
      <div className="flex flex-row gap-4 p-6 justify-between max-w-[560px]">
        <div className="flex flex-col overflow-x-hidden basis-2/3">
          <h3 className="text-xl font-bold mb-2">{header}</h3>
          <div
            className="text-navy-secondary overflow-hidden whitespace-nowrap text-ellipsis"
            dangerouslySetInnerHTML={{
              __html: children as string,
            }}
          ></div>
          {link ? (
            <div className="text-orange-primary text-sm uppercase mt-8">
              <LinkWithIcon
                href={String(link?.href)}
                label={String(link?.label)}
                isExternal={link?.isExternal}
              />
            </div>
          ) : null}
        </div>
        <Image
          src={image}
          alt={header || ""}
          width={imageWidth}
          height={imageHeight}
          className={`w-full basis-1/3 max-w-[152px] max-w-[${imageWidth}px] max-h-[${imageHeight}px]`}
        />
      </div>
    </Paper>
  );
};

export default CtaBoxWide;
