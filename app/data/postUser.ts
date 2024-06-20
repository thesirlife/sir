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

type AuthResponse = {
  success: boolean;
  statusCode: number;
  code: string;
  message: string;
  data: {
    token: string;
    id: number;
    email: string;
    nicename: string;
    firstName: string;
    lastName: string;
    displayName: string;
  };
};

export const postUser = async ({
  username,
  email,
  password,
}: PostUserProps): Promise<PostUserReturn> => {
  // @TODO :: Create generic auth user that we can delete/change password of at anytime
  const res = await fetch(`${process.env.NEXT_PUBLIC_WPAUTH_ENDPOINT}/token`, {
    method: "POST",
    body: JSON.stringify({
      username: "kelly@edgesfirst.co",
      password: process.env.WP_PASSWORD,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const parsedResponse: AuthResponse = await res.json();
  const jwt = parsedResponse.data.token;
  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_WPREST_ENDPOINT
    }/users?username=${encodeURIComponent(email)}&email=${encodeURIComponent(
      email
    )}&password=${password}&first_name=${username}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  const result = await data.json();
  return result;
};
