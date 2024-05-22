import { User } from "../types/user/types";

const getUserById = async (id: number): Promise<User> => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_WPREST_ENDPOINT + "/users/" + id,
    {
      headers: {
        "Content-Type": "application/json",
        // remove once live and we're not behind wpengine login
        Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
      },
    }
  );
  return data.json();
};

export default getUserById;
