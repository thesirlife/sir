"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Looks like the MuiOtp component still is intended for use in client-side form libraries like RHF
// and doesn't play well with server actions (passing a single value in a formData object)
// so we have to extract each individual number and stitch them together into one
const newUserSchema = z.object({
  number0: z.string(),
  number1: z.string(),
  number2: z.string(),
  number3: z.string(),
  number4: z.string(),
  number5: z.string(),
});

export type FormState = {
  verified: boolean | null;
};

export const checkBoxNumber = async (
  formState: FormState,
  formData: FormData
) => {
  const { number0, number1, number2, number3, number4, number5 } =
    newUserSchema.parse({
      number0: formData.get("number0"),
      number1: formData.get("number1"),
      number2: formData.get("number2"),
      number3: formData.get("number3"),
      number4: formData.get("number4"),
      number5: formData.get("number5"),
    });
  try {
    const code = [number0, number1, number2, number3, number4, number5].join(
      ""
    );

    const validCodes = ["123456", "654321", "111111", "222222", "333333"];

    if (validCodes.includes(code)) {
      formState.verified = true;
    } else {
      formState.verified = false;
    }

    // temporarily just check against a hardcoded array of numbers
    // in the future, POST to an endpoint, see if the form code exists
  } catch {
    // catch block unncesary right now since we aren't actually doing any async, but eventually this will handle
    // any failed POST requests, etc.
  }

  revalidatePath("/");

  return {
    verified: formState.verified,
  };
};
