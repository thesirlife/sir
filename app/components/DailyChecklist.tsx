import { ButtonGroup, Paper, PaperProps } from "@mui/material";
import Button from "./global/Button";

type DailyChecklistProps = PaperProps & {
  setCurrentSlide?: (slide?: number) => void;
  currentSlide?: number;
};

const CheckListItems: Array<Record<string, number>> = [
  { "Complete Trivia": 0 },
  { "Complete BrainGame": 1 },
  { "Read Article": 2 },
];

const DailyChecklist = ({
  className,
  currentSlide,
  setCurrentSlide,
  ...props
}: DailyChecklistProps) => {
  return (
    <Paper
      elevation={2}
      className={`max-sm:w-[90%] inline-flex flex-col md:flex-row md:py-3  md:pl-6 py-2 pr-3 pl-3 items-center bg-white rounded-full drop-shadow-md ${className}`}
      {...props}
    >
      <p className="md:pr-4 pr-2 max-md:pb-2 max-sm:pl-2 text-navy-primary">
        My Daily Checklist
      </p>
      <ButtonGroup color="secondary" className="gap-1">
        {CheckListItems.map((item, index) => (
          <Button
            key={index}
            variant="contained"
            onFocus={() =>
              setCurrentSlide && setCurrentSlide(Object.values(item)[0])
            }
            className={`rounded-full max-w-[140px] max-md:text-xs leading-tight  py-2 ${
              currentSlide === Object.values(item)[0] &&
              "bg-green-primary text-white"
            }`}
          >
            {index + 1}. {Object.keys(item)[0]}
          </Button>
        ))}
      </ButtonGroup>
    </Paper>
  );
};

export default DailyChecklist;
