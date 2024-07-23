"use client";

import { Chip, Divider, Paper } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import SubmitButton from "../SubmitButton";
import { Check } from "@mui/icons-material";
import { Choice } from "@/app/types/trivia/types";
type HardCodedFormProps = {
  choices: Choice[];
  explanation: string;
	userId: Number;
};

const HardCodedForm = ({
  children,
  explanation,
  choices,
	userId,
}: PropsWithChildren<HardCodedFormProps>) => {
  const [currentChoice, setCurrentChoice] = useState<Choice>();
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [submitted, setSubmittted] = useState<boolean>();

  const checkAnswer = (choice: Choice) => {
		// @ts-ignore
		pendo.track("Checked Trivia", {
			answer: choice,
			visitorId: userId
		});

    if (choice.isAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setSubmittted(true);
  };

  return (
    <Paper elevation={2} className="p-6" square>
      <h2
        className="text-navy-primary text-xl font-bold"
        dangerouslySetInnerHTML={{ __html: children as string }}
      />
      <Divider className="my-4" />
      <div className="flex flex-col gap-2">
        {choices.map((choice) => {
          return (
            <Chip
              className={`hover:border-orange-primary cursor-pointer flex justify-start text-lg [&>.MuiChip-label]:w-full  py-3 px-3 rounded-full h-full leading-4 ${
                choice === currentChoice
                  ? "border-navy-primary border-2 text-navy-primary"
                  : "border-navy-secondary"
              } ${choice.isAnswer && submitted && "border-green-primary"} ${
                !choice.isAnswer &&
                submitted &&
                currentChoice === choice &&
                "border-red-800"
              }`}
              key={choice.text}
              variant="outlined"
              clickable={false}
              onClick={() => {
								// @ts-ignore
								pendo.track("Answered Trivia", {
									answer: choice,
									visitorId: userId
								});
								setCurrentChoice(choice)
							}}
              sx={{
                "& .MuiChip-label": {
                  overflow: "visible",
                },
              }}
              label={
                <div className="flex flex-col gap-1 justify-center">
                  {choice.isAnswer && submitted && (
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-green-primary text-sm">Correct!</div>
                      <Check />
                    </div>
                  )}
                  {!choice.isAnswer &&
                    submitted &&
                    currentChoice === choice && (
                      <div className="text-red-800 text-sm">Incorrect!</div>
                    )}
                  {choice.text}
                </div>
              }
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
        explanation
      )}
    </Paper>
  );
};

export default HardCodedForm;
