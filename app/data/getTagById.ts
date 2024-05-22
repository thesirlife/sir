import { Tag } from "../types/tags/types";

const getTagById = async (id: number): Promise<Tag> => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_WPREST_ENDPOINT + "/tags/" + id,
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

export default getTagById;
