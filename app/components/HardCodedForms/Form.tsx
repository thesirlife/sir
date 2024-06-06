import { RadioGroup } from "@mui/material";
import { PropsWithChildren } from "react";

export type Choice = {
  text: string;
  isAnswer: boolean;
};

type HardCodedFormProps = {
  choices: Choice[];
};

const checkAnswer = (answer: string) => {
  console.log(answer);
};

const HardCodedForm = ({
  children,
  choices,
}: PropsWithChildren<HardCodedFormProps>) => {
  return (
    <div>
      <h2>{children}</h2>
      <RadioGroup name="trivia-form-choices" onChange={() => checkAnswer}>
        {choices.map((choice) => {
          return <div key={choice.text}>{choice.text}</div>;
        })}
      </RadioGroup>
    </div>
  );
};

export default HardCodedForm;
