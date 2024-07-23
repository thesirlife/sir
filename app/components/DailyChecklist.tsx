import { ButtonGroup, Paper, PaperProps } from "@mui/material";
import Button from "./global/Button";

type DailyChecklistProps = PaperProps & {
  setCurrentSlide?: (slide?: number) => void;
  currentSlide?: number;
};

const CheckListItems: Array<Record<string, number>> = [
  { Trivia: 0 },
  { "Brain Game": 1 },
  { Article: 2 },
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
      className={`inline-flex flex-row md:py-3 md:pr-3 md:pl-6 py-1 pr-1 pl-2 items-center bg-white rounded-full drop-shadow-md ${className}`}
      {...props}
    >
      <p className="md:pr-4 pr-2 text-navy-primary max-md:text-sm">
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
            className={`rounded-full max-md:text-xs  py-2 ${
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
