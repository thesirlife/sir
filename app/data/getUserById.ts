import { User } from "../types/user/types";

const getUserById = async (id: number): Promise<User> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/users/${id}`,
    {
      cache: "no-cache",
    }
  );
  return data.json();
};

export default getUserById;
