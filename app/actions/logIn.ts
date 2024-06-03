"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

type FormState = {
  status: "success" | "error" | string;
};

export const login = async (formState: FormState, formData: FormData) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) formState.status = "error";
  }

  revalidatePath("/");

  return {
    status: formState.status,
  };
};
