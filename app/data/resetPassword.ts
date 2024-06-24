import { ResetPassword } from "../types/resetPassword/types";

const resetPassword = async (email: string): Promise<ResetPassword> => {
  const params = new URLSearchParams({
    email,
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESETPASS_ENDPOINT}/reset-password?${params}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  return data;
};

export default resetPassword;
