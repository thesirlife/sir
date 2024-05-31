import Paper, { PaperProps } from "@mui/material/Paper";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { PodcastsOutlined } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import IconWithBackground from "../IconWithBackground";
import LinkWithIcon from "../LinkWithIcon";

type CtaBoxProps = PaperProps & {
  image: ImageProps["src"];
  header?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  link?: {
    href: string;
    label?: string;
    isExternal?: boolean;
  };
  narrow?: boolean;
  altBodyText?: boolean;
  boxLink?: string;
  imageOnTop?: boolean;
};

const CtaBox = ({
  image,
  header,
  icon,
  link,
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
          <Image src={image} alt={header || ""} className="w-full" />
          {Icon && (
            <IconWithBackground
              icon={PodcastsOutlined}
              className="absolute top-2 left-2"
            />
          )}
        </div>
        <div className="flex flex-col basis-1/2  overflow-x-hidden">
          <h3 className="text-xl">{header}</h3>
          <p
            className={`${
              altBodyText
                ? "text-navy-primary text-lg"
                : "text-navy-secondary overflow-hidden whitespace-nowrap text-ellipsis"
            }`}
          >
            {children}
          </p>
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
