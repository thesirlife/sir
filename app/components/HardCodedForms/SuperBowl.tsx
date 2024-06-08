import HardCodedForm, { Choice } from "./Form";

const SuperBowl = () => {
  const choices: Choice[] = [
    { text: "1967", isAnswer: false },
    { text: "1960", isAnswer: false },
    { text: "1970", isAnswer: true },
  ];
  return (
    <div>
      <HardCodedForm
        choices={choices}
        explanation="The first Super Bowl was played on January 15, 1967, between the Green Bay Packers and the Kansas City Chiefs. The Packers won the game 35-10.
"
      >
        In what year did the first Super Bowl take place?
      </HardCodedForm>
    </div>
  );
};

export default SuperBowl;
