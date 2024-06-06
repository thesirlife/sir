"use client";

import { Chip, Divider, Paper } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import SubmitButton from "../Register/Form/SubmitButton";

export type Choice = {
  text: string;
  isAnswer: boolean;
};

type HardCodedFormProps = {
  choices: Choice[];
};

const HardCodedForm = ({
  children,
  choices,
}: PropsWithChildren<HardCodedFormProps>) => {
  const [currentChoice, setCurrentChoice] = useState<Choice>();
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [submitted, setSubmittted] = useState<boolean>();

  const checkAnswer = (choice: Choice) => {
    if (choice.isAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setSubmittted(true);
  };

  return (
    <Paper elevation={2} className="p-6" square>
      <h2 className="text-navy-primary text-xl font-bold">{children}</h2>
      <Divider className="my-4" />
      <div className="flex flex-col gap-2">
        {choices.map((choice) => {
          return (
            <Chip
              className={`hover:border-orange-primary cursor-pointer flex justify-start text-lg  border-navy-secondary py-3 px-4 rounded-full h-full leading-4 ${
                choice === currentChoice
                  ? "border-green-primary text-green-primary"
                  : "text-navy-primary"
              }`}
              key={choice.text}
              variant="outlined"
              clickable={false}
              onClick={() => setCurrentChoice(choice)}
              label={choice.text}
            />
          );
        })}
      </div>
      <Divider className="my-4" />

      {!submitted ? (
        <SubmitButton
          onClick={() => checkAnswer(currentChoice as Choice)}
          disabled={!currentChoice?.text}
        >
          Check Answer
        </SubmitButton>
      ) : (
        isCorrect !== undefined && (
          <div className="mt-4 font-semibold text-lg">
            {isCorrect ? "Correct!" : "Incorrect!"}
          </div>
        )
      )}
    </Paper>
  );
};

export default HardCodedForm;
