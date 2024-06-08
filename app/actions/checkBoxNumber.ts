"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const newUserSchema = z.object({
  number: z.number(),
});

export type FormState = {
  verified: boolean;
};

export const checkBoxNumber = async (
  formState: FormState,
  formData: FormData
) => {
  const { number } = newUserSchema.parse({
    number: formData.get("number"),
  });
  try {
    // POST to an endpoint, see if the form code exists
    const response = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ number }),
    });

    // this should ideally return true or false depending on the verification
    const data = await response.json();
  } catch {
    // ask to try again
  }

  revalidatePath("/");

  return {
    verified: formState.verified,
  };
};
