"use client";

import { TextField, Divider } from "@mui/material";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/components/SubmitButton";
import { useForm, Controller } from "react-hook-form";
import { FormState, resetPasswordAction } from "@/app/actions/resetPassword";
import { redirect } from "next/navigation";

const ResetPasswordForm = () => {
  const [serverFormState, action] = useFormState(resetPasswordAction, {
    status: "pending" as FormState["status"],
    message: "" as FormState["message"],
  });

  type FormInput = {
    email: string;
  };

  serverFormState.status === "reset" ? redirect("/set-password") : null;

  const {
    control,
    formState: { errors, isValid },
  } = useForm<FormInput>();
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-center mb-2">Reset Your Password</h2>
        <p className="text-lg mb-8 opacity-60 text-center">
          Enter your email below to reset your password.
        </p>
      </div>
      <form
        action={action}
        className="flex flex-col md:items-center justify-center"
      >
        <div className="flex flex-col gap-4 md:[&>*]:w-[260px]">
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
                type="email"
                required
                {...field}
              />
            )}
          />
        </div>

        <Divider className="my-8" flexItem />
        <SubmitButton disabled={!isValid}>Reset Password</SubmitButton>
        {serverFormState.status === "error" ?
					serverFormState.message ? (
						<p className="text-red-500 font-semibold text-center max-w-100 mt-4">
							{serverFormState.message}
						</p>
					) : (
						<p className="text-red-500 font-semibold text-center max-w-100 mt-4">
							Something went wrong. Please double check your information and try
							again.
						</p>
					)
        : null}
      </form>
    </div>
  );
};

export default ResetPasswordForm;
