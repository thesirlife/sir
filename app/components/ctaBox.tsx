import Paper from "@mui/material/Paper";
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { OpenInNew, PodcastsOutlined } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import IconWithBackground from "./iconWithBackground";

type CtaBoxProps = {
  image: ImageProps["src"];
  header: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
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
  icon,
  internalLink,
  externalLink,
  children,
}: PropsWithChildren<CtaBoxProps>) => {
  const Icon = icon;
  return (
    <Paper square>
      <div className="flex flex-col gap-4 container p-6 max-w-[956px]">
        <div className="basis-1/2 relative ">
          <Image src={image} alt={header} className="w-full" />
          {Icon && (
            <IconWithBackground
              icon={PodcastsOutlined}
              className="absolute top-2 left-2"
            />
          )}
        </div>
        <div className="flex flex-col basis-1/2  overflow-x-hidden">
          <h3 className="text-xl">{header}</h3>
          <p className="text-navy-secondary overflow-hidden whitespace-nowrap text-ellipsis">
            {children}
          </p>
          <div className="text-orange-primary text-sm uppercase mt-8">
            {internalLink && (
              <a href={internalLink.href}>{internalLink.label}</a>
            )}
            {externalLink && (
              <a
                href={externalLink.href}
                className="flex items-center gap-1 leading-5"
              >
                <span>{externalLink.label}</span> <OpenInNew fontSize="small" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default CtaBox;
