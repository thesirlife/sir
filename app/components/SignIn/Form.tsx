"use client";

import { TextField } from "@mui/material";
import SubmitButton from "../Register/Form/SubmitButton";
import { login } from "@/app/actions/logIn";
import { useFormState } from "react-dom";

const SignInForm = () => {
  const [formState, action] = useFormState(login, {
    status: "",
  });

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold">Log In To Your Account</h2>
        <p className="text-lg mb-4 opacity-60">
          If you&apos;ve already created your account, sign in below.
        </p>
      </div>
      <form action={action}>
        <div className="flex flex-col gap-4 [&>*]:max-w-[260px] items-center">
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
            id="password"
            name="password"
            InputLabelProps={{ shrink: true }}
            inputProps={{ minLength: 8 }}
            label="Password"
            placeholder="enter your password"
            required
            type="password"
          />
          <SubmitButton>Log In</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
