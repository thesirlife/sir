"use client";

import { TextField, Divider } from "@mui/material";
import { FormState, register } from "@/app/actions/register";
import SubmitButton from "../SubmitButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import UserExists from "./UserExists";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [formState, action] = useFormState(register, {
    status: "pending" as FormState["status"],
  });

  // Set sessionStorage variable after Box Num entered correctly to prevent direct hit of /register page without Box Num entry
  useEffect(() => {
    const boxNum = sessionStorage.getItem("hasBoxNumber");
    if (boxNum !== "verified") {
      redirect("/enter-box-code");
    }
  }, []);

  if (formState.status === "exists") {
    return <UserExists status={formState.status} />;
  }

  if (formState.status === "error") {
    return (
      <div className="flex flex-col items-center">
        <h2 className="font-bold  text-center">
          There was an error with your registration.
        </h2>
        <p className="text-lg mb-4 opacity-60">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold">Set-up Your Account</h2>
        <p className="text-lg mb-8 opacity-60">
          Enter your information below to finish setting up your SIR account.
        </p>
      </div>
      <form
        action={action}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col gap-4 [&>*]:max-w-[260px]">
          <TextField
            name="email"
            id="email"
            inputMode="email"
            label="Email Address"
            InputLabelProps={{ shrink: true }}
            placeholder="enter email"
            required
            type="email"
          />
          <TextField
            name="username"
            id="username"
            label="First Name"
            InputLabelProps={{ shrink: true }}
            placeholder="enter first name"
            type="text"
            required
          />
          <TextField
            id="password"
            name="password"
            InputLabelProps={{ shrink: true }}
            inputProps={{ minLength: 8 }}
            label="New Password"
            placeholder="create your password"
            helperText="At least 8 characters, more is better."
            required
            type="password"
          />
        </div>
        <Divider className="my-8" flexItem />
        <SubmitButton className="px-16">Finish Setup</SubmitButton>
        <p className="text-xs leading-6 mt-8 text-center max-w-[500px]">
          We will not share your email address with any third parties. Your
          email address is used solely for account security purposes, such as
          verifying your identity and resetting your password. Rest assured,
          your email information is kept confidential and protected.
        </p>
        {formState.status === "invalid" && (
          <p className="text-red-500 font-semibold text-center max-w-100 mt-4">
            Your have entered an email address in a format we do not support,
            please enter only alphanumeric characters.
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
