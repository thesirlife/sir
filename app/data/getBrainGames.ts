import { Articles, Post, getPostsProps } from "../types/post/types";

export const getBrainGames = async ({
  categories,
  offset,
}: getPostsProps): Promise<Articles<Post>> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/brain-games?${
      categories ? `game-categories=${categories}` : ""
    }&offset=${offset}&per_page=5`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await data.json();
};
