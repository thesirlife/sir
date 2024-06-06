import HardCodedForm, { Choice } from "./Form";

const SuperBowl = () => {
  const choices: Choice[] = [
    { text: "New England Patriots", isAnswer: false },
    { text: "Kansas City Chiefs", isAnswer: false },
    { text: "Tampa Bay Buccaneers", isAnswer: true },
  ];
  return (
    <div>
      <HardCodedForm choices={choices}>
        In what year did the first Super Bowl take place?
      </HardCodedForm>
    </div>
  );
};

export default SuperBowl;
