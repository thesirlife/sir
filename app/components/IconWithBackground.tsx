import { SvgIconProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type IconWithBackgroundProps = SvgIconProps & {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

const IconWithBackground = ({
  icon,
  className,
  ...props
}: IconWithBackgroundProps) => {
  const Icon = icon;
  return (
    <div className={`bg-white rounded-full p-1 ${className}`}>
      <Icon {...props} />
    </div>
  );
};

export default IconWithBackground;
