import { ArrowForward, OpenInNew } from "@mui/icons-material";
import Link, { LinkProps } from "next/link";

type LinkWithIconProps = LinkProps & {
  href: string;
  label: string;
  isExternal?: boolean;
};

const LinkWithIcon = ({
  href,
  label,
  isExternal = false,
  ...props
}: LinkWithIconProps) => {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : "_self"}
      className="flex items-center gap-1 leading-5"
      {...props}
    >
      <span>{label}</span>
      {isExternal ? (
        <OpenInNew fontSize="small" />
      ) : (
        <ArrowForward fontSize="small" />
      )}
    </Link>
  );
};

export default LinkWithIcon;
