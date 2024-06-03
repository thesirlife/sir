import { User } from "../types/user/types";

type PostUserProps = {
  username: string;
  email: string;
  password: string;
};

type PostUserReturn = User & {
  code: string;
  message: string;
  data: string;
} & Error;

export const postUser = async ({
  username,
  email,
  password,
}: PostUserProps): Promise<PostUserReturn> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/users?username=${email}&email=${email}&password=${password}&first_name=${username}`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic c2lyZGV2OnJVU1MgYURLMCBCelk3IGx1Q00geDhNSyBhcEFa",
      },
    }
  );
  return await data.json();
};
