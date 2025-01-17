"use client";

import SubmitButton from "../SubmitButton";
import { useFormState } from "react-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Divider } from "@mui/material";
import { checkBoxNumber, FormState } from "@/app/actions/checkBoxNumber";
import { redirect } from "next/navigation";

const EnterBoxCodeForm = () => {
  const [formState, action] = useFormState(checkBoxNumber, {
    verified: null as FormState["verified"],
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [otp, setOtp] = useState("");

  const handleCompleted = () => {
    buttonRef.current?.focus();
  };
  const handleCodeEnter = (newValue: SetStateAction<string>) => {
    setOtp(newValue);
  };
  const matchIsNumeric = (text: number | string) => {
    const isNumber = typeof text === "number";
    const isString = typeof text === "string";
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  };
  const validateChar = (value: string | number) => {
    return matchIsNumeric(value);
  };

  useEffect(() => {
    if (formState.verified === true) {
      sessionStorage.setItem("hasBoxNumber", "verified");
      redirect("/register");
    }
  }, [formState]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-center text-navy-primary mb-1">
          Welcome to the SIR Online Experience
        </h2>
        <p className="text-lg opacity-60">
          Sign in to access your SIR Community, games, and more.
        </p>
      </div>
      <Divider className="my-8" flexItem />
      <form action={action}>
        <div className="flex flex-col gap-4 [&>*]:max-w-[400px] items-center">
          <MuiOtpInput
            length={6}
            autoFocus
            value={otp}
            id="number"
            onChange={handleCodeEnter}
            onComplete={handleCompleted}
            validateChar={validateChar}
            className="gap-3"
            TextFieldsProps={(index) => ({
              placeholder: "-",
              name: `number${index}`,
            })}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: (theme) => theme.palette.warning.main,
              },
            }}
          />
          <SubmitButton>Continue</SubmitButton>
          {formState.verified === false && (
            <p className="text-red-500 font-semibold text-center">
              Sorry, we don&apos;t recognize the number you entered. Please
              check your box code and try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnterBoxCodeForm;
