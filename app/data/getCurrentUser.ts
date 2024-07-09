import { User } from "../types/user/types";

const getCurrentUser = async (token: string): Promise<User> => {
	console.log(token);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/users/me`,
    {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.json();
};

export default getCurrentUser;
