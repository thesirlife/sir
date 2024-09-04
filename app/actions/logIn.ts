"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export type FormState = {
  status: "success" | "error" | "pending";
};

export const login = async (formState: FormState, formData: FormData) => {
  try {
    formState.status = "success";
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) formState.status = "error";
  } finally {
    if (formState.status === "success") {
      redirect("/");
    }
  }

  return {
    status: formState.status
  };
};
