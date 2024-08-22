"use server";

import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

export type FormState = {
  status: "success" | "error" | "pending";
};

export const login = async (formState: FormState, formData: FormData) => {
  formState.status = "success";
  await signIn("credentials", formData);

  revalidatePath("/", "layout");

  return {
    status: formState.status,
  };
};
