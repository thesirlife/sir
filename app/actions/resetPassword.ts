"use server";

import { z } from "zod";
import resetPassword from "../data/resetPassword";
const newUserSchema = z.object({
  email: z.string().email(),
});

export type FormState = {
  status: "reset" | "error";
	message: string;
};

export const resetPasswordAction = async (
  formState: FormState,
  formData: FormData
) => {
  const { email } = newUserSchema.parse({
    email: formData.get("email"),
  });
  try {
    const response = await resetPassword(email);

    if (response.data.status === 500) {
      formState.status = "error";
			formState.message = response.message;
    }
    if (response.data.status === 200) {
      formState.status = "reset";
    }
  } catch {
    formState.status = "error";
  }

  return {
    status: formState.status,
		message: formState.message,
  };
};
