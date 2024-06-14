import { SvgIconProps } from "@mui/material";

type IconWithBackgroundProps = SvgIconProps & {
  icon: JSX.Element | null;
};

const IconWithBackground = ({ icon, className }: IconWithBackgroundProps) => {
  return <div className={`bg-white rounded-full p-1 ${className}`}>{icon}</div>;
};

export default IconWithBackground;
