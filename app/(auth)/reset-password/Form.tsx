"use client";

import { TextField, Divider } from "@mui/material";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/components/SubmitButton";
import { useForm, Controller } from "react-hook-form";
import { FormState, resetPassword } from "@/app/actions/resetPassword";

const ResetPasswordForm = () => {
  const [serverFormState, action] = useFormState(resetPassword, {
    status: "pending" as FormState["status"],
  });

  type FormInput = {
    email: string;
    password: string;
    passwordConfirmation: string;
    code: string;
  };

  const {
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<FormInput>({ mode: "onChange" });
  console.log(errors);
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
          <Controller
            control={control}
            name="email"
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
        <SubmitButton disabled={!isValid}>Reset Password</SubmitButton>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
