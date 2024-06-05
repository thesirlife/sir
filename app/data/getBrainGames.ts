import { Articles, Post, getPostsProps } from "../types/post/types";

let total: string = "";
export const getBrainGames = async ({
  categories,
  offset,
}: getPostsProps): Promise<Articles<Post>> => {
  const gameCategories = categories ? `game-categories=${categories}` : "";
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/brain-games?${gameCategories}&offset=${offset}&per_page=5`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );

  total = String(data.headers.get("X-WP-Total"));
  const articles = await data.json();
  return { total, articles };
};
