"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const newUserSchema = z.object({
  verified: z.boolean(),
});

export type FormState = {
  verified: boolean;
};

export const checkBoxNumber = async (
  formState: FormState,
  formData: FormData
) => {
  const { verified } = newUserSchema.parse({
    verified: formData.get("verified"),
  });
  try {
    // POST to an endpoint, see if the form vode exists
  } catch {
    // ask to try again
  }

  revalidatePath("/");

  return {
    verified: formState.verified,
  };
};
