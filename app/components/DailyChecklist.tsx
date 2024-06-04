import { ButtonGroup, Paper, PaperProps } from "@mui/material";
import Button from "./global/Button";

type DailyChecklistProps = PaperProps & {
  setCurrentSlide?: (slide?: number) => void;
  currentSlide?: number;
};

const CheckListItems: Array<Record<string, number>> = [
  { Trivia: 0 },
  { Article: 1 },
  { Video: 2 },
  { Feedback: 3 },
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
      className={`inline-flex flex-row py-3 pr-3 pl-6 items-center bg-white rounded-full drop-shadow-md ${className}`}
      {...props}
    >
      <p className="pr-4 text-navy-primary">My Daily Checklist</p>
      <ButtonGroup color="secondary" className="gap-1">
        {CheckListItems.map((item, index) => (
          <Button
            key={index}
            variant="contained"
            onFocus={() =>
              setCurrentSlide && setCurrentSlide(Object.values(item)[0])
            }
            className={`rounded-full ${
              currentSlide === Object.values(item)[0] &&
              "bg-green-primary text-white"
            }`}
          >
            {Object.keys(item)[0]}
          </Button>
        ))}
      </ButtonGroup>
    </Paper>
  );
};

export default DailyChecklist;
