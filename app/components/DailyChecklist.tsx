import { ButtonGroup } from "@mui/material";
import Button from "./global/Button";

const DailyChecklist = () => {
  return (
    <div className="inline-flex flex-row py-3 pr-3 pl-6 items-center bg-white rounded-full">
      <p className="pr-4 text-navy-primary">My Daily Checklist</p>
      <ButtonGroup color="secondary" className="gap-1">
        <Button variant="contained" className="rounded-l-full">
          Trivia
        </Button>
        <Button variant="contained">Article</Button>
        <Button variant="contained">Video</Button>
        <Button variant="contained" className="rounded-r-full">
          Feedback
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default DailyChecklist;
