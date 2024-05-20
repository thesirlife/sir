import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import { PropsWithChildren } from "react";

type BreadcrumbsLinkProps = {
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

const BreadcrumbsLink = ({
  href,
  icon,
  children,
}: PropsWithChildren<BreadcrumbsLinkProps>) => {
  const Icon = icon;

  return (
    <Link href={href} className="text-lg flex items-center gap-1">
      <Icon />
      {children}
    </Link>
  );
};

export default BreadcrumbsLink;
