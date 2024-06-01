"use client";

import { TextField, Divider } from "@mui/material";
import { submitForm } from "@/app/actions/submitForm";
import SubmitButton from "./Form/SubmitButton";
import { useFormState } from "react-dom";

const RegisterForm = () => {
  const [formState, action] = useFormState(submitForm, {
    status: "",
  });

  console.log(formState.status);
  if (formState.status) {
    return <div>lit mane</div>;
  }
  return (
    <div>
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
            placeholder="enter email"
            required
            type="email"
          />
          <TextField
            name="username"
            id="username"
            label="First Name"
            placeholder="enter first name"
            type="text"
            required
          />
          <TextField
            id="password"
            name="password"
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
