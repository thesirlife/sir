"use server";

import { z } from "zod";
import setNewPassword from "../data/setPassword";
const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(40),
  code: z.string().min(8).max(8),
});

export type FormState = {
  status: "reset" | "error";
	message: string;
};

export const setPassword = async (formState: FormState, formData: FormData) => {
  const { email, password, code } = newUserSchema.parse({
    email: formData.get("email"),
    code: formData.get("code"),
    password: formData.get("password"),
  });
  try {
    const response = await setNewPassword(email, password, code);

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
