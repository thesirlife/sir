import Paper, { PaperProps } from "@mui/material/Paper";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { PodcastsOutlined } from "@mui/icons-material";
import IconWithBackground from "../IconWithBackground";
import LinkWithIcon from "../LinkWithIcon";

type CtaBoxProps = PaperProps & {
  image: ImageProps["src"];
  imageWidth?: number;
  imageHeight?: number;
  header?: string;
  icon?: JSX.Element;
  link?: {
    href: string;
    label?: string;
    isExternal?: boolean;
  };
  narrow?: boolean;
  altBodyText?: boolean;
  imageOnTop?: boolean;
};

const CtaBox = ({
  image,
  header,
  icon,
  link,
  imageHeight = 160,
  imageWidth = 400,
  imageOnTop = true,
  narrow,
  children,
  altBodyText = false,
  ...props
}: PropsWithChildren<CtaBoxProps>) => {
  const Icon = icon;
  return (
    <Paper elevation={2} square {...props}>
      <div
        className={`flex flex-col gap-4 ${
          narrow ? "p-4" : "p-6"
        } max-w-[442px]`}
      >
        <div
          className={`basis-1/2 relative ${
            imageOnTop ? "order-first" : "order-last"
          }`}
        >
          <Image
            src={image}
            alt={header || ""}
            width={imageWidth}
            height={imageHeight}
            className="w-full max-h-[160px] object-cover"
          />
          {Icon && (
            <IconWithBackground
              icon={<PodcastsOutlined />}
              className="absolute top-2 left-2"
            />
          )}
        </div>
        <div className="flex flex-col basis-1/2  overflow-x-hidden">
          <h3
            className="text-xl font-bold mb-2"
            dangerouslySetInnerHTML={{ __html: header || ("" as string) }}
          />
          <div
            className={`${
              altBodyText
                ? "text-navy-primary text-lg"
                : "text-navy-secondary overflow-hidden "
            }`}
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
      </div>
    </Paper>
  );
};

export default CtaBox;
