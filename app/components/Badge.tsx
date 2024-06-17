import { Paper, Chip, ChipProps } from "@mui/material";
import Image from "next/image";
import { CheckCircle, CircleOutlined } from "@mui/icons-material";

// this will change eventually when we get the response from the server
type BadgeProps = {
  name: string;
  complete: boolean;
  image: string;
} & ChipProps;
//

const Badge = ({ name, complete, image, onClick }: BadgeProps) => {
  return (
    <Paper elevation={2} className="p-4 rounded-lg max-w-[270px] w-full">
      <div className="flex flex-col gap-3">
        <Image src={image} alt={name} width={240} height={120} />
        <div className="flex flex-col justify-between items-center text-center gap-3">
          <h3 className="text-green-primary text-xl font-bold">{name}</h3>
          {complete ? (
            <Chip
              className="font-medium tracking-wider"
              color="primary"
              icon={<CheckCircle />}
              label="COMPLETE"
              variant="filled"
              onClick={onClick}
            />
          ) : (
            <Chip
              className="font-medium tracking-wider"
              color="primary"
              icon={<CircleOutlined />}
              label="MARK COMPLETE"
              variant="outlined"
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </Paper>
  );
};

export default Badge;
