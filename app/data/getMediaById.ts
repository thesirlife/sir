import { Media } from "../types/media/types";

const getMediaById = async (id: number): Promise<Media> => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_WPREST_ENDPOINT + "/media/" + id,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.json();
};

export default getMediaById;
