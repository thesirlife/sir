"use client";

import { TextField, Divider } from "@mui/material";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/components/SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormState, resetPassword } from "@/app/actions/resetPassword";
import { useState } from "react";

const ResetPasswordForm = () => {
  const [formState, action] = useFormState(resetPassword, {
    status: "pending" as FormState["status"],
  });
  const [formValid, setFormValid] = useState(false);

  type FormInput = {
    email: string;
    password: string;
    passwordConfirmation: string;
    code: string;
  };

  const { register, handleSubmit, watch } = useForm<FormInput>();
  // const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

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
            id="email"
            inputMode="email"
            label="Email Address"
            InputLabelProps={{ shrink: true }}
            placeholder="enter email"
            required
            {...register("email")}
          />
          <TextField
            id="password"
            InputLabelProps={{ shrink: true }}
            inputProps={{ minLength: 8 }}
            label="New Password"
            placeholder="create your new password"
            helperText="At least 8 characters, more is better."
            required
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          <TextField
            id="passwordConfirmation"
            InputLabelProps={{ shrink: true }}
            inputProps={{ minLength: 8 }}
            label="New Password Again"
            placeholder="confirm your new password"
            required
            type="password"
            {...register("passwordConfirmation", {
              required: true,
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          <TextField
            id="code"
            inputMode="text"
            label="Code"
            InputLabelProps={{ shrink: true }}
            inputProps={{ minLength: 8, maxLength: 8 }}
            placeholder="enter your password reset code"
            required
            type="text"
            {...register("code")}
          />
        </div>
        <Divider className="my-8" flexItem />
        <SubmitButton disabled={!formValid}>Reset Password</SubmitButton>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
