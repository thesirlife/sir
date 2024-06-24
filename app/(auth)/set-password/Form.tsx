"use client";

import { TextField, Divider } from "@mui/material";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/components/SubmitButton";
import { useForm, Controller } from "react-hook-form";
import { FormState, setPassword } from "@/app/actions/setPassword";
import { redirect } from "next/navigation";

const SetPasswordForm = () => {
  const [serverFormState, action] = useFormState(setPassword, {
    status: "pending" as FormState["status"],
  });

  type FormInput = {
    email: string;
    password: string;
    passwordConfirmation: string;
    code: string;
  };

  serverFormState.status === "reset" ? redirect("/login") : null;

  const {
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<FormInput>({ mode: "onChange" });
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold">Set Your New Password</h2>
        <p className="text-lg mb-8 opacity-60 text-center">
          Enter your information, along with the code sent via email, to reset
          your password.
        </p>
      </div>
      <form
        action={action}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col gap-4 [&>*]:max-w-[260px]">
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{ required: "email is required" }}
            render={({ field }) => (
              <TextField
                id="email"
                inputMode="email"
                label="Email Address"
                InputLabelProps={{ shrink: true }}
                placeholder="enter email"
                required
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{ required: "password is required" }}
            render={({ field }) => (
              <TextField
                id="password"
                InputLabelProps={{ shrink: true }}
                inputProps={{ minLength: 8 }}
                label="New Password"
                placeholder="create your new password"
                helperText="At least 8 characters, more is better."
                required
                type="password"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="passwordConfirmation"
            defaultValue=""
            rules={{
              required: "Password is required",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do not match";
                }
              },
            }}
            render={({ field }) => (
              <TextField
                defaultValue=""
                id="passwordConfirmation"
                InputLabelProps={{ shrink: true }}
                inputProps={{ minLength: 8 }}
                label="New Password Again"
                placeholder="confirm your new password"
                required
                type="password"
                {...field}
              />
            )}
          />
          {errors.passwordConfirmation && (
            <p className="text-red-500">
              {errors.passwordConfirmation.message}
            </p>
          )}
          <Controller
            control={control}
            name="code"
            rules={{ required: "code is required" }}
            render={({ field }) => (
              <TextField
                id="code"
                inputMode="text"
                label="Code"
                InputLabelProps={{ shrink: true }}
                inputProps={{ minLength: 8, maxLength: 8 }}
                placeholder="enter your password reset code"
                required
                type="text"
                {...field}
              />
            )}
          />
        </div>
        <Divider className="my-8" flexItem />
        <SubmitButton disabled={!isValid}>Set Password</SubmitButton>
        {serverFormState.status === "error" && (
          <p className="text-red-500 font-semibold text-center max-w-100 mt-4">
            Something went wrong. Please double check your information and try
            again.
          </p>
        )}
      </form>
    </div>
  );
};

export default SetPasswordForm;
