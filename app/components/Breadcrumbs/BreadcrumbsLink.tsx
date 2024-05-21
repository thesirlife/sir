import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

type BreadcrumbsLinkProps = LinkProps & {
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

const BreadcrumbsLink = ({
  href,
  icon,
  children,
  ...props
}: PropsWithChildren<BreadcrumbsLinkProps>) => {
  const Icon = icon;

  return (
    <Link href={href} className="text-lg flex items-center gap-1" {...props}>
      <Icon />
      {children}
    </Link>
  );
};

export default BreadcrumbsLink;
