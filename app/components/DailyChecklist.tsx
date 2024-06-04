import { ButtonGroup, Paper, PaperProps } from "@mui/material";
import Button from "./global/Button";

type DailyChecklistProps = PaperProps & {
  setCurrentSlide?: (slide?: number) => void;
};

const DailyChecklist = ({
  className,
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
        <Button
          variant="contained"
          className="rounded-l-full"
          onFocus={(e) => setCurrentSlide && setCurrentSlide(0)}
        >
          Trivia
        </Button>
        <Button
          variant="contained"
          onFocus={(e) => setCurrentSlide && setCurrentSlide(1)}
        >
          Article
        </Button>
        <Button
          variant="contained"
          onFocus={(e) => setCurrentSlide && setCurrentSlide(2)}
        >
          Video
        </Button>
        <Button
          variant="contained"
          onFocus={(e) => setCurrentSlide && setCurrentSlide(3)}
          className="rounded-r-full"
        >
          Feedback
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default DailyChecklist;
