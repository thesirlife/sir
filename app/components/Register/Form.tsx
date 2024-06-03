"use client";

import { TextField, Divider } from "@mui/material";
import { submitForm } from "@/app/actions/submitForm";
import SubmitButton from "./Form/SubmitButton";
import { useFormState } from "react-dom";
import UserExists from "./UserExists";

const RegisterForm = () => {
  const [formState, action] = useFormState(submitForm, {
    status: "",
  });

  if (formState.status === "exists") {
    return <UserExists status={formState.status} />;
  }
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold">Setup Your Account</h2>
        <p className="text-lg mb-4 opacity-60">
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
        <SubmitButton>Finish Setup</SubmitButton>
      </form>
    </div>
  );
};

export default RegisterForm;
