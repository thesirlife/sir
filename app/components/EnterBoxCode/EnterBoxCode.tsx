"use client";

import SubmitButton from "../Register/Form/SubmitButton";
import { FormState, login } from "@/app/actions/logIn";
import { useFormState } from "react-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { SetStateAction, useRef, useState } from "react";

const EnterBoxCodeForm = () => {
  const [formState, action] = useFormState(login, {
    status: "pending" as FormState["status"],
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

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold">Welcome to the SIR Online Experience</h2>
        <p className="text-lg mb-4 opacity-60">
          Sign in to access your SIR Community, games, and more.
        </p>
      </div>
      <form action={action}>
        <div className="flex flex-col gap-4 [&>*]:max-w-[400px] items-center">
          <MuiOtpInput
            length={6}
            autoFocus
            value={otp}
            onChange={handleCodeEnter}
            onComplete={handleCompleted}
            validateChar={validateChar}
            className="gap-2 border-orange-primary"
            TextFieldsProps={{ placeholder: "-" }}
          />
          <SubmitButton>Log In</SubmitButton>
          {formState.status === "error" && (
            <p className="text-red-500 font-semibold text-center">
              Your credentials are invalid, please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnterBoxCodeForm;
function useref(arg0: null) {
  throw new Error("Function not implemented.");
}
