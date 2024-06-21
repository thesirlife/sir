"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";

const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(40),
  code: z.string().min(8).max(8),
});

export type FormState = {
  status: "created" | "exists" | "error" | "pending" | "invalid";
};

export const resetPassword = async (
  formState: FormState,
  formData: FormData
) => {
  const { email, password, code } = newUserSchema.parse({
    email: formData.get("email"),
    code: formData.get("code"),
    password: formData.get("password"),
  });
  try {
    const response = { code: "existing_user_email" };
    // const response = await postUser({ email, code, password });
    // test to see if we get a response.code, which means the user wasn't returned and there's an error
    if (response.code) {
      // test to see if the error is due to an email already existing w/ a user
      if (
        response.code === "existing_user_email" ||
        response.code === "existing_user_login"
      ) {
        formState.status = "exists";
      } else if (response.code === "rest_invalid_param") {
        formState.status = "invalid";
      } else {
        // all other potential errors
        formState.status = "error";
      }
      // successful user creation
    } else {
      formState.status = "created";
    }
  } catch {
    // if our fetch straight up fails, show the default error message
    formState.status = "error";
  }

  return {
    status: formState.status,
  };
};
