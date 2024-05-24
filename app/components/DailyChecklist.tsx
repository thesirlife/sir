import { ButtonGroup, Paper } from "@mui/material";
import Button from "./global/Button";
import { FC } from "react";

const DailyChecklist: FC = () => {
  return (
    <Paper
      elevation={2}
      className="inline-flex flex-row py-3 pr-3 pl-6 items-center bg-white rounded-full drop-shadow-md"
    >
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
    </Paper>
  );
};

export default DailyChecklist;
