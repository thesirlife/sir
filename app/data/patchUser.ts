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

const patchUser = async ({
  id,
  property,
  value,
}: PatchUserProps): Promise<User> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic c2lyZGV2OnJVU1MgYURLMCBCelk3IGx1Q00geDhNSyBhcEFa",
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
