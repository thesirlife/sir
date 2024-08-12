import { ResetPassword } from "../types/resetPassword/types";

const setPassword = async (
  email: string,
  password: string,
  code: string
): Promise<ResetPassword> => {
  const params = new URLSearchParams({
    email,
    password,
    code,
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RESETPASS_ENDPOINT}/set-password?${params}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();

  return data;
};

export default setPassword;
