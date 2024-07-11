import { User } from "../types/user/types";

type MetaProperties = keyof Omit<
  User["meta"],
  "persisted_preferences" | "user_meta_brain_hq_user_id"
>;

type PatchUserProps = {
  id: number;
  property: MetaProperties;
  value: boolean;
};

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

const patchUser = async ({
  id,
  property,
  value,
}: PatchUserProps): Promise<User> => {
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/users/${id}`,
    {
      method: "PATCH",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        meta: {
          // we really need to just set the type of this stuff in WP to be a boolean instead of ON and OFF, this is ugly AF
          [property]: value ? ["on"] : ["off"],
        },
      }),
    }
  );
  const data = await response.json();
  return data;
};

export default patchUser;
