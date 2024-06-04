"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { postUser } from "../data/postUser";

const newUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1).max(50),
  password: z.string().min(8).max(40),
});

export type FormState = {
  status: "created" | "exists" | "error" | "pending";
};

export const register = async (formState: FormState, formData: FormData) => {
  try {
    const { email, username, password } = newUserSchema.parse({
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    });

    const response = await postUser({ email, username, password });

    // test to see if we get a response.code, which means the user wasn't returned and there's an error
    if (response.code) {
      // test to see if the error is due to an email already existing w/ a user
      if (response.code === "existing_user_email") {
        formState.status = "exists";
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

  revalidatePath("/");

  return {
    status: formState.status,
  };
};
