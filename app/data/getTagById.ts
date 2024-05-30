import { Tag } from "../types/tags/types";

const getTagById = async (id: number): Promise<Tag> => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_WPREST_ENDPOINT + "/tags/" + id,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.json();
};

export default getTagById;
