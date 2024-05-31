"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { postUser } from "../data/postUser";

const newUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1).max(50),
  password: z.string().min(8).max(40),
});

type FormState = {
  email: string;
  username: string;
  password: string;
};

export const submitForm = async (formState: FormState, formData: FormData) => {
  try {
    const { email, username, password } = newUserSchema.parse({
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    });

    await postUser({ email, username, password });
  } catch {
    throw new Error("Failed to create user, please refresh and try again.");
  }

  revalidatePath("/");

  return {
    email: formState.email,
    username: formState.username,
    password: formState.password,
  };
};
